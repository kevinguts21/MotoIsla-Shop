from django.db import models
from django.shortcuts import get_object_or_404
from django.http import JsonResponse


class Categoria(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre


class SubCategoria(models.Model):
    nombre = models.CharField(max_length=200)
    categoria = models.ForeignKey(
        Categoria, related_name="subcategorias", on_delete=models.CASCADE
    )
    

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    cantidad_disponible = models.IntegerField()
    imagen = models.ImageField(upload_to="Productos/")
    subcategoria = models.ForeignKey(
        SubCategoria, related_name="productos", on_delete=models.CASCADE, null=True
    )
    tiempo_creado = models.DateTimeField(auto_now_add=True, null=True)
    caracteristicas = models.CharField(max_length=600, null=True, blank=True)
    componentes = models.CharField(max_length=600, null=True, blank=True)
    color = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.nombre 


class Cart(models.Model):
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def update_total(self):
        """Calcula y actualiza el precio total del carrito."""
        self.total_price = sum(item.subtotal() for item in self.cart_items.all())
        self.save()


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name="cart_items", on_delete=models.CASCADE)
    producto = models.ForeignKey(
        Producto, related_name="cart_items", on_delete=models.CASCADE
    )
    cantidad = models.IntegerField(default=1)

    def subtotal(self):
        """Calcula el subtotal del producto basado en la cantidad."""
        return self.producto.precio * self.cantidad


def agregar_al_carrito(request, producto_id):
    """Agrega un producto al carrito."""
    producto = get_object_or_404(Producto, id=producto_id)

    # Inicializa el carrito en la sesión si no existe
    if "cart_id" not in request.session:
        cart = Cart.objects.create()
        request.session["cart_id"] = cart.id
    else:
        cart = Cart.objects.get(id=request.session["cart_id"])

    # Agrega el producto al carrito
    cart_item, created = CartItem.objects.get_or_create(cart=cart, producto=producto)

    if not created:
        cart_item.cantidad += 1
        cart_item.save()

    # Actualiza el total del carrito
    cart.update_total()

    return JsonResponse(
        {"mensaje": "Producto agregado al carrito", "total": cart.total_price}
    )
