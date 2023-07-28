from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .products import products
from .serializers import ProdcutSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['username'] = self.user.username
        data['email'] = self.user.email

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

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
    products = Product.objects.all()
    serializer = ProdcutSerializer(products, many = True)
    return Response(serializer.data)



@api_view(['GET'])
def getProduct(request, pk):
   product = Product.objects.get(_id=pk)
   serializer= ProdcutSerializer(product, many= False)
   return Response(serializer.data)
