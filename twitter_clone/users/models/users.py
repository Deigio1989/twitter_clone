from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    avatar_url = models.URLField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    followers = models.ManyToManyField('self', related_name='followed_by', symmetrical=False, blank=True)
    following = models.ManyToManyField('self', related_name='follows', symmetrical=False, blank=True)

    def __str__(self):
        return self.user.username
