# Generated by Django 3.2.18 on 2023-05-03 02:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('duoc_djangobackend', '0003_alter_anexo_id_anexo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='registrollamada',
            name='hora_llamada',
            field=models.TimeField(),
        ),
    ]