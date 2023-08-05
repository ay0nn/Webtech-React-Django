from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import ProductSerializer, OrderSerializer
from rest_framework import status
from datetime import datetime
from django.utils import timezone

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']  # Make sure it matches the frontend key name 'orderItems'

    if not orderItems:
        return Response({'detail': 'No order items'}, status=400)
    else:
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )

    for item in data['orderItems']:
        product = Product.objects.get(_id=item['product'])

        # Convert qty to integer using int()
        qty = int(item['qty'])

        order_item = OrderItem.objects.create(
            product=product,
            order=order,
            name=product.name,
            qty=qty,  # Use the converted integer value
            price=item['price'],
            image=product.image.url
        )

        product.countInStock -= qty  # Use the converted integer value
        product.save()

    serializer = OrderSerializer(order, many=False)  # Use many=False
    return Response(serializer.data)
from rest_framework import status

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user
    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Not authorized to view this order'}, status=status.HTTP_400_BAD_REQUEST)
    except Order.DoesNotExist:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request,pk):
    order = Order.objects.get(_id=pk)
    
    order.isPaid = True
    order.paidAt=  timezone.now()  
    order.save()
    return Response('Order Paid')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request,pk):
    order = Order.objects.get(_id=pk)
    
    order.isDelivered = True
    order.deliveredAt=  timezone.now()  
    order.save()
    return Response('Order Delivered')