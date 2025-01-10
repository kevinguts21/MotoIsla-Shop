from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from django.conf import settings
from django.conf.urls.static import static


router = DefaultRouter()
router.register(r'productos', views.ProductoViewSet, basename='producto')
router.register(r'categorias', views.CategoriaViewSet, basename='categoria')
router.register(r'subcategorias', views.SubCategoriasViewSet, basename='subcategoria')

urlpatterns = [

    path('', include(router.urls)),


    path('cart/', views.CartView.as_view(), name='cart-detail'),
    path('cart/add/<int:producto_id>/', views.AddToCartView.as_view(), name='add-to-cart'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
