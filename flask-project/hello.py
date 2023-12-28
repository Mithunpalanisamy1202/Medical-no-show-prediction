import random
from flask import Flask , request ,jsonify
import pandas as pd
from pandas import ExcelWriter
from  flask_cors import CORS
import openpyxl
import datetime
import calendar
import pickle
from sklearn.preprocessing import LabelEncoder
import numpy as np
import shap
import joblib
import lime
from lime.lime_tabular import LimeTabularExplainer
app = Flask(__name__)
CORS(app)

new = None
ex=None
show=None
status=None
# df=pd.read_excel(r'C:\Users\mithu\OneDrive\Desktop\react\flask-project\users.xlsx')

def check_credentials(username,password):
    # df=pd.read_excel('user_details.xlsx')
    df=pd.read_excel(r'C:\Users\mithu\OneDrive\Desktop\react\flask-project\users.xlsx')
    df_data = dict(df.values)
    print('login',df)
    print(df_data.items())
    for i,j in df_data.items():
       
        if i == username and j == password :
            return True
        else:
            pass
          
    


@app.route('/login' , methods=['POST'])

def hello():
    data=request.json
    print('data',data)
    username=data["username"]
    password=data["password"]

    print("username:",username)
    print('password:',password)

    if check_credentials(username,password):
        return jsonify("Login Successful")
    else:
        return jsonify("Login Failed")


def check_username(df,username):
    for i in df['Username']:
        print('check',i)
        if i == username:
            return True
        else:
            pass

@app.route('/signup', methods=['POST'])

def signup():
    try:
        data = request.json
        print('data',data)
        username = data["username"]
        password = data["password"]
        
        print(username)
        print(password)

        df=pd.read_excel(r'C:\Users\mithu\OneDrive\Desktop\react\flask-project\users.xlsx')
        print('beforesignup',df)
        if check_username(df,username):
            return jsonify({"message":"Username already exists"})
        
        new_user ={'Username':username,'Password':password}
        print(new_user)
        df_temp = pd.DataFrame([new_user])
        # print(df_temp)
        writer = ExcelWriter(r'C:\Users\mithu\OneDrive\Desktop\react\flask-project\users.xlsx',engine='openpyxl',mode='a',if_sheet_exists='overlay')
        df_temp.to_excel(writer, index=False, startrow=len(df)+1)  

        print('aftersignup',df_temp)
        writer.close()
        return jsonify({"message":"Registration successful"})
    except Exception as e:
        print(str(e))
        return jsonify(f"An error occurred: {str(e)}"), 500



def current_day_view(day):
    current_day = datetime.datetime.now().strftime('%A')
    return current_day    
def crt(Appointment_Day):
    current_day1 = datetime.datetime.strptime(Appointment_Day, '%Y-%m-%d').weekday()
    return (calendar.day_name[current_day1])

def preprocess_input(input_data):
    gender_encoder = LabelEncoder()
    input_data['Gender'] = gender_encoder.fit_transform(input_data['Gender'])
    # input_data['Gender']=input_data['Gender'].astype(int)
    day_mapping = {
        'Monday': 3,
        'Tuesday': 4,
        'Wednesday': 5,
        'Thursday': 6,
        'Friday': 0,
        'Saturday':1,
        'Sunday': 2
    }
    input_data['Scheduled_Day'] = input_data['Scheduled_Day'].map(day_mapping)
    input_data['Appointment_Day'] = input_data['Appointment_Day'].map(day_mapping)

    loc_mapping = {
        'Noida': 3,
        'Bengaluru':0,
        'Chennai': 1,
        'Pune': 4,
        'Coimbatore':2,

    }
    input_data['Clinic_Location'] = input_data['Clinic_Location'].map(loc_mapping)
    print(input_data)
    return input_data


def predictdata(new):
    global show
    global status
    input_columns = ['Gender', 'Age', 'Hypertension', 'Diabetes', 'alcoholism', 'Handicap','Scheduled_Day', 'Appointment_Day','Clinic_Location']
    input_data = pd.DataFrame(new, columns=input_columns)
    print(input_data)
    preprocessed_data = preprocess_input(input_data)
    # loaded_pickle_model = pickle.load(open(r'C:\\Users\\mithu\\OneDrive\\Desktop\\rf_model.pkl','rb'))
    loaded_pickle_model = pickle.load(open(r'C:\\Users\\mithu\\OneDrive\\Desktop\\react\\flask-project\\rf_model.pkl','rb'))
    pickle_y_preds = loaded_pickle_model.predict(preprocessed_data)
    pickle_y_preds

    if pickle_y_preds == 0:
        available_slots = [
             "9:00 AM to 10:00 AM",
             "10:00 AM to 11:00 AM",
             "2:00 PM to 3:00 PM",
             "3:00 PM to 4:00 PM",
             "4:00 PM to 5:00 PM",
            "5:00 PM to 6:00 PM",
            "7:00 PM to 8:00 PM"]
        selected_slots = random.sample(available_slots, 3)
        result=selected_slots
        show='will show'
        status='presence'
        print('show')
        return result
    else:
#         available_slots = [
#         "9:00 AM to 10:00 AM",
#         "10:00 AM to 11:00 AM",
#         "2:00 PM to 3:00 PM",
#         "3:00 PM to 4:00 PM",
#         "4:00 PM to 5:00 PM",
#         "5:00 PM to 6:00 PM",
#         "7:00 PM to 8:00 PM"
# ]
#         selected_slots = random.sample(available_slots, 3)
        result = 1
        show='will not show'
        status='absence'
        print('noshow')
        return result

