# Generated by Django 4.2.3 on 2023-08-07 19:30

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0010_alter_product_image"),
    ]

    operations = [
        migrations.AddField(
            model_name="review",
            name="createdAt",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
