from flask import Flask
from flask import *
import uuid
from datetime import timedelta
from api.modules.database import create_record, fetch_id, get_ip, check_and_create, get_time, get_time_now

app = Flask(__name__)

app.config["TEMPLATES_AUTO_RELOAD"] = True
app.secret_key = "asnfodnongrwojnsdjofnjosdsdnfjonjdnfonjosnfondcii236164136984632748"
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=5)  # Session timeout of 5 minutes
app.config["SESSION_TYPE"] = "filesystem"

@app.route('/')
def home():
    try:
        if not session.get('userid'):
            userID = uuid.uuid4()
            global str_uuid
            str_uuid = str(userID)
            session['userid'] = userID
            check_and_create()
            create_record(str_uuid)
            ip = get_ip()
            return render_template('home.html', pre='not_in_session', ip=ip, userID=fetch_id(ip), time=get_time_now())
        else:
            ip = get_ip()
            print(f"in session: {fetch_id(ip)}")
            return render_template('home.html', userID=fetch_id(ip), ip=ip, time=get_time(ip))
    except:
        return redirect('/error')

@app.route('/error')
def error():
    return jsonify('error')

@app.route('/state')
def nextpage():
    ip = get_ip()
    return render_template("state.html", sessions=fetch_id(ip), ip=ip, data=get_time(ip))

if __name__ == '__main__': 
    app.run()
