from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from users.models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['avatar_url', 'bio', 'location', 'birth_date']

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile']
    
    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create(**validated_data)
        UserProfile.objects.create(user=user, **profile_data)
        return user
    
    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile')
        profile = instance.profile
        
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.save()
        
        profile.bio = profile_data.get('bio', profile.bio)
        profile.location = profile_data.get('location', profile.location)
        profile.birth_date = profile_data.get('birth_date', profile.birth_date)
        profile.save()
        
        return


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Adicione claims personalizadas aqui
        token['username'] = user.username
        token['email'] = user.email
        return token

