from django.utils import timezone
from rest_framework.response import Response
from rest_framework.views import APIView

from attendance.models import Attendance
from employees.models import Employee


class DashboardAPIView(APIView):
    def get(self, request):
        today = timezone.now().date()

        total_employees = Employee.objects.count()
        present_today = Attendance.objects.filter(
            date=today, status=Attendance.STATUS_PRESENT
        ).count()
        absent_today = Attendance.objects.filter(
            date=today, status=Attendance.STATUS_ABSENT
        ).count()

        present_summary = []
        for employee in Employee.objects.all():
            total_present = employee.attendances.filter(
                status=Attendance.STATUS_PRESENT
            ).count()
            present_summary.append(
                {
                    "employee_id": employee.employee_id,
                    "full_name": employee.full_name,
                    "department": employee.department,
                    "total_present_days": total_present,
                }
            )

        data = {
            "total_employees": total_employees,
            "present_today": present_today,
            "absent_today": absent_today,
            "present_summary": present_summary,
        }
        return Response(data)

