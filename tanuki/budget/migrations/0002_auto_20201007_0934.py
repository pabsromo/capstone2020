# Generated by Django 3.1.2 on 2020-10-07 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('budget', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='income',
            name='itemDate',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]