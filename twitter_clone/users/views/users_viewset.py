from rest_framework import viewsets, status
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from users.serializers import UserSerializer, CustomTokenObtainPairSerializer , RegisterSerializer
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate

@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)

    if user is not None:
        # Se autenticação for bem-sucedida, você pode retornar um token de acesso
        return Response({'message': 'Login bem-sucedido'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Credenciais inválidas'}, status=status.HTTP_401_UNAUTHORIZED)
    

@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response({'success': 'Usuário registrado com sucesso'}, status=status.HTTP_201_CREATED)
    
    # Adiciona log para verificar os erros de validação
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer