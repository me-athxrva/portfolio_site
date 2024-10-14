from flask import Flask
from flask import *
import uuid
from datetime import timedelta
from api.modules.database import create_record, fetch_id, get_ip, check_and_create, get_time, get_time_now

app = Flask(__name__)

app.config["TEMPLATES_AUTO_RELOAD"] = True
app.secret_key = "asnfodnongrwojnsdjofnjosdsdnfjonjdnfonjosnfondcii236164136984632748"
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(seconds=10)  # Session timeout of 5 minutes
app.config["SESSION_TYPE"] = "filesystem"

def session_source(id=None):
    if id==None:
        return '?notinsession'
    else:
        return f'?{id}' 

@app.route('/')
def home():
    if not session.get('userid'):
        userID = uuid.uuid4()
        global str_uuid
        str_uuid = str(userID)
        session['userid'] = userID
        check_and_create()
        create_record(str_uuid)
        ip = get_ip()
        return render_template('home.html', pre='not_in_session', ip=ip, userID=fetch_id(ip), time=get_time_now(), session=session_source(str_uuid))
    else:
        ip = get_ip()
        print(f"in session: {fetch_id(ip)}")
        return render_template('home.html', userID=fetch_id(ip), ip=ip, time=get_time(ip), session=session_source(fetch_id(ip)))

@app.route('/error')
def error():
    return jsonify('error')

@app.route('/linkedin')
def linkedin():
    return redirect('https://linkedin.com/in/atharvadeore')

@app.route('/state')
def nextpage():
    ip = get_ip()
    return render_template("state.html", UserID=fetch_id(ip), ip=ip, data=get_time(ip), session=session_source(str_uuid))

if __name__ == '__main__': 
    app.run()
