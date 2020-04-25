from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import AddItemForm
from .models import AddItem


@login_required(login_url='login:index')   #redirect to login if user has not been authenticated
def home(request): 
    if request.method == 'POST':
        form = AddItemForm(request.POST, label_suffix =' ')
        if form.is_valid():
            addItem = form.save(commit=False)
            addItem.itemType = form.cleaned_data['itemType']
            addItem.user = request.user
            addItem.save()    #save form after the user and itemType have been determined
            itemName = form.cleaned_data['itemName']
            itemPrice = form.cleaned_data['itemPrice']
            return redirect('overview:home')
        else:
            context = {'form': form}  
    else:
        items = AddItem.objects.filter(user=request.user)    #only show objects for authenticated user
        form = AddItemForm(label_suffix=' ')

        context = {'form': form, 'items': items}
    return render(request, 'home.html', context)
