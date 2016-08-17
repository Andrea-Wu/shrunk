# shrunk - Rutgers University URL Shortener

"""Flask application for the link server."""

from flask import Flask, render_template, request, redirect, g
import shrunk.client
import shrunk.util


# Create application
app = Flask(__name__)

# Import settings in config.py
app.config.from_pyfile("config.py", silent=True)
app.secret_key = app.config['SECRET_KEY']

# Initialize logging
shrunk.util.set_logger(app)


### Views ###
@app.route("/<short_url>")
def redirect_link(short_url):
    """Redirects to the short URL's true destination.

    This looks up the short URL's destination in the database and performs a
    redirect, logging some information at the same time. If no such link exists,
    a not found page is shown.

    :Parameters:
      - `short_url`: A string containing a shrunk-ified URL.
    """
    client = shrunk.util.get_db_client(app, g)
    if client is None:
        return redirect("/error.html")

    app.logger.info("{} requests {}".format(request.remote_addr, short_url))

    long_url = client.get_long_url(short_url)

    if long_url is None:
        return render_template("link-404.html", short_url=short_url)

    # Log statistics about the request
    stats = shrunk.util.parse_stats(request.user_agent.string)    
    client.visit(short_url = short_url, 
                 source_ip = request.remote_addr,
                 device = stats['device'],
                 browser = stats['browser'],
                 referrer = shrunk.util.get_domain(request.referrer))

    # Check if a protocol exists
    if "://" in long_url:
        return redirect(long_url)
    else:
        return redirect("http://{}".format(long_url))


@app.route("/")
def render_index():
    """Renders the homepage.

    The link server will redirect to the URL for the public URL manager.
    """
    app.logger.info("Redirecting {} to shrunk".format(request.remote_addr))
    return redirect(app.config["SHRUNK_URL"])
