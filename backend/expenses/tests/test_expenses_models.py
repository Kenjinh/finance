import pytest
from datetime import datetime

from django.contrib.auth.models import User

from expenses.models import Category, Expense


@pytest.mark.django_db
def test_category_model():
    category = Category.objects.create(name="Casa")
    category.save()
    assert category.name == "Casa"

@pytest.mark.django_db
def test_expense_model():
    user = User.objects.create_user(username="Teste", password="teste1234")
    category = Category.objects.create(name="Casa")
    category.save()
    expense = Expense.objects.create(description="Luz", amount=72.05, category=category, date=datetime.now().date().strftime('%Y-%m-%d'), user_id=user.id)
    assert expense.description == "Luz"
    assert expense.amount == 72.05
    assert expense.user == user
    assert expense.category.name == "Casa"
    assert expense.date == datetime.now().date().strftime('%Y-%m-%d')

@pytest.mark.django_db
def test_expenses_interval_model():
    user = User.objects.create_user(username="Teste", password="teste1234")
    category = Category.objects.create(name="Casa")
    category.save()
    expense = Expense.create_with_interval(description="Luz", amount=72.05, category_id=category.id, date=datetime.now().date().strftime('%Y-%m-%d'), interval=2, user_id=user.id)
    luz = Expense.objects.filter(description="Luz")
    assert expense[0].description == "Luz"
    assert expense[0].amount == 72.05
    assert expense[0].category.name == "Casa"
    assert expense[0].date == datetime.now().date()
    assert expense[0].interval == 2
    assert expense[0].user == user
    assert luz.count() == 2