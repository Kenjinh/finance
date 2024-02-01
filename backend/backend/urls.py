from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/account/', include('accounts.urls')),
    path('api/expense/', include('expenses.urls')),
    path('api/revenue/', include('revenue.urls')),
]
