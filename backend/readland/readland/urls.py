from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from readland import settings
from store.views import auth, BookDetailView, search_books, RecommendationsView, \
    GetPopularAuthors

router = SimpleRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path('', include('social_django.urls', namespace='social')),
    path('auth/', auth),
    path('api/', include('store.urls')),
    path('api/book/<int:pk>/', BookDetailView.as_view(), name='book-detail'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/search/', search_books, name='search_books'),
    path('api/recommendations/', RecommendationsView.as_view(), name='recommendations'),
    path('api/get-popular-authors', GetPopularAuthors.as_view(), name='get-popular-authors'),

]

urlpatterns += router.urls

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)