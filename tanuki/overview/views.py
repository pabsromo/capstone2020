from django.shortcuts import render
from django.http import HttpResponse
from .models import Week

# Create your views here.

def overview(request):

    curr_week = Week.objects.all().filter(user="pabromo")

    return render(request, 'overview.html', {'curr_week': curr_week})