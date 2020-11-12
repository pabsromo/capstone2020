from django.shortcuts import render
from django import template
register = template.Library()
from django.contrib.auth.decorators import login_required
import json
from django.core.serializers.json import DjangoJSONEncoder
from django.forms.models import model_to_dict

from overview.models import AddItem
from overview.forms import AddItemForm

# Create your views here.

@login_required(login_url='login:index')
def history(request):
    if request.method == 'POST':
        form = AddItemForm(request.POST, label_suffix=' ')
        if form.is_valid():
            addItem = form.save(commit=False)
            addItem.itemType = form.cleaned_data['itemType']
            addItem.user = request.user
            addItem.save()  # save form after the user and itemType have been determined
            itemName = form.cleaned_data['itemName']
            itemPrice = form.cleaned_data['itemPrice']
            return redirect('overview:home')
        else:
            context = {'form': form}
    else:
        # only show objects for authenticated user
        items = AddItem.objects.filter(user=request.user)
        form = AddItemForm(label_suffix=' ')
        temp = []

        print(items[0].itemName)

        for item in items:
            t = []
            t.append(int(str(item.user.id)))
            t.append(str(item.user))
            t.append(item.itemName)
            t.append(float(item.itemPrice))
            t.append(item.itemType)
            # t.append(item.dateAdded)
            t.append(item.dateDisplayed.strftime('%m/%d/%Y'))
            temp.append(t)

        print(temp)

        # items_json = json.dumps(temp, cls=DjangoJSONEncoder)
        items_json = json.dumps(temp)

        context = {
            'form': form, 
            'items': items,
            'items_json': items_json,
        }
    return render(request, 'history.html', context)