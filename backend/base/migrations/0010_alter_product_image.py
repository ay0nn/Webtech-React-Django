# Generated by Django 4.2.3 on 2023-08-04 17:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0009_remove_shippingaddress_product_order_isdelivered_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="image",
            field=models.ImageField(
                blank=True, default="/demo.png", null=True, upload_to=""
            ),
        ),
    ]