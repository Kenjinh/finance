from django.db import IntegrityError
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from accounts.serializers import AccountSerializer

class AccountView(APIView):
    def get(self, request):
        """
        Return a list of all users.
        """
        try:
            users =  User.objects.all()
        except User.DoesNotExist:
            return Response(status=404)
        serializer = AccountSerializer(users, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        """
        Create a new user and token.
        """
        serializer = AccountSerializer(data=request.data)

        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            email = serializer.validated_data['email']
        
            if not username or not password or not email:
                return Response({'error': 'Missing username or password'}, status=400)
            try:
                user = User.objects.create_user(username=username, password=password, email=email)
                token, created = Token.objects.get_or_create(user=user)
                return Response({'id': user.id, 'username': user.username, 'email': user.email, 'token': token.key}, status=201)
            except IntegrityError:
                return Response({'error': 'User already exists'}, status=400)
            except Exception as e:
                return Response({'error': str(e)}, status=500)
        else:
            return Response(serializer.errors, status=400)


class AccountAuthView(APIView):
    permission_classes = []
    authentication_classes = []
    def post(self, request):
        """
        User Login
        """
        username = request.data.get('username')
        password = request.data.get('password')
        if not username or not password:
            return Response({'error': 'Missing username or password'}, status=400)
        try:
            user = authenticate(username=username, password=password)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'id': user.id, 'username': user.username, 'email': user.email, 'token': token.key}, status=200)
        except User.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=400)