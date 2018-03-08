import shrunk.models as models
from mongoengine import DoesNotExist


class Blocked_Domain():

    def __init__(self, domain_name):
        self.domain_name = domain_name

        if self.is_blocked():
            self.blocking_user = models.BlockedDomain(url=self.domain_name).added_by
        else:
            self.blocking_user = None

    def is_blocked(self):
        if models.BlockedDomain.objects(url=self.domain_name):
            return True
        else:
            return False

    def get_domain(self):
        return self.domain_name

    def get_blocking_user(self):
        return self.blocking_user

    def set_domain(self, url):
        self.domain_name = url

    def set_blocking_user(self, username):
        self.blocking_user = username

    def block_url(self):
        if not self.is_blocked():
            new_entry = models.BlockedDomain(url=self.domain_name, added_by=self.blocking_user)
            new_entry.save()

    def unblock_url(self):
        if self.is_blocked():
            entry = models.BlockedDomain.objects(url=self.domain_name)
            entry.delete()
