from datetime import datetime

from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from employees.models import Employee

from .models import Attendance
from .serializers import AttendanceSerializer


class AttendanceListCreateAPIView(generics.ListCreateAPIView):
    queryset = Attendance.objects.select_related("employee").all()
    serializer_class = AttendanceSerializer


class AttendanceByEmployeeAPIView(APIView):
    def get(self, request, employee_id: str):
        employee = get_object_or_404(Employee, employee_id=employee_id)
        records = Attendance.objects.filter(employee=employee).select_related(
            "employee"
        )
        serializer = AttendanceSerializer(records, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AttendanceByDateAPIView(APIView):
    def get(self, request):
        date_str = request.query_params.get("date")
        if not date_str:
            return Response(
                {"date": ["This query parameter is required."]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            parsed_date = datetime.strptime(date_str, "%Y-%m-%d").date()
        except ValueError:
            return Response(
                {"date": ["Invalid date format. Use YYYY-MM-DD."]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        records = Attendance.objects.filter(date=parsed_date).select_related(
            "employee"
        )
        serializer = AttendanceSerializer(records, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

