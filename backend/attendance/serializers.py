from datetime import date as date_cls

from rest_framework import serializers

from employees.models import Employee

from .models import Attendance


class AttendanceSerializer(serializers.ModelSerializer):
    # We don't expose the internal Mongo _id; rely on employee_id instead
    id = serializers.SerializerMethodField(read_only=True)

    # When creating, accept employee_id as the "employee" field (slug lookup)
    employee = serializers.SlugRelatedField(
        slug_field="employee_id", queryset=Employee.objects.all()
    )

    employee_name = serializers.CharField(
        source="employee.full_name", read_only=True
    )
    employee_employee_id = serializers.CharField(
        source="employee.employee_id", read_only=True
    )

    class Meta:
        model = Attendance
        fields = [
            "id",
            "employee",
            "employee_name",
            "employee_employee_id",
            "date",
            "status",
            "created_at",
        ]
        read_only_fields = ["id", "created_at", "employee_name", "employee_employee_id"]

    def get_id(self, obj):
        # Use a stable string representation; combination of employee_id and date
        return f"{obj.employee.employee_id}-{obj.date.isoformat()}"

    def validate(self, attrs):
        errors = {}

        employee = attrs.get("employee")
        attendance_date = attrs.get("date")
        status = attrs.get("status")

        if not employee:
            errors["employee"] = ["This field is required."]
        if not attendance_date:
            errors["date"] = ["This field is required."]
        if not status:
            errors["status"] = ["This field is required."]

        if attendance_date and not isinstance(attendance_date, date_cls):
            errors["date"] = ["Invalid date."]

        if errors:
            raise serializers.ValidationError(errors)

        if employee and attendance_date:
            exists = Attendance.objects.filter(
                employee=employee, date=attendance_date
            ).exists()
            if exists:
                raise serializers.ValidationError(
                    {
                        "non_field_errors": [
                            "Attendance for this employee on this date already exists."
                        ]
                    }
                )

        return attrs



