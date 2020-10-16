from django import template
import datetime
from django.utils.safestring import mark_safe

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
    print(dayOfWeek)
    dias = {
        1: 'st', 2: 'nd', 3: 'rd', 4: 'th', 5: 'th', 6: 'th', 7: 'th', 8: 'th', 9: 'th', 10: 'th',
        11: 'th', 12: 'th', 13: 'th', 14: 'th', 15: 'th', 16: 'th', 17: 'th', 18: 'th', 19: 'th', 20: 'th',
        21: 'st', 22: 'nd', 23: 'rd', 24: 'th', 25: 'th', 26: 'th', 27: 'th', 28: 'th', 29: 'th', 30: 'th',
        31: 'st', 32: 'nd',
    }
    today = datetime.date.today()
    monday = today - datetime.timedelta(days=today.weekday())
    day = monday + datetime.timedelta(dayOfWeek)
    return day.strftime("%#d")
    return mark_safe(day.strftime("%#d") + '<sup>' + dias[day.day] + '</sup>')

@register.simple_tag
def returnDayDisplayed(date):
    return date.strftime("%#d")

@register.filter
def modulo(num, val):
    return num % val

@register.filter('get_value_from_dict')
def get_value_from_dict(dict_data, key):
    """
    usage example {{ your_dict|get_value_from_dict:your_key }}
    """
    if key:
        return dict_data.get(key)