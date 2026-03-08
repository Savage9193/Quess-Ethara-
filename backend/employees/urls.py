from django.urls import path

from .views import EmployeeDestroyAPIView, EmployeeListCreateAPIView


urlpatterns = [
    path("", EmployeeListCreateAPIView.as_view(), name="employee-list-create"),
    # Use employee_id in the URL so we don't depend on the internal Mongo _id
   path("<str:employee_id>/", EmployeeDestroyAPIView.as_view(), name="employee-destroy")
]


