from django.urls import path
from . import views

app_name = 'overview'

urlpatterns = [
    path('home/', views.home, name='home'),
]
