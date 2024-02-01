from rest_framework.response import Response
from rest_framework.views import APIView
from revenue.models import Revenue
from revenue.serializers import RevenueSerializer

class RevenueView(APIView):
    def get(self, request, pk=None):
        user_id = self.request.query_params.get('user_id')
        if pk is not None:
            revenues = Revenue.objects.get(id=pk, user_id=user_id)
            serializer = RevenueSerializer(revenues, many=False)
            return Response(serializer.data)
        else:
            month = self.request.query_params.get('month')
            if month:
                month = month.split('-')
                revenues = Revenue.objects.filter(date__month=month[1], date__year=month[0], user_id=user_id)
            else:
                revenues = Revenue.objects.filter(user_id=user_id)
            serializer = RevenueSerializer(revenues, many=True)
            return Response(serializer.data)
    
    def post(self, request, pk=None):
        description = request.data.get('description')
        amount = request.data.get('amount')
        date = request.data.get('date')
        user = request.data.get('user')
        if not (description and amount and date and user):
            return Response({'error': 'All fields are required'}, status=400)
        data = {
            'description': description,
            'amount': amount,
            'date': date,
            'user': user,
        }
        serializer = RevenueSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)
    
    def patch(self, request, pk=None):
        if pk:
            try:
                revenue = Revenue.objects.get(id=pk)
            except Revenue.DoesNotExist:
                return Response({'error': 'Revenue does not exist'}, status=404)
            serializer = RevenueSerializer(revenue, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)
            else:
                return Response(serializer.errors, status=400)
        else:
            return Response({'error': 'Needs PK'}, status=400)
