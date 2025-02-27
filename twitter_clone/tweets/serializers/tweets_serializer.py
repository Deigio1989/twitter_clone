from rest_framework import serializers
from tweets.models import Tweet

class TweetSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = Tweet
        fields = ['id', 'username', 'avatar_url', 'content', 'created_at']

    def get_avatar_url(self, obj):
        # Gerar uma URL de avatar aleatória usando o RoboHash
        return f'https://robohash.org/{obj.user.username}.png'
