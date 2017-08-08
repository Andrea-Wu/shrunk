""" shrunk - Rutgers University URL Shortener

Sets up a Flask application for the main web server.
"""
import os
import sys
import json
from pprint import pprint
from time import sleep

from flask import (Flask, render_template, make_response, request, redirect, 
                   g, jsonify, abort)
from flask_login import LoginManager, login_required, current_user, login_user, logout_user
from flask_auth import Auth
from flask_restful import Resource, Api, reqparse

# Create application
global app
tmpl_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'templates')
app = Flask(__name__, template_folder=tmpl_dir)
print(app.template_folder)
api = Api(app)

app.config.from_pyfile("config.py", silent=True)
#from pprint import pprint
#pprint(app.config)

#from shrunk.linkserver import redirect_link
from shrunk.user import admin_required, elevated_required, User, get_user
from shrunk.util import set_logger, formattime, gen_qr, db_to_response_dict
from shrunk.forms import RULoginForm, UserForm
from shrunk.filters import strip_protocol, ensure_protocol
import shrunk.client as client
import shrunk.models as models
from mongoengine import connect, DoesNotExist

# Import settings in config.py
app.secret_key = app.config['SECRET_KEY']

# Initialize logging
set_logger(app)

# Initialize login manager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = '/login'

# Allows us to use the function in our templates
app.jinja_env.globals.update(formattime=formattime)

# Connect to mongo
if app.config["DB_REPL"] != "":
    connect(app.config["DB_DATABASE"], host=app.config["DB_HOST"], 
            port=app.config["DB_PORT"], replicaset=app.config["DB_REPL"])
else:
    connect(app.config["DB_DATABASE"], host=app.config["DB_HOST"], 
            port=app.config["DB_PORT"])


@login_manager.user_loader
def load_user(userid):
    """Loads user object for login.

    :Parameters:
      - `userid`: An id for the user (typically a NetID).
    """
    return User(userid)


def render_login(**kwargs):
    """Renders the login template.

    Takes a WTForm in the keyword arguments.
    """
    return render_template('login.html', **kwargs)


def login_success(user):
    """Function executed on successful login.

    Redirects the user to the homepage.

    :Parameters:
      - `user`: The user that has logged in.
    """
    # Temporarily passing in the username directly, and bypassing
    #   the database check and loading landing page directly
    #app.logger.info("{}: login".format(user.netid))
    #return redirect('/')
    
    app.logger.info("{}: login".format(user.netid))
    return render_template("index.html", netid=user.get_id(), privilege=user.get_type())


def unauthorized_admin():
    return {"message": "You do not have permission to do that."}, 403


### Views ###
#try:
#    if app.config["DUAL_SERVER"]:
#        app.add_url_rule('/<short_url>', view_func=redirect_link)
#except KeyError:
#    # No setting in the config file
#    pass

@app.route("/")
@app.route("/index")
def render_index(**kwargs):
    if not hasattr(current_user, "netid"):
        # Anonymous user
        return redirect("/login")

    # Add user if it does not exist
    try:
        user = models.User.objects.get(netid=current_user.netid)
    except DoesNotExist:
        user = models.User(netid=current_user.netid)
        user.save()

    return render_template("index.html", netid=current_user.netid)


@app.route("/login", methods=['GET', 'POST'])
def login():
    """Handles authentication."""

    #a = Auth(app.config['AUTH'], get_user)
    #return a.login(request, RULoginForm, render_login, login_success)
    if hasattr(current_user, "netid"):
        return redirect("/index")

    form = RULoginForm(request.form)

    if request.method == "GET":
        return render_template("login.html", login_error=False)

    elif request.method == "POST":
        if form.validate():
        # We are missing a way to validate user logins, but that's for later
        #   when we set up more of the infrastructure. Right now, we only
        #   check if there are fields in the usename and password
            #user = models.User.objects.get(netid=request.form['username'])
            user = User(request.form['username'])
            if user.is_authenticated() and user.is_active():
                login_user(user, remember=True)
                return login_success(user)
            else:
                return render_template("login.html", login_error=True)
        else:
            return render_template("login.html", login_error=True)

