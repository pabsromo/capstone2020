from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import AddItemForm

# Create your views here.

@login_required(login_url='login:index')
def home(request): 
    if request.method == 'POST':
        form = AddItemForm(request.POST, label_suffix =' ')
        if form.is_valid():
            addItem = form.save(commit=False)
            addItem.itemType = form.cleaned_data['itemType']
            addItem.user = request.user
            addItem.save() 
            itemName = form.cleaned_data['itemName']
            itemPrice = form.cleaned_data['itemPrice']
            return redirect('overview:home')
        else:
            context = {'form': form}  
    else:
        form = AddItemForm(label_suffix=' ')
        context = {'form': form}
    return render(request, 'home.html', context)
