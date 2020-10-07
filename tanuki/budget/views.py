from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from .forms import SummaryForm, IncomeForm, FixedExpensesForm, InvestingForm
from .models import Summary, Income, FixedExpenses, Investing

# Create your views here.

@login_required(login_url='login:index')   #redirect to login if user has not been authenticated
def budget(request): 
    if request.method == 'POST':
        incomeForm = IncomeForm(request.POST, label_suffix =' ')
        if incomeForm.is_valid():
            income = incomeForm.save(commit=False)
            income.user = request.user
            income.save()    #save form after the user and itemType have been determined
            itemName = incomeForm.cleaned_data['itemName']
            itemAmount = incomeForm.cleaned_data['itemAmount']
            return redirect('budget:budget')
        else:
            context = {'form': incomeForm}
    else: # pulling data
        # summaryForm = SummaryForm(label_suffix=' ')
        incomeForm = IncomeForm(label_suffix=' ')
        # fixedexpensesForm = FixedExpensesForm(label_suffix=' ')
        # investingForm = InvestingForm(label_suffix=' ')

        incomeItems = Income.objects.filter(user=request.user)
        # need to filter for user info only

        context = {
            # 'summaryForm': summaryForm,
            'incomeForm': incomeForm, 
            'incomeItems': incomeItems,
            # 'fixedexpensesForm': fixedexpensesForm,
            # 'investingForm': investingForm,
        }
    return render(request, 'budget.html', context)