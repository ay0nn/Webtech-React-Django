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
from django.contrib.auth.hashers import make_password
from rest_framework import status

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        serializer=UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# # Create your views here.
# @api_view(['GET'])
# def getRoutes(request):
#     routes = [
#         '/api/products/',

#         '/api/products/create',

#         '/api/products/upload',

#         '/api/products/<id>/reviews',
#     ]


#     return Response(routes)

from rest_framework import status

from django.db import IntegrityError
from rest_framework import status

@api_view(['POST'])
def registerUser(request):
    data = request.data
    
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    except IntegrityError:  # Catch the specific IntegrityError when the user already exists
        message = {'detail': 'User with this email already exists.'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)



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
    serializer = ProductSerializer(products, many=True)  # Fix: Use 'products' instead of 'users'
    return Response(serializer.data)



@api_view(['GET'])
def getProduct(request, pk):
   product = Product.objects.get(_id=pk)
   serializer= ProductSerializer(product, many= False)
   return Response(serializer.data)
