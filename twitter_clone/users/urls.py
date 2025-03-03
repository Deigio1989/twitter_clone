from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, CustomTokenObtainPairView, register_user, login_user, follow_user, unfollow_user, get_profile, update_profile ,get_following, get_followers

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', register_user, name='register_user'),
    path('api/login/', login_user, name='login'),
    path('follow/<int:user_id>/', follow_user, name='follow_user'),
    path('unfollow/<int:user_id>/', unfollow_user, name='unfollow_user'),
    path('users/profile/', get_profile, name='get_profile'),
    path('users/profile/update/', update_profile, name='update_profile'),
    path('users/following/', get_following, name='get_following'),
    path('users/followers/', get_followers, name='get_followers'),
    
    path('', include(router.urls)),
]
