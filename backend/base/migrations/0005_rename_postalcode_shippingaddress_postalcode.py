# Generated by Django 4.2.3 on 2023-08-01 12:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0004_order_totalprice"),
    ]

    operations = [
        migrations.RenameField(
            model_name="shippingaddress",
            old_name="postalcode",
            new_name="postalCode",
        ),
    ]
