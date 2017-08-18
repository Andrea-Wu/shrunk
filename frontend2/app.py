from flask import Flask, render_template

app = Flask(__name__, template_folder="views", static_folder="statics")

sample_data = [
    {
        'short_url': "19deid",
        'long_url': "asiodfjasdfikjao90wiefjaslodfs.com"
    },
    {
        'short_url': "io90ko",
        'long_url': "aisd0ofjawkrw0ofjaslkfjwa90f,2309sdzx89va0sf.com"
    },
    {
        'short_url': "348eso",
        'long_url': "90kljdf890asefjasdklfsdaf,qw3fp0asfjaseifosdj0ofij.com"
    },
    {
        'short_url': "92lslp",
        'long_url': "i89awofnkawlfsjdfo90iasdjfasdl;kfjsd.com"
    },
    {
        'short_url': "xzcvim",
        'long_url': "9awiofjsdklfasdjf90awesiofjlskdfjsadfsfs.com"
    },
    {
        'short_url': "",
        'long_url': ""
    }
]

@app.route('/')
@app.route('/index')
@app.route('/index.html')
def root():
    return render_template('admin_dashboard.html')

app.run(debug=True, port=3000)
