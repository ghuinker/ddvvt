from allauth.account.forms import SignupForm
from django import forms


class CustomSignupForm(SignupForm):
    field_order = ('name', 'email', 'username', 'password1', 'password2')
    name = forms.CharField(max_length=254, required=False)

    name.widget.attrs.update(autofocus='autofocus')
    name.widget.attrs.update(placeholder='First and Last Name')

    class Meta:
        fields = ('name', 'email', 'username', 'password1', 'password2')

    def custom_signup(self, request, user):
        user.name = self.cleaned_data['name']
        user.save()
        return user
