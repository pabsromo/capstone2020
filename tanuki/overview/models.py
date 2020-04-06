from django.db import models

# Create your models here.

class Day(models.Model):
    name = models.CharField()
    date = models.IntegerField()


class Week(models.Model):
    user = models.CharField()
    monday = models.ManyToManyField(Day)

    budget_total = models.IntegerField()
    budget_limit = models.IntegerField()
