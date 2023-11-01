import pytest

from accounts.serializers import AccountSerializer

@pytest.mark.django_db
def test_valid_account_serializer():
    valid_serializer_data = {
        "username": "teste_user",
        "password": "Lince123",
    }

    serializer = AccountSerializer(data=valid_serializer_data)
    assert serializer.is_valid(raise_exception=True)
    assert serializer.validated_data == valid_serializer_data