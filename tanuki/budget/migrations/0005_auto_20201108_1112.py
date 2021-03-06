# Generated by Django 3.0.3 on 2020-11-08 17:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('budget', '0004_auto_20201104_1102'),
    ]

    operations = [
        migrations.AddField(
            model_name='summary',
            name='essential',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=7),
        ),
        migrations.AddField(
            model_name='summary',
            name='leisure',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=7),
        ),
        migrations.AddField(
            model_name='summary',
            name='optional',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=7),
        ),
        migrations.AddField(
            model_name='summary',
            name='unexpected',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=7),
        ),
    ]
