from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.models import auth
from django.contrib.auth.decorators import login_required
from login.forms import RegisterForm


def index(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = auth.authenticate(username = username, password=password)  #authenticates using default then custom backend
        if user is not None:
            auth.login(request, user)
            return redirect('overview:home')    
        else:
            messages.info(request, 'Invalid credentials, please try again.')
            return redirect('/')   
    else:
        return render(request, 'index.html')



def signup(request):
    context = {}
    if request.method == 'POST':
        form = RegisterForm(request.POST)    #render form
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = auth.authenticate(username = username, password = password)
            auth.login(request, user)    #log user in automatically after registration
            return redirect('overview:home')  
        else: 
            context['registerForm'] = form
    else:
        form = RegisterForm()
        context['registerForm'] = form
    return render(request, 'signup.html', context)



@login_required(login_url='login:index')
def logout(request):
    auth.logout(request)
    return redirect('login:index') 


