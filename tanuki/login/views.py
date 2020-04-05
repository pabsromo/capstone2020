<<<<<<< HEAD
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.models import User, auth

# Create your views here.


def index(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password1']

        user = auth.authenticate 
    
    else:
        return render(request, 'index.html')

def login(request):




def signup(request):
    if request.method == 'POST':
        firstName = request.POST['first_name']
        lastName = request.POST['last_name']
        username = request.POST['username']
        email = request.POST['email']
        password1 = request.POST['password1']
        password2 = request.POST['password2']

        if password1 == password2:
            if User.objects.filter(username = username).exists():
                messages.info(request, 'Username not available.')
                return redirect('login:signup')
            elif User.objects.filter(email = email).exists():
                messages.info(request, 'Email already registered.')
                return redirect('login:signup')
            else:
                user = User.objects.create_user(username = username, password = password1, email= email, first_name = firstName, last_name = lastName)
                user.save()
                
        else:
            messages.info(request, 'Passwords do not match.')
            return redirect('login:signup')

        return redirect('/')
    else:
        return render(request, 'signup.html')
=======
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    return render(request, 'index.html')


def signup(request):
    return render(request, 'signup.html')
>>>>>>> origin/Tanuki_Backend
