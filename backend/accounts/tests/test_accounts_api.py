import pytest

from django.contrib.auth.models import User

@pytest.mark.django_db
def test_create_account(client):
    account = User.objects.all()
    assert account.count() == 0
    username = "teste"
    password = "teste1234"
    email = "teste@teste.com"
    response = client.post(
        "/api/account/",
        {   
            "email": email,
            "username": username,
            "password": password
        },
        content_type="application/json"
    )

    assert response.status_code == 201

    account = User.objects.all()
    assert response.data['id'] == account.first().id
    assert response.data['username'] == username
    assert response.data['email'] == email
    assert account.count() == 1

@pytest.mark.django_db
def test_get_accounts(client):
    response = client.get("/api/account/")
    assert response.status_code == 200

@pytest.mark.django_db
def test_login_account(client):
    username = "teste"
    password = "teste1234"
    email = "teste@teste.com"
    response = client.post(
        "/api/account/",
        {
            "email": email,
            "username": username,
            "password": password
        },
        content_type="application/json"
    )
    assert response.status_code == 201
    account = User.objects.get(id=response.data['id'])
    response = client.post(
        "/api/account/auth/",
        {
            "username": username,
            "password": password
        },
        content_type="application/json"
    )
    assert response.status_code == 200
    assert response.data['id'] == account.id
