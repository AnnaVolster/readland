# store/serializers.py
from allauth.account.models import EmailAddress
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Book, Order, OrderItem, Favorite, Cart, Profile, User, Category, CartItem, Genre, Author, RecommendationRequest

User = get_user_model()


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class CustomRegisterSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    def validate_email(self, email):
        if EmailAddress.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError("A user is already registered with this email address.")
        return email

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError("The two password fields didn't match.")
        return data

    def save(self, request):
        email = self.validated_data['email']
        username = email.split('@')[0] + str(User.objects.count() + 1)  # Генерация уникального имени пользователя
        user = User(
            email=email,
            username=username  # Установка сгенерированного имени пользователя
        )
        user.set_password(self.validated_data['password1'])
        user.save()
        return user


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'phone_number']


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['full_name', 'phone_number']


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ['id', 'user', 'book', 'added_at']

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id', 'cart', 'book', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'created_at', 'items']

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'user', 'cart', 'total_price', 'created_at', 'updated_at']


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'name', 'genre']

class RecommendationRequestSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True)
    authors = AuthorSerializer(many=True)

    class Meta:
        model = RecommendationRequest
        fields = ['user', 'genres', 'authors', 'keywords']