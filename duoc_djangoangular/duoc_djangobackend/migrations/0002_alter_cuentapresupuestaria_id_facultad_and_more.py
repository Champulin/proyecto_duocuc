# Generated by Django 4.1.8 on 2023-04-30 23:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('duoc_djangobackend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cuentapresupuestaria',
            name='id_facultad',
            field=models.IntegerField(unique=True),
        ),
        migrations.AlterField(
            model_name='unidad',
            name='id_unidad',
            field=models.IntegerField(unique=True),
        ),
    ]