from django.db import models

# Create your models here.
class Summary(models.Model):
    monthlySavings = models.DecimalField(max_digits=7, decimal_places=2)
    availableCash = models.DecimalField(max_digits=7, decimal_places=2)

class Income(models.Model):
    itemDate = models.DateTimeField(auto_now_add=False, blank=True) # equivalent to dateDisplayed from AddItem
    itemName = models.CharField(max_length = 100)
    itemAmount = models.DecimalField(max_digits=7, decimal_places=2) # equivalent to itemPrice from AddItem

class FixedExpenses(models.Model):
    itemDate = models.DateTimeField(auto_now_add=False, blank=True) # The due date for the expense
    itemName = models.CharField(max_length = 100)
    itemAmount = models.DecimalField(max_digits=7, decimal_places=2)

class Investing(models.Model):
    itemName = models.CharField(max_length = 100)
    itemAmount = models.DecimalField(max_digits=7, decimal_places=2)