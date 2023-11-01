from datetime import datetime
import json
import pytest

from expenses.models import Category, Expense
@pytest.mark.django_db
def test_create_category(client):
    category = Category.objects.all()
    assert category.count() == 0

    response = client.post(
        "/api/expense/category/",
        {
            "name": "Casa"
        },
        content_type="application/json"
    )

    assert response.status_code == 201

    category = Category.objects.all()
    assert response.data['name'] == "Casa"
    assert category.count() == 1

@pytest.mark.django_db
def test_get_categorys(client):
    response = client.get("/api/expense/category/")
    assert response.status_code == 200

@pytest.mark.django_db
def test_update_category(client):
    response = client.post(
        "/api/expense/category/",
        {
            "name": "Casa"
        },
        content_type="application/json"
    )
    assert response.status_code == 201
    response = client.patch(
        f"/api/expense/category/{response.data['id']}",
        {
            "name": "Carro"
        },
        content_type="application/json"
    )
    assert response.status_code == 200
    assert response.data['name'] == "Carro"



@pytest.mark.django_db
def test_create_expense(client):
    expense = Expense.objects.all()
    assert expense.count() == 0
    response = client.post(
        "/api/expense/category/",
        {
            "name": "Carro"
        },
        content_type="application/json"
    )

    assert response.status_code == 201
    category_id = response.data['id']
    response = client.post(
        "/api/account/",
        {
            "username": "teste",
            "password": "teste1234"
        },
        content_type="application/json"
    )
    assert response.status_code == 201
    user_id = response.data['user_id']
    response = client.post(
        "/api/expense/",
        {
            "description": "Gasolina",
            "amount": 100.00,
            "category": category_id,
            "user": user_id,
            "date": datetime.now().date()
        },
        content_type="application/json"
    )

    assert response.status_code == 201

    expense = Expense.objects.all()
    assert response.data['description'] == "Gasolina"
    assert float(response.data['amount']) == 100.00
    assert response.data['date'] == datetime.now().date().strftime('%Y-%m-%d')
    assert response.data['user'] == user_id
    assert expense.count() == 1

@pytest.mark.django_db
def test_create_expense_interval(client):
    expense = Expense.objects.all()
    assert expense.count() == 0
    response = client.post(
        "/api/expense/category/",
        {
            "name": "Carro"
        },
        content_type="application/json"
    )

    assert response.status_code == 201
    category_id = response.data['id']
    response = client.post(
        "/api/account/",
        {
            "username": "teste",
            "password": "teste1234"
        },
        content_type="application/json"
    )
    assert response.status_code == 201
    user_id = response.data['user_id']
    response = client.post(
        "/api/expense/",
        {
            "description": "Gasolina",
            "amount": 100.00,
            "category": category_id,
            "user": user_id,
            "interval": 2,
            "date": datetime.now().date()
        },
        content_type="application/json"
    )
    assert response.status_code == 201

    expense = Expense.objects.all()
    assert response.data[0]['description'] == "Gasolina"
    assert float(response.data[0]['amount']) == 100.00
    assert response.data[0]['date'] == datetime.now().date().strftime('%Y-%m-%d')
    assert response.data[0]['user'] == user_id
    assert expense.count() == 2

# @pytest.mark.django_db
# def test_get_expenses(client):
#     response = client.get("/api/expense/")
#     assert response.status_code == 200

# @pytest.mark.django_db
# def test_update_expense(client):
#     response = client.post(
#         "/api/expense/",
#         {
#             "name": "Casa"
#         },
#         content_type="application/json"
#     )
#     assert response.status_code == 201
#     response = client.patch(
#         f"/api/expense/{response.data['id']}",
#         {
#             "name": "Carro"
#         },
#         content_type="application/json"
#     )
#     assert response.status_code == 200
#     assert response.data['name'] == "Carro"