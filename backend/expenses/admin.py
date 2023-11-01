from datetime import date
from django.contrib import admin

from expenses.models import Expense, Category

# Register your models here.

@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    def total_month(self, obj):
        expenses = Expense.objects.filter(user=obj.user, date__month=obj.date.month)
        return sum(expense.amount for expense in expenses)
    
    list_display=('description', 'amount', 'date', 'user', 'total_month')
    list_filter = (
        ('date', admin.DateFieldListFilter),
    )


admin.site.register(Category)