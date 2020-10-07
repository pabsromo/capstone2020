from django import template
import datetime

register = template.Library()

@register.simple_tag
def findWeek():
    today = datetime.date.today()
    monday = today - datetime.timedelta(days=today.weekday())
    daysTillSunday = (6-today.weekday()) % 7
    sunday = today + datetime.timedelta(days=daysTillSunday)

    month1 = monday.strftime("%B")
    month2 = sunday.strftime("%B")
    day1 = monday.strftime("%#d")
    day2 = sunday.strftime("%#d")

    string = month1 + " " + day1 + " - " + month2 + " " + day2
    return string


@register.simple_tag
def returnDay(dayOfWeek):
    today = datetime.date.today()
    monday = today - datetime.timedelta(days=today.weekday())
    day = monday + datetime.timedelta(dayOfWeek)
    return day.strftime("%#d")


@register.simple_tag
def returnDayDisplayed(date):
    return date.strftime("%#d")