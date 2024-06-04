from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

from readland import settings


# User = get_user_model()

class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    stock = models.PositiveIntegerField()
    cover_image = models.ImageField(upload_to='book_covers/', null=True, blank=True)
    rating = models.FloatField(null=True, blank=True)

    # Новые поля
    publisher = models.CharField(max_length=200)  # Издательство
    series = models.CharField(max_length=200, null=True, blank=True)  # Серия
    publication_year = models.PositiveIntegerField()  # Год издания
    isbn = models.CharField(max_length=25, unique=True)  # ISBN
    page_count = models.PositiveIntegerField()  # Количество страниц
    size = models.CharField(max_length=100)  # Размер
    cover_type = models.CharField(max_length=100)  # Тип обложки
    circulation = models.PositiveIntegerField()  # Тираж
    weight = models.PositiveIntegerField()  # Вес
    age_restrictions = models.CharField(max_length=100, null=True, blank=True)  # Возрастные ограничения

    def __str__(self):
        return f'Id {self.id}: {self.title}'


class User(AbstractUser):
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True)

    # Добавление уникальных related_name
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='store_user_set',  # Уникальное related_name
        blank=True,
        help_text=('The groups this user belongs to. A user will get all permissions granted to each of their groups.'),
        related_query_name='user',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='store_user_permissions_set',  # Уникальное related_name
        blank=True,
        help_text=('Specific permissions for this user.'),
        related_query_name='user',
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15, null=True, blank=True)

    def __str__(self):
        return self.user.email


class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'book')

    def __str__(self):
        return f"{self.user.username} - {self.book.title}"


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart of {self.user.username}"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    book = models.ForeignKey('Book', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    cart = models.OneToOneField(Cart, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=50, choices=(
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('canceled', 'Canceled')
    ), default='pending')

    def __str__(self):
        return f'Order #{self.id} by {self.user.username}'


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price_per_item = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} of {self.book.title}"


class Genre(models.Model):
    name = models.CharField(max_length=100)

class Author(models.Model):
    name = models.CharField(max_length=100)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)

class RecommendationRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    genres = models.ManyToManyField(Genre)
    authors = models.ManyToManyField(Author)
    keywords = models.TextField()
