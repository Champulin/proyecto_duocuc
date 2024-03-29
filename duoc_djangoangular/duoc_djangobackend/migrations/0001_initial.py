# Generated by Django 4.1.8 on 2023-05-16 22:12

from django.db import migrations, models
import djongo.models.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Administrator',
            fields=[
                ('_id', djongo.models.fields.ObjectIdField(auto_created=True, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50, null=True)),
                ('last_name', models.CharField(max_length=50, null=True)),
                ('email', models.EmailField(max_length=254, null=True, unique=True)),
                ('username', models.CharField(max_length=30, unique=True)),
                ('password', models.CharField(max_length=100)),
            ],
            options={
                'verbose_name': 'Administrator',
                'verbose_name_plural': 'Administrators',
                'db_table': 'Administrator',
            },
        ),
        migrations.CreateModel(
            name='Anexo',
            fields=[
                ('_id', djongo.models.fields.ObjectIdField(auto_created=True, primary_key=True, serialize=False)),
                ('id_anexo', models.IntegerField(unique=True)),
                ('file', models.FileField(null=True, upload_to='anexos/')),
                ('id_facultad', models.IntegerField()),
                ('id_unidad', models.IntegerField()),
                ('nombre_anexo', models.CharField(max_length=50)),
                ('fecha_creacion', models.DateField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Anexo',
                'verbose_name_plural': 'Anexos',
                'db_table': 'Anexo',
            },
        ),
        migrations.CreateModel(
            name='CalculoMensualFacultad',
            fields=[
                ('_id', djongo.models.fields.ObjectIdField(auto_created=True, primary_key=True, serialize=False)),
                ('id_facultad', models.IntegerField()),
                ('nombre_calculo', models.CharField(max_length=100)),
                ('nombre_facultad', models.CharField(max_length=50)),
                ('tarificacion_general', models.IntegerField()),
                ('tarificacion_slm', models.IntegerField()),
                ('tarificacion_cel', models.IntegerField()),
                ('tarificacion_ldi', models.IntegerField()),
                ('fecha_calculo', models.DateField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Calculo Mensual',
                'verbose_name_plural': 'Calculos Mensuales',
                'db_table': 'CalculoMensualFacultad',
            },
        ),
        migrations.CreateModel(
            name='CalculoMensualUnidad',
            fields=[
                ('_id', djongo.models.fields.ObjectIdField(auto_created=True, primary_key=True, serialize=False)),
                ('id_facultad', models.IntegerField()),
                ('nombre_calculo', models.CharField(max_length=100)),
                ('nombre_depto', models.CharField(max_length=50)),
                ('tarificacion_general', models.IntegerField()),
                ('tarificacion_slm', models.IntegerField()),
                ('tarificacion_cel', models.IntegerField()),
                ('tarificacion_ldi', models.IntegerField()),
                ('fecha_calculo', models.DateField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Calculo Mensual',
                'verbose_name_plural': 'Calculos Mensuales',
                'db_table': 'CalculoMensualUnidad',
            },
        ),
        migrations.CreateModel(
            name='CuentaPresupuestaria',
            fields=[
                ('_id', djongo.models.fields.ObjectIdField(auto_created=True, primary_key=True, serialize=False)),
                ('id_proveedor', models.IntegerField()),
                ('id_facultad', models.IntegerField(unique=True)),
                ('nombre_facultad', models.CharField(max_length=50)),
                ('siglas_facultad', models.CharField(max_length=10)),
            ],
            options={
                'verbose_name': 'Cuenta presupuestaria',
                'verbose_name_plural': 'Cuentas presupuestarias',
                'db_table': 'CuentaPresupuestaria',
            },
        ),
        migrations.CreateModel(
            name='ProveedoresTelefonia',
            fields=[
                ('_id', djongo.models.fields.ObjectIdField(auto_created=True, primary_key=True, serialize=False)),
                ('id_proveedor', models.IntegerField(unique=True)),
                ('nombre_proveedor', models.CharField(max_length=50)),
                ('costo_seg_cel', models.IntegerField()),
                ('costo_seg_ldi', models.IntegerField()),
                ('costo_seg_slm', models.IntegerField()),
            ],
            options={
                'verbose_name': 'Proveedor de telefonia',
                'verbose_name_plural': 'Proveedores de telefonia',
                'db_table': 'ProveedoresTelefonia',
            },
        ),
        migrations.CreateModel(
            name='RegistroLlamada',
            fields=[
                ('_id', djongo.models.fields.ObjectIdField(auto_created=True, primary_key=True, serialize=False)),
                ('id_anexo', models.IntegerField()),
                ('id_facultad', models.IntegerField()),
                ('id_unidad', models.IntegerField()),
                ('nombre_proveedor', models.CharField(max_length=50)),
                ('tipo_llamada_siglas', models.CharField(max_length=10)),
                ('numero_telefono', models.IntegerField()),
                ('fecha_llamada', models.DateField()),
                ('hora_llamada', models.TimeField()),
                ('duracion_llamada', models.IntegerField()),
                ('tipo_respuesta', models.CharField(max_length=50)),
                ('siglas_facultad', models.CharField(max_length=10)),
                ('siglas_depto', models.CharField(max_length=10)),
                ('nombre_destinatario', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name': 'Registro de llamada',
                'verbose_name_plural': 'Registros de llamadas',
                'db_table': 'RegistroLlamada',
            },
        ),
        migrations.CreateModel(
            name='ResponsableUnidad',
            fields=[
                ('_id', djongo.models.fields.ObjectIdField(auto_created=True, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50, null=True)),
                ('last_name', models.CharField(max_length=50, null=True)),
                ('email', models.EmailField(max_length=254, null=True, unique=True)),
                ('id_unidad', models.IntegerField()),
                ('id_facultad', models.IntegerField()),
                ('username', models.CharField(max_length=30, unique=True)),
                ('password', models.CharField(max_length=100)),
            ],
            options={
                'verbose_name': 'Responsable unidad',
                'verbose_name_plural': 'Responsables de unidad',
                'db_table': 'ResponsableUnidad',
            },
        ),
        migrations.CreateModel(
            name='Unidad',
            fields=[
                ('_id', djongo.models.fields.ObjectIdField(auto_created=True, primary_key=True, serialize=False)),
                ('id_unidad', models.IntegerField(unique=True)),
                ('nombre_depto', models.CharField(max_length=50)),
                ('siglas_depto', models.CharField(max_length=10)),
                ('id_facultad', models.IntegerField()),
            ],
            options={
                'verbose_name': 'Unidad',
                'verbose_name_plural': 'Unidades',
                'db_table': 'Unidad',
            },
        ),
        migrations.CreateModel(
            name='Notificaciones',
            fields=[
                ('_id', djongo.models.fields.ObjectIdField(auto_created=True, primary_key=True, serialize=False)),
                ('id_unidad', models.IntegerField()),
                ('estado', models.BooleanField(default=False)),
                ('cuerpo', models.CharField(max_length=100)),
                ('titulo', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name': 'Notificacion',
                'verbose_name_plural': 'Notifcaciones',
                'db_table': 'Notificaciones',
            },
        ),
    ]
