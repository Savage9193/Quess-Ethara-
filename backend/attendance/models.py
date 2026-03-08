from django.db import models

from employees.models import Employee


class Attendance(models.Model):
    STATUS_PRESENT = "Present"
    STATUS_ABSENT = "Absent"

    STATUS_CHOICES = [
        (STATUS_PRESENT, "Present"),
        (STATUS_ABSENT, "Absent"),
    ]

    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        related_name="attendances",
    )
    date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-date", "-created_at"]
        unique_together = ("employee", "date")

    def __str__(self) -> str:
        return f"{self.employee} - {self.date} - {self.status}"

