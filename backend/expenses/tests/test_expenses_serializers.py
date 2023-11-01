import pytest

from django.contrib.auth.models import User

from expenses.serializers import CategorySerializer, ExpenseSerializer
from expenses.models import Category

@pytest.mark.django_db
def test_valid_category_serializer():
    valid_serializer_data = {
        "name": "teste",
    }

    serializer = CategorySerializer(data=valid_serializer_data)
    assert serializer.is_valid(raise_exception=True)
    assert serializer.validated_data == valid_serializer_data

@pytest.mark.django_db
def test_valid_expense_serializer():
    user = User.objects.create_user(username="Teste", password="teste1234")
    category = Category.objects.create(name="Casa")
    valid_serializer_data = {
        "description": "teste",
        "amount": 100.0,
        "interval": 2,
        "user": user.id,
        "category": int(category.id),
        "date": "2023-01-01",
    }

    serializer = ExpenseSerializer(data=valid_serializer_data)
    assert serializer.is_valid(raise_exception=True)
    serialized_data_dict = dict(serializer.data)
    serialized_amount = float(serialized_data_dict['amount'])
    serialized_data_dict['amount'] = serialized_amount
    assert serialized_data_dict == valid_serializer_data