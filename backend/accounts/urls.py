from django.urls import path

from .views import AccountAuthView, AccountView

urlpatterns = [
    path('', AccountView.as_view(), name='account-api'),
    path('auth/', AccountAuthView.as_view(), name='account-auth-api')
]