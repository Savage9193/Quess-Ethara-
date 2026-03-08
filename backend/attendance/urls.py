from django.urls import path

from .views import (
    AttendanceByDateAPIView,
    AttendanceByEmployeeAPIView,
    AttendanceListCreateAPIView,
)


urlpatterns = [
    path("", AttendanceListCreateAPIView.as_view(), name="attendance-list-create"),
    path(
        "employee/<str:employee_id>/",
        AttendanceByEmployeeAPIView.as_view(),
        name="attendance-by-employee",
    ),
    path("filter/", AttendanceByDateAPIView.as_view(), name="attendance-by-date"),
]

