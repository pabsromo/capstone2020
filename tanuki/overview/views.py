from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import AddItemForm

# Create your views here.

@login_required(login_url='login:index')
def home(request):
    if request.method == 'POST':
        return HttpResponse('Help')
    else:
        form = AddItemForm()
        return render(request, 'home.html', {'form': form})
