# Generated by Django 3.0.3 on 2020-04-25 18:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('overview', '0004_auto_20200425_1302'),
    ]

    operations = [
        migrations.AlterField(
            model_name='additem',
            name='dateDisplayed',
            field=models.CharField(max_length=10),
        ),
    ]
