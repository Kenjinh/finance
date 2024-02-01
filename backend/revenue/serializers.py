from rest_framework import serializers
from revenue.models import Revenue

class RevenueSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Revenue
        fields = '__all__'