from django import forms

from .models import Summary, Income, FixedExpenses, Investing

class SummaryForm(forms.ModelForm):
    monthlySavings = forms.DecimalField(
        # label = "Monthly Savings",
        max_digits = 7,
        decimal_places= 2,
        widget=forms.TextInput(attrs={'placeholder': 'new amount'})
    )

class IncomeForm(forms.ModelForm):
    itemName = forms.CharField(
        # label='Item Name',
        max_length=100,
        widget=forms.TextInput(attrs={'placeholder': 'new item', 'name':'income-item-name',})
    )

    itemAmount = forms.DecimalField(
        # label='Item Amount',
        max_digits=7,
        decimal_places=2,
        widget=forms.TextInput(attrs={'placeholder': 'new amount'})
    )

    itemDate = forms.DateTimeField(
        required=False,
        input_formats=['%d/%m/%Y'],
        widget=forms.DateInput(attrs={'placeholder': 'new date'}),
        )

    class Meta:
        model = Income
        fields = ('itemName', 'itemAmount')


class FixedExpensesForm(forms.ModelForm):
    itemName = forms.CharField(
        # label='Item Name',
        max_length=100,
        widget=forms.TextInput(attrs={'placeholder': 'new item'})
    )

    itemAmount = forms.DecimalField(
        # label='Item Amount',
        max_digits=7,
        decimal_places=2,
        widget=forms.TextInput(attrs={'placeholder': 'new amount'})
    )

    itemDate = forms.DateField(
        required=False,
        input_formats=['%d/%m/%Y'],
        widget=forms.DateInput(attrs={'placeholder': 'new date'}),
    ) 

    class Meta:
        model = FixedExpenses
        fields = ('itemName', 'itemAmount')

class InvestingForm(forms.ModelForm):
    itemName = forms.CharField(
        label='Item Name',
        max_length=100,
        widget=forms.TextInput(attrs={'placeholder': 'New Account'})
    )

    itemAmount = forms.DecimalField(
        label='Item Amount',
        max_digits=7,
        decimal_places=2,
        widget=forms.TextInput(attrs={'placeholder': 'New Amount'})
    )
