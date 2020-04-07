from django.urls import path
from . import views

app_name = 'login'

urlpatterns = [
    path('', views.index, name='index'),
    path('signup/', views.signup, name='signup'),
    path('home/', views.home, name='home'),
    #path('index.html', views.index, name= 'index')
]
