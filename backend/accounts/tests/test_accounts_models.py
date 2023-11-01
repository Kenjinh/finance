import pytest

from django.contrib.auth.models import User


@pytest.mark.django_db
def test_account_model():
    user = User.objects.create_user(username="Teste", password="teste1234")
    user.save()
    print(user.password)
    assert user.username == "Teste"
    assert user.check_password("teste1234")