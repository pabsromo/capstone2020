from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# Create your views here.


@login_required(login_url='login:index')
def budget(request):
    # if request.method == 'POST':
    #     form = AddItemForm(request.POST, label_suffix=' ')
    #     if form.is_valid():
    #         addItem = form.save(commit=False)
    #         addItem.itemType = form.cleaned_data['itemType']
    #         addItem.user = request.user
    #         addItem.save()  # save form after the user and itemType have been determined
    #         itemName = form.cleaned_data['itemName']
    #         itemPrice = form.cleaned_data['itemPrice']
    #         return redirect('overview:home')
    #     else:
    #         context = {'form': form}
    # else:
    #     # only show objects for authenticated user
    #     items = AddItem.objects.filter(user=request.user)
    #     form = AddItemForm(label_suffix=' ')

    #     context = {'form': form, 'items': items}
    return render(request, 'budget.html')
