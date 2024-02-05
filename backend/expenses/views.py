from django.urls import is_valid_path
from ipdb import set_trace
from rest_framework.response import Response
from rest_framework.views import APIView

from expenses.models import Category, Expense
from expenses.serializers import CategorySerializer, ExpenseSerializer

class CategoryView(APIView):
    def get(self, request, pk=None):
        """
        Return a list of all categories
        """
        if pk is not None:
            categories = Category.objects.get(id=pk)
            serializer = CategorySerializer(categories, many=False)
            return Response(serializer.data)
        else:
            categories = Category.objects.all()
            serializer = CategorySerializer(categories, many=True)
            return Response(serializer.data)
    
    def post(self, request, pk=None):
        """
        Create a new category
        """
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
            
    def patch(self, request, pk=None):
        """
        Update a category
        """
        if pk is not None:
            try:
                category = Category.objects.get(id=pk)
            except Category.DoesNotExist:
                return Response({'error': 'Category does not exist'}, status=404)

            serializer = CategorySerializer(category, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)
            else:
                return Response(serializer.errors, status=400)
        else:
            return Response(status=400)
            
class ExpenseView(APIView):
    def get(self, request, pk=None):
        filter = {}
        user_id = self.request.query_params.get('user_id')
        month = self.request.query_params.get('month')
        description = self.request.query_params.get('description')
        if pk is not None:
            expenses = Expense.objects.get(id=pk, user_id=user_id)
            serializer = ExpenseSerializer(expenses, many=False)
            return Response(serializer.data)
        else:
            if user_id is not None:
                filter.update({'user_id': user_id})
            if month:
                month = month.split('-')
                filter.update({'date__month': month[1], 'date__year':month[0]})
            if description:
                filter.update({'description__icontains': description})
            expenses = Expense.objects.filter(**filter)
            serializer = ExpenseSerializer(expenses, many=True)
            return Response(serializer.data)

    def post(self, request, pk=None):
        interval = request.data.get('interval')
        description = request.data.get('description')
        amount = request.data.get('amount')
        category = request.data.get('category')
        date = request.data.get('date')
        user = request.data.get('user')
        if interval:
            if not (description and amount and category and date and user):
                return Response({'error': 'All fields are required'}, status=400)

            try:
                expenses = Expense.create_with_interval(description=description, amount=amount, category_id=category, date=date, interval=interval, user_id=user)
                serializer = ExpenseSerializer(expenses, many=True)
                return Response(serializer.data, status=201)
            except Exception as e:
                return Response({'error': f'Error on create with interval: {str(e)}'}, status=400)
        else:
            if not (description and amount and category and date and user):
                return Response({'error': 'All fields are required'}, status=400)
            data = {
                'description': description,
                'amount': amount,
                'category': category,
                'date': date,
                'user': user,
            }
            serializer = ExpenseSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)
            else:
                return Response(serializer.errors, status=400)


    
    def patch(self, request, pk=None):
        if pk:
            try:
                expense = Expense.objects.get(id=pk)
            except Expense.DoesNotExist:
                return Response({'error': 'Expense does not exist'}, status=404)
            serializer = ExpenseSerializer(expense, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)
            else:
                return Response(serializer.errors, status=400)
        else:
            return Response({'error': 'Needs PK'}, status=400)

    