@app.route('/logout', methods=['GET'])
@login_required
def logout():
    
    if request.method == "GET":
        logout_user()
        return render_template("logout.html")


@app.route('/shorten', methods=['GET', 'POST'])
@login_required
def shorten():

    user = User(current_user.netid)

    if request.method == "GET":
        return render_template("shorten.html", elevated_user=user.is_elevated())

    elif request.method == "POST":
        title = request.form['title']
        long_url = request.form['url']
        alias = None

        # If the user is privileged, then we let the user specify an alias
        #   but that is for later
        if current_user.is_elevated():
            alias = request.form['alias']

        # If the user specified an alias, check if the alas has been taken.
        # If it is taken, the user needs to specify another alias. Otherwise,
        #   the alias is the shortened url key
        if alias:
            if models.Url.objects(short_url=alias):
                return render_template("shorten.html", elevated_user=user.is_elevated(), \
                                                       alias_taken=True)
            else:
                short_url_key = alias

        # If the user is not an elevated user, or chooses not to specify an alias,
        #   we create a shortened url
        else:
            # Make sure that a shortened url is unique
            short_url_key = client.generate_unique_key()
            while models.Url.objects(short_url=short_url_key):
                short_url_key = client.generate_unique_key()
            
        # Adding the the short url (specifically the randomly generated
        #   part) to the database to store it for future use.
        # To add it, we need to provide the necessary entries. To get the
        #   the current user, we use flask_login.current_user.
        user_netid = user.netid
        short_url_entry = models.Url(short_url=short_url_key, title=title, \
                                     user=user_netid, long_url=long_url)
        short_url_entry.save()

        # This short hostname/port needs to abstracted away
        short_url = "http://maguro.rutgers.edu:5000/" + short_url_key

        return render_template("shorten.html", elevated_user=user.is_elevated(),
                                               shortened_url=short_url)
        

@app.route('/edit_url', methods=['GET', 'POST'])
@login_required
def edit_link():

    user = User(current_user.netid)
    user_is_elevated = user.is_elevated() 

    alias = None

    # If the link does not specify the short url of the entry, then we can't do much
    short_url = request.args.get('short_url')
    if not short_url:
        return render_template('link-404.html')
    
    # Checks if the link is in the database. If the user is an admin, we report the
    #   problem. Otherwise, link to a 404. Don't want those plebs (users) prod our
    #   system for information
    try:
        url = models.Url.objects.get(short_url=short_url)
    except DoesNotExist:
        if user.is_admin():
            return render_template('edit_url.html', 
                                    message="Link not found in the database", 
                                    alias=user_is_elevated)
        else:
            return render_template('link-404.html')

    # If the user is neither an admin nor the creator of the link, tell them to
    #   get out
    if user.netid != url.user.netid and not user.is_admin():
        return render_template('link-404.html')

    # If we made it this far, we have guaranteed that the user specified a link
    #   to check, that the link exists, and that the user has the permissions
    #   to edit the link

    if request.method == 'GET':
        # Users with at least elevated privileges can specify an alias.
        # Normies (standard users) don't get to change the alias
        if user_is_elevated:
            alias = url.short_url
        return render_template('edit_url.html', title=url.title, \
                               url=url.long_url, alias=alias)

    elif request.method == 'POST':

        # Get the short url 
        old_title, old_url = url.title, url.long_url
        new_title, new_url = request.form['title'], request.form['url']

        if user_is_elevated:
            old_alias, new_alias = url.short_url, request.form['alias']
        else:
            old_alias, new_alias = url.short_url, url.short_url
        
        # Don't make changes if nothing changed
        if old_title == new_title and old_url == new_url and old_alias == new_alias:
            return render_template('edit_url.html', message="No changes made", alias=user_is_elevated)
        else:
            # Changing the alias (which in this case is the short url) means deleting the existing
            #   the Url document and creating a new one because the short url is the primary key
            if old_alias != new_alias:
                if models.Url.objects(short_url=new_alias):
                    return render_template('edit_url.html', message='Alias is already taken',
                                    title=url.title, url=url.long_url, alias=user_is_elevated)

                new_url = models.Url(short_url=new_alias, long_url=new_url, user=current_user.netid, 
                                     title=new_title)
                new_url.save()
                url.delete()

            # Do some updates
            else:
                url.title = new_title
                url.long_url = new_url
                url.save()

            # Render the changes
            return render_template('edit_url.html', message="Changes Made", alias=user_is_elevated)
        

