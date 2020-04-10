from django.contrib.auth.models import User

class EmailAuthentication():
    def authenticate(self, request, username, password):
        try:
            user = User.objects.get(email = username)
            success = user.check_password(password)
            if success:
                return user
        except User.DoesNotExist:
            return None
        
        
    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
