from rest_framework import serializers
from .models import *


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ["id", "nombre"]


class SubCategoriaSerializer(serializers.ModelSerializer):
    categoria = (
        CategoriaSerializer()
    )  # Anidando el serializer de Categoría para incluir su información

    class Meta:
        model = SubCategoria
        fields = [
            "id",
            "nombre",
            "categoria",
        ]  # Incluye el campo 'categoria' relacionado


class ProductoSerializer(serializers.ModelSerializer):
    imagen = serializers.SerializerMethodField()
    subcategoria = SubCategoriaSerializer()

    class Meta:
        model = Producto
        fields = "__all__"

    def get_imagen(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.imagen.url) if obj.imagen else None


class CartItemSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer()

    class Meta:
        model = CartItem
        fields = ["id", "producto", "cantidad", "subtotal"]


class CartSerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(many=True)

    class Meta:
        model = Cart
        fields = ["id", "total_price", "cart_items"]
