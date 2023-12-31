from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from base.models import Product  # Fix: Correct import statement
from base.serializers import ProductSerializer
from rest_framework import status
from base.models import Review


 
#Products------

@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    page = request.query_params.get('page')
    
    if query is None:
        query = ''
    
    # Apply filtering by name and order by creation date
    products = Product.objects.filter(name__icontains=query).order_by('createdAt')
    
    # Implement pagination (max 10 items per request)
    paginator = Paginator(products, 10)
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
    
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
   product = Product.objects.get(_id=pk)
   serializer= ProductSerializer(product, many= False)
   return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
       user = user,
       name='Sample Name',
       price= 0,
       brand='Sample Brand',
       countInStock=0,
       category='Sample Category',
       description=''    
   )
    serializer= ProductSerializer(product, many= False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    try:
        data = request.data
        product = Product.objects.get(_id=pk)
        
        product.name = data['name']
        product.price = data['price']
        product.brand = data['brand']
        product.countInStock = data['countInStock']
        product.category = data['category']
        product.description = data['description']
        product.save()

        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'detail': 'Product not found'}, status=404)



@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
   product = Product.objects.get(_id=pk)
   product.delete()
   return Response('Product Deleted')

@api_view(['POST'])
def uploadImage(request):
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)
    product.image = request.FILES.get('image')
    product.save()
    return Response('Image was uploaded')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request,pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data  
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail':'You already reviewed that product'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    elif data['rating'] == 0:
        content = {'detail':'Please Selecet a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    else:
        review = Review.objects.create(
            user = user,
            product=product,
            name= user.first_name,
            rating=data['rating'],
            comment=data['comment'],
            
        )
        reviews = product.review_set.all()
        product.numReviews = len(reviews)
        total = 0
        for i in reviews:
            total += i.rating
        
        product.rating = total/len(reviews)
        product.save()
        return Response('Review Added')
            
    
    
    
    