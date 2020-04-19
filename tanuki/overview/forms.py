from django import forms

class AddItemForm(forms.Form):
    itemName = forms.CharField()