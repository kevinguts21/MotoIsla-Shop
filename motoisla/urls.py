from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("shop.urls")),
]

# ✅ Servir archivos de medios cuando DEBUG=True (solo en desarrollo)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# ✅ Servir archivos de medios cuando DEBUG=False (en producción)
else:
    urlpatterns += [
        re_path(r"^media/(?P<path>.*)$", serve, {"document_root": settings.MEDIA_ROOT}),
    ]
