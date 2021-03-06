from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
class Summary(models.Model):
    monthlySavings = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    availableCash = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    essential = models.DecimalField(max_digits = 7, decimal_places=2, default=0)
    leisure = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    optional = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    unexpected = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    actualCash = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    User = get_user_model()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Income(models.Model):
    itemDate = models.DateTimeField() # equivalent to dateDisplayed from AddItem
    itemName = models.CharField(max_length = 100)
    itemAmount = models.DecimalField(max_digits=7, decimal_places=2) # equivalent to itemPrice from AddItem
    User = get_user_model()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class FixedExpenses(models.Model):
    itemDate = models.DateTimeField() # The due date for the expense
    itemName = models.CharField(max_length = 100)
    itemAmount = models.DecimalField(max_digits=7, decimal_places=2)
    User = get_user_model()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Investing(models.Model):
    itemName = models.CharField(max_length = 100)
    itemAmount = models.DecimalField(max_digits=7, decimal_places=2)
    User = get_user_model()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
