from django.db import models


class Employee(models.Model):
    employee_id = models.CharField(max_length=32, primary_key=True,unique=True)  # <-- IMPORTANT
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    department = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return f"{self.full_name} ({self.employee_id})"