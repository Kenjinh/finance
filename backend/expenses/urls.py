from django.urls import path, re_path

from expenses.views import CategoryView, ExpenseView
urlpatterns = [
    re_path(r'^category/(?P<pk>\d+)?$', CategoryView.as_view(), name='caregory-api'),
    re_path(r'^(?P<pk>\d+)?$', ExpenseView.as_view(), name='expense-api')
]