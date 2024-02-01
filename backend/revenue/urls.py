from django.urls import path, re_path

from revenue.views import RevenueView
urlpatterns = [
    re_path(r'^(?P<pk>\d+)?$', RevenueView.as_view(), name='revenue-api')
]