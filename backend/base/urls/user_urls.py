
from django.urls import path
from base.views import user_views as views




urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    path('profile/',views.getUserProfile,name = "user-profile"),
    path('profile/update/',views.updateUserProfile,name = "update-user-profile"),
    path('',views.getUsers,name = "user"),
    path("register/",views.registerUser,name='register'),


    path("delete/<str:pk>/",views.deleteUser,name='delete'),
    
    path('<str:pk>/',views.getUserById,name='getUser'),
    path('update/<str:pk>/',views.updateUser,name='updateUser')
    
]


