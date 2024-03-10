
from django.urls import path
from base.views import product_views as views




urlpatterns = [
    
    path('',views.getProducts),
    path("<str:pk>/",views.getsingleProducts, name="product")
    
    
]

