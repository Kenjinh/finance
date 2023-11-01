from datetime import datetime, timedelta
from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name
class Expense(models.Model):
    description = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    interval = models.PositiveIntegerField(null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()

    def __str__(self):
        return self.description
    
    @classmethod
    def create_with_interval(cls, description, amount, date, interval, category_id, user_id):
        expenses = []
        date = datetime.strptime(date, '%Y-%m-%d').date()
        current_date = date
        for _ in range(interval):
            expense = cls(description=description, amount=amount, date=current_date, interval=interval, category_id=category_id, user_id=user_id)
            expense.save()
            expenses.append(expense)
            current_date += timedelta(days=30)
        return expenses
    class Meta:
        ordering = ('-date',)


    