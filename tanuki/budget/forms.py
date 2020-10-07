from django import forms


class SummaryForm(forms.ModelForm)
    monthlySavings = forms.DecimalField(
        label = "Monthly Savings",
        max_digits = 7,
        decimal_places= 2,
        widget=forms.TextInput(attrs={'placeholder': 'New Amount'})
    )

class IncomeForm(forms.ModelForm)
    itemName = forms.CharField(
        label='Item Name',
        max_length=100,
        widget=forms.TextInput(attrs={'placeholder': 'New Fixed Expense'})
    )

    itemAmount = forms.DecimalField(
        label='Item Amount',
        max_digits=7,
        decimal_places=2,
        widget=forms.TextInput(attrs={'placeholder': 'New Amount'})
    )

    itemDate = forms.DateField()


class FixedExpensesForm(forms.ModelForm):
    itemName = forms.CharField(
        label='Item Name',
        max_length=100,
        widget=forms.TextInput(attrs={'placeholder': 'New Fixed Expense'})
    )

    itemAmount = forms.DecimalField(
        label='Item Amount',
        max_digits=7,
        decimal_places=2,
        widget=forms.TextInput(attrs={'placeholder': 'New Amount'})
    )

    itemDate = forms.DateField() 

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
