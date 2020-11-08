from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.db.models import Sum

from .forms import SummaryForm, IncomeForm, FixedExpensesForm, InvestingForm
from .models import Summary, Income, FixedExpenses, Investing

# Create your views here.

@login_required(login_url='login:index')   #redirect to login if user has not been authenticated
def budget(request):
    print(request.user.id)
    print('user: ', request.user)
    print('this is the request:', request.POST.values)
    if request.method == 'POST' and 'deleteincome' not in request.POST and 'deletefixed' not in request.POST and 'editsavings' not in request.POST:
        incomeForm = IncomeForm(request.POST, label_suffix =' ')
        fexpensesForm = FixedExpensesForm(request.POST, label_suffix=' ')
        summaryForm = SummaryForm(request.POST, label_suffix=' ')
        if incomeForm.is_valid() and 'income' in request.POST:
            income = incomeForm.save(commit=False)
            income.user = request.user
            income.save()    #save form after the user and itemType have been determined
            itemName = incomeForm.cleaned_data['itemName']
            itemAmount = incomeForm.cleaned_data['itemAmount']
            # itemDate = incomeForm.cleaned_data['itemDate']
            return redirect('budget:budget')
        if fexpensesForm.is_valid() and 'fixed' in request.POST:
            fixed = fexpensesForm.save(commit=False)
            fixed.user = request.user
            fixed.save()
            itemName = fexpensesForm.cleaned_data['itemName']
            itemAmount = fexpensesForm.cleaned_data['itemAmount']
            # itemDate = fexpensesForm.cleaned_data['itemDate']
            return redirect('budget:budget')
        if summaryForm.is_valid() and 'savings' in request.POST:
            print('got here')
            if Summary.objects.filter(user=request.user.id).exists():
                data = Summary.objects.filter(user=request.user.id)[0]
                data.monthlySavings = request.POST.get('monthlySavings')
                data.save()
            else:
                summary = summaryForm.save(commit=False)
                summary.user = request.user
                monthlySavings = summaryForm.cleaned_data['monthlySavings']
                summary.save()
            return redirect('budget:budget')
        if summaryForm.is_valid and 'editCategories' in request.POST:
            data = Summary.objects.filter(user=request.user.id)[0]
            data.essential = request.POST.get('essential')
            data.leisure = request.POST.get('leisure')
            data.optional = request.POST.get('optional')
            data.unexpected = request.POST.get('unexpected')
            data.save()
            return redirect('budget:budget')
        else:
            # Getting forms
            summaryForm = SummaryForm(label_suffix=' ')
            incomeForm = IncomeForm(label_suffix=' ')
            fexpensesForm = FixedExpensesForm(label_suffix=' ')
            # investingForm = InvestingForm(label_suffix=' ')

            # need to filter for user info only
            summaryItems = Summary.objects.filter(user=request.user)
            incomeItems = Income.objects.filter(user=request.user)
            fexpensesItems = FixedExpenses.objects.filter(user=request.user)
            investingItems = Investing.objects.filter(user=request.user)

            if summaryItems.first() is None:
                summaryForm.fields['monthlySavings'].widget.attrs['value'] = 0
                summaryForm.fields['monthlySavings'].widget.attrs['placeholder'] = 'enter amount'
                summaryForm.fields['essential'].widget.attrs['value'] = 0
                summaryForm.fields['essential'].widget.attrs['placeholder'] = 'enter amount'
                summaryForm.fields['leisure'].widget.attrs['value'] = 0
                summaryForm.fields['leisure'].widget.attrs['placeholder'] = 'enter amount'
                summaryForm.fields['optional'].widget.attrs['value'] = 0
                summaryForm.fields['optional'].widget.attrs['placeholder'] = 'enter amount'
                summaryForm.fields['unexpected'].widget.attrs['value'] = 0
                summaryForm.fields['unexpected'].widget.attrs['placeholder'] = 'enter amount'
                savings = 0
                essential = 0
                leisure = 0
                optional = 0
                unexpected = 0
            else:
                # print(summaryItems.first().monthlySavings)
                summaryForm.fields['monthlySavings'].widget.attrs['value'] = summaryItems.first().monthlySavings
                summaryForm.fields['essential'].widget.attrs['value'] = summaryItems.first().essential
                summaryForm.fields['leisure'].widget.attrs['value'] = summaryItems.first().leisure
                summaryForm.fields['optional'].widget.attrs['value'] = summaryItems.first().optional
                summaryForm.fields['unexpected'].widget.attrs['value'] = summaryItems.first().unexpected
                savings = Summary.objects.filter(user=request.user.id)[0].monthlySavings
                essential = Summary.objects.filter(user=request.user.id)[0].essential
                leisure = Summary.objects.filter(user=request.user.id)[0].leisure
                optional = Summary.objects.filter(user=request.user.id)[0].optional
                unexpected = Summary.objects.filter(user=request.user.id)[0].unexpected

            # Get sums
            incomeSum = incomeItems.aggregate(sum=Sum('itemAmount'))['sum'] or 0
            fixedSum = fexpensesItems.aggregate(sum=Sum('itemAmount'))['sum'] or 0
            investingSum = investingItems.aggregate(sum=Sum('itemAmount'))['sum'] or 0

            # Available Cash
            availableCash = incomeSum - fixedSum - investingSum - savings
            data = Summary.objects.filter(user=request.user.id)[0]
            data.availableCash = availableCash 
            data.save()

            # Actual Cash 
            actualCash = incomeSum - fixedSum
            data = Summary.objects.filter(user=request.user.id)[0]
            data.actualCash = actualCash
            data.save()

            
            context = {
                'summaryForm': summaryForm,
                'incomeForm': incomeForm, 
                'incomeItems': incomeItems,
                'fexpensesForm': fexpensesForm,
                'fexpensesItems': fexpensesItems,
                'incomeSum': incomeSum,
                'fixedSum': fixedSum,
                'investingSum': investingSum,
                'availableCash': availableCash,
                'actualCash' : actualCash,
                'savings': savings,
                'essential': essential,
                'leisure': leisure,
                'optional': optional,
                'unexpected': unexpected,
                # 'investingForm': investingForm,
            }
    elif request.method == 'POST' and ('deleteincome' in request.POST or 'deletefixed' in request.POST):
        if 'deleteincome' in request.POST:
            entry = Income.objects.get(id=request.POST['deleteincome'])
        elif 'deletefixed' in request.POST:
            entry = FixedExpenses.objects.get(id=request.POST['deletefixed'])
        entry.delete()
        return redirect('budget:budget')
    elif request.method == 'POST' and 'editsavings' in request.POST:
        data = Summary.objects.get(user_id=request.user.id)
        data.monthlySavings = request.POST.get('monthlySavings')
        data.save()    
        return redirect('budget:budget') 
    else: # pulling data
        # Getting forms
        summaryForm = SummaryForm(label_suffix=' ')
        incomeForm = IncomeForm(label_suffix=' ')
        fexpensesForm = FixedExpensesForm(label_suffix=' ')
        # investingForm = InvestingForm(label_suffix=' ')

        # need to filter for user info only
        summaryItems = Summary.objects.filter(user=request.user)
        incomeItems = Income.objects.filter(user=request.user)
        fexpensesItems = FixedExpenses.objects.filter(user=request.user)
        investingItems = Investing.objects.filter(user=request.user)

        if summaryItems.first() is None:
            summaryForm.fields['monthlySavings'].widget.attrs['value'] = 0
            summaryForm.fields['monthlySavings'].widget.attrs['placeholder'] = 'enter amount'
            summaryForm.fields['essential'].widget.attrs['value'] = 0
            summaryForm.fields['essential'].widget.attrs['placeholder'] = 'enter amount'
            summaryForm.fields['leisure'].widget.attrs['value'] = 0
            summaryForm.fields['leisure'].widget.attrs['placeholder'] = 'enter amount'
            summaryForm.fields['optional'].widget.attrs['value'] = 0
            summaryForm.fields['optional'].widget.attrs['placeholder'] = 'enter amount'
            summaryForm.fields['unexpected'].widget.attrs['value'] = 0
            summaryForm.fields['unexpected'].widget.attrs['placeholder'] = 'enter amount'
            savings = 0
            essential = 0
            leisure = 0
            optional = 0
            unexpected = 0
        else:
            # print(summaryItems.first().monthlySavings)
            summaryForm.fields['monthlySavings'].widget.attrs['value'] = summaryItems.first().monthlySavings
            summaryForm.fields['essential'].widget.attrs['value'] = summaryItems.first().essential
            summaryForm.fields['leisure'].widget.attrs['value'] = summaryItems.first().leisure
            summaryForm.fields['optional'].widget.attrs['value'] = summaryItems.first().optional
            summaryForm.fields['unexpected'].widget.attrs['value'] = summaryItems.first().unexpected
            savings = Summary.objects.filter(user=request.user.id)[0].monthlySavings
            essential = Summary.objects.filter(user=request.user.id)[0].essential
            leisure = Summary.objects.filter(user=request.user.id)[0].leisure
            optional = Summary.objects.filter(user=request.user.id)[0].optional
            unexpected = Summary.objects.filter(user=request.user.id)[0].unexpected

        # Get sums
        incomeSum = incomeItems.aggregate(sum=Sum('itemAmount'))['sum'] or 0
        fixedSum = fexpensesItems.aggregate(sum=Sum('itemAmount'))['sum'] or 0
        investingSum = investingItems.aggregate(sum=Sum('itemAmount'))['sum'] or 0

        # Available Cash
        availableCash = incomeSum - fixedSum - investingSum - savings
        data = Summary.objects.filter(user=request.user.id)[0]
        data.availableCash = availableCash 
        data.save()

        # Actual Cash 
        actualCash = incomeSum - fixedSum
        data = Summary.objects.filter(user=request.user.id)[0]
        data.actualCash = actualCash
        data.save()

        
        context = {
            'summaryForm': summaryForm,
            'incomeForm': incomeForm, 
            'incomeItems': incomeItems,
            'fexpensesForm': fexpensesForm,
            'fexpensesItems': fexpensesItems,
            'incomeSum': incomeSum,
            'fixedSum': fixedSum,
            'investingSum': investingSum,
            'availableCash': availableCash,
            'actualCash' : actualCash,
            'savings': savings,
            'essential': essential,
            'leisure': leisure,
            'optional': optional,
            'unexpected': unexpected,
            # 'investingForm': investingForm,
        }
    return render(request, 'budget.html', context)
