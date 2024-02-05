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
        """
        Create multiple expenses with a specified interval.

        Args:
        description (str): Description of the expenses.
        amount (float): Amount of the expenses.
        date (str): Date of the first expense in the format '%Y-%m-%d'.
        interval (int): Number of expenses to create.
        category_id (int): ID of the expense category.
        user_id (int): ID of the user.

        Returns:
        list: List of created expenses.
        """
        expenses = []
        date = datetime.strptime(date, '%Y-%m-%d').date()
        current_date = date
        if interval == 0:
            expense = cls(
                description=description,
                amount=amount,
                date=current_date,
                interval=interval,
                category_id=category_id,
                user_id=user_id
            )
            expense.save()
            expenses.append(expense)
            return expenses
        for _ in range(interval):
            expense = cls(
                description=description,
                amount=amount,
                date=current_date,
                interval=interval,
                category_id=category_id,
                user_id=user_id
            )
            expense.save()
            expenses.append(expense)
            current_date += timedelta(days=30)
        return expenses
    class Meta:
        ordering = ('-date',)


    