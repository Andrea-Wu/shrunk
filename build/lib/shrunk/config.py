""" shrunk - Rutgers University URL Shortener

Configuration options for shrunk. This is an example file; modify this and save
it as config.py.
"""

# The mongo replica set
#DB_REPL = "mongodb://host1:27017,host2:27017,host3:27017/?replicaSet=foo"
DB_REPL = ""

# The host machine for the database
DB_HOST = "localhost"

# The database's port on the host machine
DB_PORT = 27017

# The name of the database on the db server
DB_DATABASE = "shrunk"

# A secret key for Flask sessions
SECRET_KEY = "something_secret"

# The public URL for shrunk
SHRUNK_URL = "http://shrunk.yourdomain.com"

# The public URL for the link server
LINKSERVER_URL = "http://shru.nk"

# Determines whether or not the web application doubles as the link server.
# The default setting is False, which assumes that a separate server handles
# the links.
DUAL_SERVER = False

# List of IP addresses owned by Rutgers University
RUTGERS_IP_LIST = ["127.0.0.1"]

# Authentication options for login. Only LDAP is fully supported
AUTH = {
    "methods": ["ldap"],
    "ldap": {
        "host": "ldap.yourdomain.com",
        "port": 123,
        "uid": "",
        "encryption": "",
        "base_dn": "",
        "bind_dn": "",
        "bind_pass": ""
    }
}

# The format of log messages
LOG_FORMAT = "%(levelname)s %(asctime)s: %(message)s [in %(pathname)s:%(lineno)d]"

# The name of the log file
LOG_FILENAME = "var/www/shrunk/shrunk.log"

# Maximum number of links to display per page
MAX_DISPLAY_LINKS = 50

# Path to the GeoIP database file, which can be downloaded from
# http://dev.maxmind.com/geoip/geoip2/geolite2/
GEOIP_DB_PATH = "/path/to/database/GeoLite2-City.mmdb"

#mongodb auth
USERNAME = "shrunk"
PASSWORD = "shrunk"
