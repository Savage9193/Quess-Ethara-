from rest_framework import serializers

from .models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    # Expose business key as id so the frontend can use it directly
    id = serializers.CharField(source="employee_id", read_only=True)

    class Meta:
        model = Employee
        fields = [
            "id",
            "employee_id",
            "full_name",
            "email",
            "department",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def validate(self, attrs):
        # Ensure required fields explicitly (DRF handles most, but be explicit for clarity)
        required_fields = ["employee_id", "full_name", "email", "department"]
        errors = {}

        for field in required_fields:
            if not attrs.get(field):
                errors[field] = ["This field is required."]

        if errors:
            raise serializers.ValidationError(errors)

        return attrs




