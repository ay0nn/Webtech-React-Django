from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

# from .models import Product
from .products import products
# from .serializers import ProdcutSerializer


# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/products/',

        '/api/products/create',

        '/api/products/upload',

        '/api/products/<id>/reviews',
    ]


    return Response(routes)


@api_view(['GET'])
def getProducts(request):
    return JsonResponse(products, safe=False)