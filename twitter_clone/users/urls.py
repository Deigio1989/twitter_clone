from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, CustomTokenObtainPairView, register_user, login_user

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', register_user, name='register_user'),
    path('api/login/', login_user, name='login'),
    path('', include(router.urls)),
]