@app.route("/block_url", methods=['GET', 'POST'])
@login_required
def block_link():

    user = User(current_user.netid)
    if not user.is_admin():
        return render_template("link-404.html")

    if request.method == 'GET':
        return render_template("block_url.html", message=None)        

    elif request.method == 'POST':
        return render_template("block_url.html", message="So you wanna block a link?")


@app.route("/blacklist", methods=['GET', 'POST'])
@login_required
def change_blacklist_status():

    """
    This function change the blacklist status of the user.
    Currently, this route will handle both blacklisting and un-blacklisting of users
    We need to plan a bit more about what data (users to list [blacklisted and not
        blacklisted]). It might be cool if our webpage supports searching and autofill
        capabilities.
    """
    user = User(current_user.netid)
    if not user.is_admin():
        return render_template("link-404.html")

    if request.method == 'GET':
        blacklisted_users = models.User.objects(is_blacklisted=True)
        return render_template("blacklist.html", message=None, blacklisted_users=blacklisted_users)

    elif request.method == 'POST':
        app.logger.info("bingbong")
        #app.logger.info(models.User.objects(is_blacklisted=True))
        blacklisted_users = models.User.objects(is_blacklisted=True)
        #app.logger.info(blacklisted_users)

        app.logger.info(request.form['user'])
        user_to_blacklist = User(request.form['user'])
        
        if not user_to_blacklist.exists():
            return render_template("blacklist.html", message="User does not exist", blacklisted_users=blacklisted_users)

        app.logger.info("bingbong")
        user_to_blacklist.change_blacklist_status(False)
        return render_template("blacklist.html", message="Change Performed", blacklisted_users=blacklisted_users)


@app.route("/<short_url>", methods=['GET'])
def redirect_link(short_url):
    """Redirects to the short URL's true destination.

    This looks up the short URL's destination in the database and performs a
    redirect, logging some information at the same time. If no such link exists,
    a not found page is shown.

    :Parameters:
      - `short_url`: A string containing a shrunk-ified URL.
    """
    app.logger.info("{} requests {}".format(request.remote_addr, short_url))

    # Perform a lookup and redirect
    try:
        url = models.Url.objects.get(short_url=short_url)
    except DoesNotExist:
        return render_template("link-404.html", short_url=short_url)

    #visit(url, request.remote_addr)

    # Check if a protocol exists
    if "://" in url.long_url:
        return redirect(url.long_url)
    else:
        return redirect("http://{}".format(url.long_url))


class BannedDomainsListAPI(Resource):
    decorators = [login_required, admin_required(unauthorized_admin)]

    def get(self):
        blocked_links = models.BlockedDomain.objects 
        return db_to_response_dict(blocked_links), 200


class BannedDomainsAPI(Resource):
    decorators = [login_required, admin_required(unauthorized_admin)]

    def put(self, url):
        try:
            block = models.BlockedDomain.objects.get(url=url)
        except DoesNotExist:
            user = models.User.objects.get(netid=current_user.netid)
            block = models.BlockedDomain(url=url, added_by=user)
            block.save()
        return {'data': {}}, 200

    def delete(self, url):
        try:
            block = models.BlockedDomain.objects.get(url=url)
            block.delete()
        except DoesNotExist:
            return {}, 404


class UsersListAPI(Resource):
    decorators = [login_required, admin_required(unauthorized_admin)]

    def get(self):
        return db_to_response_dict(models.User.objects), 200


