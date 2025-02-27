from rest_framework import serializers
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {
            'password': {'write_only': True},
            'username': {
                'error_messages': {
                    'unique': "Um usuário com esse nome de usuário já está registrado.",
                    'invalid': "Digite um nome de usuário válido. Esse valor pode conter apenas letras, números e @/./+/-/_ caracteres."
                }
            },
            'email': {
                'error_messages': {
                    'unique': "Um usuário com esse e-mail já está registrado."
                }
            }
        }

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with that e-mail already exists.")
        return value
    
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Um usuário com esse nome de usuário já está registrado.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
