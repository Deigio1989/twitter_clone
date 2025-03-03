from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate, get_user_model
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from users.models import UserProfile
from users.serializers import UserSerializer, CustomTokenObtainPairSerializer, RegisterSerializer, UserProfileSerializer

User = get_user_model()

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_following(request):
    user = request.user
    if not hasattr(user, 'profile'):
        return Response({'error': 'User does not have a profile.'}, status=400)
    following_profiles = user.profile.following.all()
    serializer = UserProfileSerializer(following_profiles, many=True)
    return Response({'following': serializer.data})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_followers(request):
    user = request.user
    if not hasattr(user, 'profile'):
        return Response({'error': 'User does not have a profile.'}, status=400)
    followers_profiles = user.profile.followers.all()
    serializer = UserProfileSerializer(followers_profiles, many=True)
    return Response({'followers': serializer.data})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    user = request.user
    profile, created = UserProfile.objects.get_or_create(user=user)
    serializer = UserProfileSerializer(profile)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    profile, created = UserProfile.objects.get_or_create(user=user)
    serializer = UserProfileSerializer(profile, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow_user(request, user_id):
    user_to_follow = get_object_or_404(User, id=user_id)
    profile_to_follow, created = UserProfile.objects.get_or_create(user=user_to_follow)
    request.user.profile.following.add(profile_to_follow)
    return JsonResponse({'status': 'ok', 'message': f'Now following {user_to_follow.username}'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unfollow_user(request, user_id):
    user_to_unfollow = get_object_or_404(User, id=user_id)
    profile_to_unfollow, created = UserProfile.objects.get_or_create(user=user_to_unfollow)
    request.user.profile.following.remove(profile_to_unfollow)
    return JsonResponse({'status': 'ok', 'message': f'Unfollowed {user_to_unfollow.username}'})

@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        return Response({'message': 'Login bem-sucedido'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Credenciais inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': 'Usuário registrado com sucesso'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
