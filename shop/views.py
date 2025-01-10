from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Categoria, SubCategoria, Producto, Cart, CartItem
from .serializers import (
    CategoriaSerializer,
    SubCategoriaSerializer,
    ProductoSerializer,
    CartSerializer,
)


class CartView(APIView):
    """Maneja las operaciones del carrito."""

    def get(self, request):
        """Obtiene el carrito actual del usuario."""
        cart_id = request.session.get("cart_id")
        if not cart_id:
            return Response(
                {"mensaje": "El carrito está vacío"}, status=status.HTTP_404_NOT_FOUND
            )

        cart = get_object_or_404(Cart, id=cart_id)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def delete(self, request):
        """Vacía el carrito."""
        cart_id = request.session.get("cart_id")
        if not cart_id:
            return Response(
                {"mensaje": "No hay carrito para vaciar"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        cart = get_object_or_404(Cart, id=cart_id)
        cart.cart_items.all().delete()
        cart.update_total()
        return Response(
            {"mensaje": "Carrito vaciado correctamente"}, status=status.HTTP_200_OK
        )


class AddToCartView(APIView):
    """Agrega productos al carrito."""

    def post(self, request, producto_id):
        """Agrega un producto al carrito."""
        producto = get_object_or_404(Producto, id=producto_id)

        # Inicializa el carrito si no existe
        if "cart_id" not in request.session:
            cart = Cart.objects.create()
            request.session["cart_id"] = cart.id
        else:
            cart = get_object_or_404(Cart, id=request.session["cart_id"])

        # Agrega o actualiza el producto en el carrito
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart, producto=producto
        )

        if not created:
            cart_item.cantidad += 1
            cart_item.save()

        # Actualiza el total del carrito
        cart.update_total()

        return Response(
            {"mensaje": "Producto agregado al carrito", "total": cart.total_price},
            status=status.HTTP_200_OK,
        )


class CategoriaViewSet(viewsets.ModelViewSet):
    """Maneja operaciones CRUD para Categorías."""

    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer


class SubCategoriasViewSet(viewsets.ModelViewSet):
    """Maneja operaciones CRUD para Subcategorías."""

    queryset = SubCategoria.objects.all()
    serializer_class = SubCategoriaSerializer

    def list(self, request, *args, **kwargs):
        """Lista todas las subcategorías o las filtradas por categoría."""
        categoria_id = request.query_params.get("categoria_id")
        if categoria_id:
            self.queryset = self.queryset.filter(categoria_id=categoria_id)
        return super().list(request, *args, **kwargs)


class ProductoViewSet(viewsets.ModelViewSet):
    """Maneja operaciones CRUD para Productos."""

    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
