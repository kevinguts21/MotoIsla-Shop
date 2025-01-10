from django.contrib import admin
from .models import Producto, Categoria, Cart, CartItem, SubCategoria

# Configuración para el modelo Categoria
@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ["nombre"]  # Campos a mostrar en la lista

@admin.register(SubCategoria)
class SubCategoriaAdmin(admin.ModelAdmin):
    list_display = ["nombre"]
    list_filter = ["nombre"]

# Configuración para el modelo Producto
@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = (
        "nombre",
        "precio",
        "cantidad_disponible",
        "subcategoria",  # Use subcategoria instead of categoria
        "tiempo_creado",
        "color",
        "caracteristicas",
    )
    search_fields = ("nombre",)  # Campo para búsqueda
    list_filter = ("subcategoria",)  # Filter by subcategoria

# Configuración para el modelo Cart
@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ("id", "total_price")  # Campos a mostrar en la lista

# Configuración para el modelo CartItem
@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ("id", "cart", "producto", "cantidad", "subtotal_display")
    search_fields = (
        "producto__nombre",
    )  # Campo para búsqueda basada en el nombre del producto

    # Método para mostrar el subtotal
    def subtotal_display(self, obj):
        return obj.subtotal()

    subtotal_display.short_description = (
        "Subtotal"  # Nombre del encabezado de columna en el admin
    )
