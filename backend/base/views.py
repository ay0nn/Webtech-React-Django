from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User

from .models import Product
from .products import products
from .serializers import ProdcutSerializer, UserSerializer, UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        serializer=UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v

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
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many = False)
    return Response(serializer.data)

@api_view(['GET']) 
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many = True)
    return Response(serializer.data)



 
#Products------

@api_view(['GET']) 
def getProducts(request):
    products = Product.objects.all()
    serializer = ProdcutSerializer(users, many = True)
    return Response(serializer.data)




@api_view(['GET'])
def getProduct(request, pk):
   product = Product.objects.get(_id=pk)
   serializer= ProdcutSerializer(product, many= False)
   return Response(serializer.data)
