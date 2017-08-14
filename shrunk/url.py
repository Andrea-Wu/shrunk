import shrunk.models as models
from mongoengine import DoesNotExist


class Url():

    def __init__(self, short_url):
        self.short_url = short_url

        if self.exists():
            self.long_url = self.get_long_url()
            self.creator = self.get_creator()
            self.title = self.get_title()

        else:
            self.long_url = None
            self.creator = None
            self.title = None

    def exists(self):
        if models.Url.objects(short_url=self.short_url):
            return True
        else:
            return False

    def get_short_url(self):
        return self.short_url

    def get_long_url(self):
        return models.Url.objects.get(short_url=self.short_url).long_url

    def get_creator(self):
        return models.Url.objects.get(short_url=self.short_url).user

    def get_title(self):
        return models.Url.objects.get(short_url=self.short_url).title

    def set_long_url(self, long_url):
        self.long_url = long_url

    def set_creator(self, creator):
        self.creator = creator

    def set_title(self, title):
        self.title = title

    def update_db(self):
        entry = models.Url(short_url=self.short_url)
        entry.long_url = self.long_url
        entry.title = self.title
        entry.user = self.creator
        entry.save()

    def save_new_link_to_db(self):
        new_entry = models.Url(short_url=self.short_url, long_url=self.long_url,
                                title=self.title, user=self.creator)
        new_entry.save()

    def delete_from_db(self):
        entry = models.Url.objects.get(short_url=self.short_url)
        entry.delete()

    def __str__(self):
        return self.short_url

    def __repr__(self):
        return self.short_url
