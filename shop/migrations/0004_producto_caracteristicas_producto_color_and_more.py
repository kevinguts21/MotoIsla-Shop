# Generated by Django 5.1.4 on 2024-12-10 21:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0003_producto_tiempo_creado'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='caracteristicas',
            field=models.CharField(max_length=600, null=True),
        ),
        migrations.AddField(
            model_name='producto',
            name='color',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='producto',
            name='componentes',
            field=models.CharField(max_length=600, null=True),
        ),
    ]
