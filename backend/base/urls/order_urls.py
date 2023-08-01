from django.urls import path
from base.views import order_views as views


urlpatterns = [
        path('add/', views.addOrderItems, name='orders-add'),
    #path('user/', views.get_user_orders, name='user-orders'),
    #path('<str:pk>/', views.get_order_by_id, name='order-details'),
    ]