def func(value):
    if value == 1:
        return 'yes'
    else:
        return 'no'
    
def fun(value):
    if value == 'M':
        return 'Male'
    else:
        return 'Female'

@app.route('/form',methods=['POST'])
def form():
    global new
    global ex
    data=request.json
    gender=data["Gender"]
    gender1=fun(data["Gender"])
    age=data["Age"]
    hypertension=data["Hypertension"]
    hypertension1=func(data["Hypertension"])
    diabetes=data["Diabetes"]
    diabetes1=func(data["Diabetes"])
    alcoholism=data["Alcoholism"]
    alcoholism1=func(data["Alcoholism"])
    handicap=data["Handicap"]
    handicap1=func(data["Handicap"])
    day=data['AppoinmentDate']
    appoinmentDay=crt(day)
    scheduledDay=current_day_view(day)
    cliniclocation=data["Cliniclocation"]
    new=[[gender,age,hypertension,diabetes,alcoholism,handicap,scheduledDay,appoinmentDay,cliniclocation]]
    ex=[gender1,age,hypertension1,diabetes1,alcoholism1,handicap1,appoinmentDay,cliniclocation]
    print(ex)
    print(gender,age,hypertension,diabetes,alcoholism,handicap,day,appoinmentDay,scheduledDay,cliniclocation)
    
    result=predictdata(new)
    print(result)
    return jsonify({"message":result})


def preprocess_input1(input_data):
    gender_mapping = {
        'M': 1,
        'F': 0
    }
    input_data[0] = gender_mapping.get(input_data[0], -1)

    input_data[1] = int(input_data[1])  # Convert age to integer

    day_mapping = {
        'Monday': 3,
        'Tuesday': 4,
        'Wednesday': 5,
        'Thursday': 6,
        'Friday': 0,
        'Saturday': 1,
        'Sunday': 2
    }
    input_data[6] = day_mapping.get(input_data[6], -1) 
    input_data[7] = day_mapping.get(input_data[7], -1)

    loc_mapping = {
        'Noida': 3,
        'Bengaluru': 0,
        'Chennai': 1,
        'Pune': 4,
        'Coimbatore': 2,
    }
    input_data[8] = loc_mapping.get(input_data[8], -1) 

    return input_data


def index1(l1):
    categories = ['Gender', 'Age', 'Hypertension', 'Diabetes', 'Alcoholism', 'Handicap', 'Scheduleday', 'Appoinmentday', 'Cliniclocation']
    l2=[]
    
    for i in range(0,len(l1)):
        for j in range(0,len(categories)):
            if l1[i]==j:
                l2.append(categories[j])
            else:
                pass
    return l2

def large(l3):
  l3.sort(reverse=True)
  return l3[ :3]
def index(value):
    l1=[]
    l3=[]
    for i in range(0,len(value)):
        if value[i] > 0:
            l3.append(value[i])
        else:
          pass
    lst3=large(l3)

    for i in range(0,len(lst3)):
      for j in range(0,len(value)):
        if lst3[i] == value[j]:
          l1.append(j)

    l2=index1(l1)
    return l2,lst3

@app.route('/chart',methods=['GET'])
def chart():
    global new
    global ex
    global show
    global status
    model = joblib.load('C:\\Users\\mithu\\OneDrive\\Desktop\\rf_model.pkl')
   
    new_data=preprocess_input1(new[0])
    sample_data = np.array(new_data)
    
    explainer = shap.TreeExplainer(model)
    shap_values = explainer.shap_values(sample_data)
    print(shap_values)
    shap_categories = ['Gender', 'Age', 'Hypertension', 'Diabetes', 'Alcoholism', 'Handicap', 'Scheduleday', 'Appoinmentday', 'Cliniclocation']
    shap_values_list = [shap_value.tolist() for shap_value in shap_values]
    shap_value_list=  shap_values_list
    if show == 'will show':
        names1=index(shap_value_list[0])
        print(names1)
    else:
        names1=index(shap_value_list[1])
        print(names1)
    names,value=names1
    print(show)
    shap_data = {
        'categories': shap_categories,
        'values': shap_values_list,
        'explanation' : f'''The Appointment details with the values<br/>
                               &#11090<b>{names[0]}</b> : {value[0]},<br/>
                               &#11090<b>{names[1]}</b> : {value[1]},<br/>
                               &#11090<b>{names[2]}</b> : {value[2]}<br/>
                                was <b>highly influencing</b> the patient's <b>{status}</b> and our model has predicted that the patient <b style="color:red;">{show}</b> for an appointment'''
    }
    print(shap_data)
    # lime_explainer = lime.lime_tabular.LimeTabularExplainer(sample_data, shap_categories,mode="classification")
    # explanation = lime_explainer.explain_instance(sample_data, model.predict_probha)
    # lime_data = {
    #     "as_list": explanation.as_list(),
    #     "predicted_value": explanation.predicted_value,
    # }
    # print(lime_data)
    # result = {
    #     "shap_data": shap_data,
    #     "lime_data": lime_data,
    # }
    
    return jsonify(shap_data)


if __name__ == '__main__':
    app.run(debug=True)
   