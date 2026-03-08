from rest_framework import generics, status
from rest_framework.response import Response

from .models import Employee
from .serializers import EmployeeSerializer


class EmployeeListCreateAPIView(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class EmployeeDestroyAPIView(generics.DestroyAPIView):
   def delete(self, request, employee_id):
        try:
            employee = Employee.objects.get(employee_id=employee_id)
            employee.delete()
            return Response(
                {"message": "Employee deleted successfully"},
                status=status.HTTP_204_NO_CONTENT
            )
        except Employee.DoesNotExist:
            return Response(
                {"error": "Employee not found"},
                status=status.HTTP_404_NOT_FOUND
            )

