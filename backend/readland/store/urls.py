from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet, OrderViewSet, RecommendationsView, OrderItemViewSet, FavoriteViewSet, CartViewSet,CartItemViewSet, UserViewSet, ProfileViewSet, CategoryViewSet, CustomRegisterView, get_favorites

router = DefaultRouter()
router.register(r'books', BookViewSet)
router.register(r'favorites', FavoriteViewSet, basename='favorite')
router.register(r'order-items', OrderItemViewSet)
router.register(r'users', UserViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'cart-items', CartItemViewSet)
router.register(r'carts', CartViewSet, basename='cart')
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/register/', CustomRegisterView.as_view(), name='rest_register'),
    path('favorites/', get_favorites, name='get_favorites'),
    path('api/recommendations/', RecommendationsView.as_view(), name='recommendations'),
]
