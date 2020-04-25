from django.db import models
from django.contrib.auth import get_user_model



class AddItem(models.Model):
    itemName = models.CharField(max_length = 100)
    itemPrice = models.DecimalField(max_digits=7, decimal_places=2)
    itemType = models.CharField(max_length = 10)
    date = models.DateTimeField(auto_now_add=True, blank=True)
    User = get_user_model()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    