from django import forms 
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterForm(UserCreationForm):
    email = forms.EmailField(required=True, widget=forms.TextInput(attrs={'placeholder': 'Email'}), error_messages={'unique': 'A user with this email already exists.'})
    username = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Username'}), error_messages={'unique': 'A user with this username already exists.'})
    first_name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'First Name'}))
    last_name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Last Name'}))
    password1 = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Password'}))
    password2 = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Confirm Password'}))

    class Meta:
        model = User
        fields = ( 
            'first_name', 
            'last_name', 
            'username',
            'email', 
            'password1', 
            'password2'
        )

    def save(self, commit=True):
        user = super(RegisterForm, self).save(commit=False)
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        user.email_name = self.cleaned_data['email']
        
        if commit:
            user.save()
        return user 
