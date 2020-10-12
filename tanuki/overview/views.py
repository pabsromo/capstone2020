from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db.models.functions import Coalesce
from django.db.models import Sum
import datetime

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
        daterange = getCurrentWeek()
        startdate = daterange[0]
        enddate = daterange[1]
        items = AddItem.objects.filter(user=request.user)    #only show objects for authenticated user
        essSum = AddItem.objects.filter(user=request.user, itemType="essential", dateDisplayed__range=[startdate, enddate]).aggregate(sum=Sum('itemPrice'))['sum'] or 0
        leiSum = AddItem.objects.filter(user=request.user, itemType="leisure", dateDisplayed__range=[startdate, enddate]).aggregate(sum=Sum('itemPrice'))['sum'] or 0
        optSum = AddItem.objects.filter(user=request.user, itemType="optional", dateDisplayed__range=[startdate, enddate]).aggregate(sum=Sum('itemPrice'))['sum'] or 0
        unxSum = AddItem.objects.filter(user=request.user, itemType="unexpected", dateDisplayed__range=[startdate, enddate]).aggregate(sum=Sum('itemPrice'))['sum'] or 0
        totalSum = AddItem.objects.filter(user=request.user, dateDisplayed__range=[startdate, enddate]).aggregate(sum=Sum('itemPrice'))['sum'] or 0
        form = AddItemForm(label_suffix=' ')

        context = {'form': form, 'items': items, 'essSum': essSum, 'leiSum': leiSum, 'optSum': optSum, 'unxSum': unxSum, 'totalSum': totalSum}
    return render(request, 'home.html', context)



def getCurrentWeek():
    today = datetime.date.today()
    monday = today - datetime.timedelta(days=today.weekday())
    daysTillSunday = (6-today.weekday()) % 7
    sunday = today + datetime.timedelta(days=daysTillSunday)
    range = [monday, sunday]
    return range
