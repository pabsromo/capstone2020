from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from .forms import SummaryForm, IncomeForm, FixedExpensesForm, InvestingForm
from .models import Summary, Income, FixedExpenses, Investing

# Create your views here.

@login_required(login_url='login:index')   #redirect to login if user has not been authenticated
def budget(request):
    print('this is the request:', request.POST.values)
    if request.method == 'POST' and 'delete' not in request.POST:
        incomeForm = IncomeForm(request.POST, label_suffix =' ')
        fexpensesForm = FixedExpensesForm(request.POST, label_suffix=' ')

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
        else:
            # need to filter for user info only
            incomeItems = Income.objects.filter(user=request.user)
            fexpensesItems = FixedExpenses.objects.filter(user=request.user)

            context = {
                'incomeForm': incomeForm,
                'incomeItems': incomeItems,
                'fexpensesForm': fexpensesForm,
                'fexpensesItems': fexpensesItems,
                }
    elif request.method == 'POST' and 'delete' in request.POST:
        entry = Income.objects.get(id=request.POST['delete'])
        entry.delete()
        return redirect('budget:budget')
    else: # pulling data
        # summaryForm = SummaryForm(label_suffix=' ')
        incomeForm = IncomeForm(label_suffix=' ')
        fexpensesForm = FixedExpensesForm(label_suffix=' ')
        # investingForm = InvestingForm(label_suffix=' ')

        # need to filter for user info only
        incomeItems = Income.objects.filter(user=request.user)
        fexpensesItems = FixedExpenses.objects.filter(user=request.user)
        
        context = {
            # 'summaryForm': summaryForm,
            'incomeForm': incomeForm, 
            'incomeItems': incomeItems,
            'fexpensesForm': fexpensesForm,
            'fexpensesItems': fexpensesItems,
            # 'investingForm': investingForm,
        }
    return render(request, 'budget.html', context)

# @login_required(login_url='login:index')   #redirect to login if user has not been authenticated
# def deletebudget(request):
#     print("deleting!")
#     return render(request, 'budget.html', {})

# @login_required(login_url='login:index')
# def fixed(request):
#     print(request)
#     return render(request, 'budget.html')