class UsersAPI(Resource):
    decorators = [login_required, admin_required(unauthorized_admin)]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('type', type=int, required=False,
                                   choices=(0, 10, 20), location="json",
                                   help="Error: {error_msg}")
        self.reqparse.add_argument('is_blacklisted', type=bool, required=False,
                                   help="Error: {error_msg}", location="json")
        super(UsersAPI, self).__init__()

    def put(self, netid):
        args = self.reqparse.parse_args()
        user = models.User.objects.get(netid=netid)

        if args['type'] is not None:
            user.type = int(args['type'])  # TODO: error checking for type val

        if args['is_blacklisted'] is not None:
            user.is_blacklisted = bool(args['is_blacklisted'])

        user.save()
        return {'data': {}}, 200


class UserUrlsAPI(Resource):
    decorators = [login_required]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('title', type=str, required=True,
                                   location="json", help="Error: {error_msg}")
        self.reqparse.add_argument('long_url', type=str, required=True,
                                   help="Error: {error_msg}", location="json")
        self.reqparse.add_argument('alias', type=str, required=False,
                                   location="json")
        super(UserUrlsAPI, self).__init__()

    def get(self, netid):
        """ For GET there are no arguments, so we do not call parse_args()
        and therefore the Required args will not have to be supplied """
        user = models.User.objects.get(netid=netid)
        urls = models.Url.objects(user=user)
 
        # Generate QR codes
        for url in urls:
            url.qr_code = "data:image/png;base64," + gen_qr(app, url.user)

        return db_to_response_dict(urls), 200

    def post(self, netid):
        args = self.reqparse.parse_args()

        dbuser = models.User.objects.get(netid=netid)
        flaskuser = User(netid)

        long_url = args['long_url']
        title = args['title']
        alias = args['alias']

        if client.is_blocked(long_url):
            return {"message": {"url": "Banned url"}}, 403  # 403 FORBIDDEN

        if alias is not None:
            if flaskuser.is_elevated():
                # TODO: error checking and validation
                url = models.Url(long_url=long_url, user=dbuser, title=title, 
                                 short_url=alias)
                url.save()
                return {"data": {}}, 200
            else:
                return {"message": {"alias": "You do not have permission to use aliases."}}, 403  # 403 FORBIDDEN
        else:
            # TODO: error checking and validation
            url = models.Url(long_url=long_url, user=dbuser, title=title,
                             short_url=client.generate_unique_key())
            url.save()
            return {"data": {}}, 200


class UrlsListAPI(Resource):
    decorators = [login_required, admin_required(unauthorized_admin)]

    def get(self):
        urls = models.Url.objects

        # Generate QR codes
        for url in urls:
            url.qr_code = "data:image/png;base64," + gen_qr(app, url.user)

        return db_to_response_dict(urls), 200


class UrlsAPI(Resource):
    decorators = [login_required]

    def delete(self, id):
        try:
            link = models.Url.objects.get(short_url=id)
            user = models.User.objects.get(netid=current_user.netid)
            if user.netid != link.user.netid or not current_user.is_admin():
                return {}, 403  # 403 FORBIDDEN
            link.delete()
            return {}, 200
        except DoesNotExist:
            return {}, 404


class UrlStatsAPI(Resource):
    def get(self, id):
        abort(501)  # not yet implemented


api.add_resource(BannedDomainsListAPI,  '/api/banned_domains')
api.add_resource(BannedDomainsAPI,      '/api/banned_domains/<string:url>')
api.add_resource(UsersListAPI,          '/api/users')
api.add_resource(UsersAPI,              '/api/users/<string:netid>')
api.add_resource(UserUrlsAPI,           '/api/users/<string:netid>/urls')
api.add_resource(UrlsListAPI,           '/api/urls')
api.add_resource(UrlsAPI,               '/api/urls/<string:id>')
api.add_resource(UrlStatsAPI,           '/api/urls/<string:id>/stats')
