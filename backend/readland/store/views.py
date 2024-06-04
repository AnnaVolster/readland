import json
import logging
import os

import openai
from django.db.models import Q
from django.http import JsonResponse
from rest_framework.decorators import action, permission_classes, api_view
from django.contrib.auth import get_user_model
from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework import viewsets, status, permissions

from readland import settings
from .models import Book, Order, OrderItem, Favorite, Cart, Profile, Category, CartItem
from .serializers import BookSerializer, OrderItemSerializer, CartSerializer, UserSerializer, ProfileSerializer, \
    OrderSerializer, FavoriteSerializer, RecommendationRequestSerializer, CategorySerializer, CartItemSerializer
from .serializers import CustomRegisterSerializer

try:
    from dj_rest_auth.registration.views import RegisterView
except ImportError as e:
    print(f"ImportError: {e}")

User = get_user_model()


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class BookViewSet(ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['price']
    search_fields = {'title', 'author', 'description', 'publisher'}
    ordering_fields = ['price', 'author']


def auth(request):
    return render(request, 'oauth.html')


class CustomRegisterView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = CustomRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(request)
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer


class FavoriteViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteSerializer

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

    @action(detail=True, methods=['post'])
    def add_to_favorites(self, request, pk=None):
        book = Book.objects.get(pk=pk)
        favorite, created = Favorite.objects.get_or_create(user=request.user, book=book)
        if created:
            return Response({'status': 'book added to favorites'})
        else:
            return Response({'status': 'book already in favorites'})

    @action(detail=True, methods=['post'])
    def remove_from_favorites(self, request, pk=None):
        book = Book.objects.get(pk=pk)
        favorite = Favorite.objects.filter(user=request.user, book=book).first()
        if favorite:
            favorite.delete()
            return Response({'status': 'book removed from favorites'})
        else:
            return Response({'status': 'no such favorite found'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_favorites(request):
    user = request.user
    favorites = Favorite.objects.filter(user=user)
    serializer = FavoriteSerializer(favorites, many=True)
    return Response(serializer.data)


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    @action(detail=True, methods=['post'])
    def add_to_cart(self, request, pk=None):
        cart, created = Cart.objects.get_or_create(user=request.user)
        book = Book.objects.get(pk=pk)
        cart_item, created = CartItem.objects.get_or_create(cart=cart, book=book)
        if not created:
            cart_item.quantity += 1
            cart_item.save()
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def remove_from_cart(self, request, pk=None):
        cart = Cart.objects.get(user=request.user)
        book = Book.objects.get(pk=pk)
        cart_item = CartItem.objects.filter(cart=cart, book=book).first()
        if cart_item:
            if cart_item.quantity > 1:
                cart_item.quantity -= 1
                cart_item.save()
            else:
                cart_item.delete()
        serializer = CartSerializer(cart)
        return Response(serializer.data)


class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = request.user
        cart, created = Cart.objects.get_or_create(user=user)
        book_id = request.data.get('book')
        quantity = request.data.get('quantity', 1)

        try:
            book = Book.objects.get(id=book_id)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found'}, status=404)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, book=book)
        cart_item.quantity = quantity
        cart_item.save()

        serializer = self.get_serializer(cart_item)
        return Response(serializer.data, status=200)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def calculate_total_price(self, cart):
        return sum(item.book.price * item.quantity for item in cart.items.all())


class BookDetailView(APIView):
    def get(self, request, pk, format=None):
        try:
            book = Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = BookSerializer(book)
        return Response(serializer.data)


@api_view(['GET'])
def search_books(request):
    query = request.GET.get('q', '')
    if query:
        books = Book.objects.filter(
            Q(title__icontains=query) |
            Q(author__icontains=query) |
            Q(description__icontains=query)
        )
    else:
        books = Book.objects.all()

    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)


class GetPopularAuthors(APIView):
    def post(self, request):
        genres = request.data.get('genres', [])
        if not genres:
            return Response({'error': 'No genres provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Формирование запроса к ChatGPT
            prompt = f"Дай мне список из 20 самых популярных авторов для следующих жанров, по 3-4 автора на каждый жанр: {', '.join(genres)}."

            # Настройка и вызов API OpenAI
            openai.api_key = settings.OPENAI_API_KEY
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "Ты помощник, который помогает с рекомендациями книг."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500,
                n=1,
                stop=None,
                temperature=0.7,
            )

            authors = response.choices[0].message['content'].strip()
            return Response({'authors': authors}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RecommendationsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        authors = request.data.get('authors', [])
        genres = request.data.get('genres', [])
        keywords = request.data.get('keywords', '')

        # Формирование запроса к ChatGPT
        prompt = (
            f"Предоставь список из 10 книг для пользователя согласно его предпочтениям. Он любит жанры {', '.join(genres)}. "
            f"Учти следующие ключевые слова и предпочтения: {keywords}. "
            f"Вот пример авторов, которых уже читал и любит пользователь. Рекомендуй не этих же авторов, а похожих по стилю и повествованию: {', '.join(authors)}.\n"
            f"Ответ верни в формате JSON, где каждый элемент содержит \"title\" для названия книги и \"author\" для автора книги.\n"
            f"Пример ответа:\n"
            f"[\n"
            f"  {{\"title\": \"Название книги 1\", \"author\": \"Автор 1\"}},\n"
            f"  {{\"title\": \"Название книги 2\", \"author\": \"Автор 2\"}}\n"
            f"]"
        )

        # Настройка и вызов API OpenAI
        openai.api_key = settings.OPENAI_API_KEY
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Ты - рекомендательная система книг."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000,
            n=1,
            stop=None,
            temperature=0.7,
        )

        recommendations = response.choices[0].message['content'].strip()

        try:
            recommendations_json = json.loads(recommendations)
        except json.JSONDecodeError as e:
            return Response({'error': 'Failed to decode JSON from ChatGPT response', 'details': str(e)}, status=500)

        books_in_catalog = []
        for book in recommendations_json:
            try:
                book_obj = Book.objects.get(title=book['title'])
                books_in_catalog.append(BookSerializer(book_obj).data)
            except Book.DoesNotExist:
                books_in_catalog.append({
                    'title': book['title'],
                    'author': book['author'],
                    'genre': '',
                    'price': '',
                    'description': 'This book is not available in our catalog.',
                    'cover_image': '/media/book_covers/sold_out.png'
                })

        return Response({'recommendations': books_in_catalog})