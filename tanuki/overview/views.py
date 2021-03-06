from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db.models.functions import Coalesce
from django.db.models import Sum
import datetime

from .forms import AddItemForm
from .models import AddItem
from budget.models import Summary, Income, FixedExpenses, Investing


@login_required(login_url='login:index')   #redirect to login if user has not been authenticated
def home(request): 
    print(request.user.id)
    print("LOOK HERE")
    if request.method == 'POST':
        form = AddItemForm(request.POST, label_suffix =' ')

        if request.POST.get('action')=='delete':
            AddItem.objects.get(id=request.POST.get('item_id')).delete()
            return redirect('overview:home')
        if form.is_valid() and request.POST.get('action')=='edit':
            data = AddItem.objects.get(id=request.POST.get('item_id'))
            data.itemName = request.POST.get('itemName')
            data.itemPrice = request.POST.get('itemPrice')
            data.itemType = request.POST.get('itemType')
            data.dateDisplayed = request.POST.get('dateDisplayed')
            data.save()
            return redirect('overview:home')
        elif form.is_valid() and request.POST.get('action')=='new':
            addItem = form.save(commit=False)
            addItem.itemType = form.cleaned_data['itemType']
            addItem.user = request.user
            addItem.save()    #save form after the user and itemType have been determined
            itemName = form.cleaned_data['itemName']
            itemPrice = form.cleaned_data['itemPrice']
            return redirect('overview:home')
        else:
            daterange = getCurrentWeek()
            startdate = daterange[0]
            enddate = daterange[1]
            essSum = AddItem.objects.filter(user=request.user, itemType="essential", dateDisplayed__range=[
                                            startdate, enddate]).aggregate(sum=Sum('itemPrice'))['sum'] or 0
            leiSum = AddItem.objects.filter(user=request.user, itemType="leisure", dateDisplayed__range=[
                                            startdate, enddate]).aggregate(sum=Sum('itemPrice'))['sum'] or 0
            optSum = AddItem.objects.filter(user=request.user, itemType="optional", dateDisplayed__range=[
                                            startdate, enddate]).aggregate(sum=Sum('itemPrice'))['sum'] or 0
            unxSum = AddItem.objects.filter(user=request.user, itemType="unexpected", dateDisplayed__range=[
                                            startdate, enddate]).aggregate(sum=Sum('itemPrice'))['sum'] or 0
            totalSum = AddItem.objects.filter(user=request.user, dateDisplayed__range=[
                                            startdate, enddate]).aggregate(sum=Sum('itemPrice'))['sum'] or 0
            # form = AddItemForm(label_suffix=' ')

            # only show objects for authenticated user
            essential_items = AddItem.objects.filter(user=request.user, itemType='essential', dateDisplayed__range=[startdate, enddate])
            leisure_items = AddItem.objects.filter(user=request.user, itemType='leisure', dateDisplayed__range=[startdate, enddate])
            optional_items = AddItem.objects.filter(user=request.user, itemType='optional', dateDisplayed__range=[startdate, enddate])
            unexpected_items = AddItem.objects.filter(user=request.user, itemType='unexpected', dateDisplayed__range=[startdate, enddate])
            if (Summary.objects.filter(user=request.user.id).first() is None):
                actualCash = 0
                availableEss = 0
                availableLei = 0
                availableOpt = 0
                availableUnx = 0
            else:
                actualCash = Summary.objects.filter(
                    user=request.user.id)[0].actualCash
                availableEss = Summary.objects.filter(
                    user=request.user.id)[0].essential
                availableLei = Summary.objects.filter(
                    user=request.user.id)[0].leisure
                availableOpt = Summary.objects.filter(
                    user=request.user.id)[0].optional
                availableUnx = Summary.objects.filter(
                    user=request.user.id)[0].unexpected
            try:
                essProgress = (essSum / availableEss) * 100
            except:
                essProgress = 0
            try:
                leiProgress = (leiSum / availableLei) * 100
            except:
                leiProgress = 0
            try:
                optProgress = (optSum / availableOpt) * 100
            except:
                optProgress = 0
            try:
                unxProgress = (unxSum / availableUnx) * 100
            except:
                unxProgress = 0
            try:
                totalProgress = (totalSum / actualCash) * 100
            except:
                totalProgress = 0

            # Forms
            essForms = {}
            leiForms = {}
            optForms = {}
            unxForms = {}

            # Make all the individual forms for the items
            # Make a list of form objects to be used with the correct id later.
            # Maybe include the id of the object or just make it a prefix
            # Remember, a prefix can make it unique
            for i in essential_items:
                essForms[i.id] = AddItemForm()
            for i in leisure_items:
                leiForms[i.id] = AddItemForm()
            for i in optional_items:
                optForms[i.id] = AddItemForm()
            for i in unexpected_items:
                unxForms[i.id] = AddItemForm()

            newForm = AddItemForm()

            context = {
                'essForms': essForms,
                'leiForms': leiForms,
                'optForms': optForms,
                'unxForms': unxForms,
                'newForm': newForm,
                'essSum': essSum,
                'leiSum': leiSum,
                'optSum': optSum,
                'unxSum': unxSum,
                'totalSum': totalSum,
                'actualCash': actualCash,
                'availableEss': availableEss,
                'availableLei': availableLei,
                'availableOpt': availableOpt,
                'availableUnx': availableUnx,
                'essProgress': essProgress,
                'leiProgress': leiProgress,
                'optProgress': optProgress,
                'unxProgress': unxProgress,
                'totalProgress': totalProgress,
                'essential_items': essential_items,
                'leisure_items': leisure_items,
                'optional_items': optional_items,
                'unexpected_items': unexpected_items,
            }
    else:
        daterange = getCurrentWeek()
        startdate = daterange[0]
        enddate = daterange[1]
        essSum = AddItem.objects.filter(user=request.user, itemType="essential", dateDisplayed__range=[startdate, enddate]).aggregate(sum=Sum('itemPrice'))['sum'] or 0
        leiSum = AddItem.objects.filter(user=request.user, itemType="leisure", dateDisplayed__range=[startdate, enddate]).aggregate(sum=Sum('itemPrice'))['sum'] or 0
        optSum = AddItem.objects.filter(user=request.user, itemType="optional", dateDisplayed__range=[startdate, enddate]).aggregate(sum=Sum('itemPrice'))['sum'] or 0
        unxSum = AddItem.objects.filter(user=request.user, itemType="unexpected", dateDisplayed__range=[startdate, enddate]).aggregate(sum=Sum('itemPrice'))['sum'] or 0
        totalSum = AddItem.objects.filter(user=request.user, dateDisplayed__range=[startdate, enddate]).aggregate(sum=Sum('itemPrice'))['sum'] or 0
        # form = AddItemForm(label_suffix=' ')
        
        # only show objects for authenticated user
        essential_items = AddItem.objects.filter(user=request.user, itemType='essential', dateDisplayed__range=[startdate, enddate])
        leisure_items = AddItem.objects.filter(user=request.user, itemType='leisure', dateDisplayed__range=[startdate, enddate])
        optional_items = AddItem.objects.filter(user=request.user, itemType='optional', dateDisplayed__range=[startdate, enddate])
        unexpected_items = AddItem.objects.filter(user=request.user, itemType='unexpected', dateDisplayed__range=[startdate, enddate])
        if (Summary.objects.filter(user=request.user.id).first() is None):
            actualCash = 0
            availableEss = 0
            availableLei = 0
            availableOpt = 0
            availableUnx = 0
            
            # Create a row in the database
            newSum = Summary(user_id=request.user.id)
            # newInc = Income(user_id=request.user.id)
            # newFix = FixedExpenses(user_id=request.user.id)
            # newInv = Investing(user_id=request.user.id)
            newSum.save()
            # newInc.save()
            # newFix.save()
            # newInv.save()
        else:
            actualCash = Summary.objects.filter(user=request.user.id)[0].actualCash
            availableEss = Summary.objects.filter(user=request.user.id)[0].essential
            availableLei = Summary.objects.filter(user=request.user.id)[0].leisure
            availableOpt = Summary.objects.filter(user=request.user.id)[0].optional
            availableUnx = Summary.objects.filter(user=request.user.id)[0].unexpected
        try:
            essProgress = (essSum / availableEss) * 100 
        except:
            essProgress = 0 
        try:
            leiProgress = (leiSum / availableLei) * 100
        except: 
            leiProgress = 0 
        try:
            optProgress = (optSum / availableOpt) * 100
        except:
            optProgress = 0 
        try:
            unxProgress = (unxSum / availableUnx) * 100 
        except:
            unxProgress = 0 
        try:
            totalProgress = (totalSum / actualCash) * 100 
        except:
            totalProgress = 0 

        # Forms
        essForms = {}
        leiForms = {}
        optForms = {}
        unxForms = {}

        # Make all the individual forms for the items
            # Make a list of form objects to be used with the correct id later.
            # Maybe include the id of the object or just make it a prefix
            # Remember, a prefix can make it unique
        for i in essential_items:
            essForms[i.id] = AddItemForm()
        for i in leisure_items:
            leiForms[i.id] = AddItemForm()
        for i in optional_items:
            optForms[i.id] = AddItemForm()
        for i in unexpected_items:
            unxForms[i.id] = AddItemForm()
        
        newForm = AddItemForm()

        context = {
            'essForms': essForms,
            'leiForms': leiForms,
            'optForms': optForms,
            'unxForms': unxForms,
            'newForm': newForm,
            'essSum': essSum,
            'leiSum': leiSum,
            'optSum': optSum,
            'unxSum': unxSum,
            'totalSum': totalSum,
            'actualCash': actualCash,
            'availableEss': availableEss,
            'availableLei': availableLei,
            'availableOpt': availableOpt,
            'availableUnx': availableUnx,
            'essProgress' : essProgress, 
            'leiProgress': leiProgress,
            'optProgress': optProgress,
            'unxProgress': unxProgress, 
            'totalProgress' : totalProgress,
            'essential_items': essential_items,
            'leisure_items': leisure_items,
            'optional_items': optional_items,
            'unexpected_items': unexpected_items,
            }

    return render(request, 'home.html', context)



def getCurrentWeek():
    today = datetime.date.today()
    monday = today - datetime.timedelta(days=today.weekday())
    daysTillSunday = (6-today.weekday()) % 7
    sunday = today + datetime.timedelta(days=daysTillSunday)
    range = [monday, sunday]
    return range
