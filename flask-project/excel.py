import pandas as pd
import numpy as np

df=pd.read_excel(r'flask-project\user_details.xlsx')


print(df['Username'])
# for i in df['Username']:
#     print(i)



# @app.route('/signup', methods=['POST'])

# def signup():
#     try:
#         data = request.json
#         print('data',data)
#         username = data["username"]
#         password = data["password"]
        
#         print(username)
#         print(password)
#         df=pd.read_excel(r'flask-project\user_details.xlsx')

#         if username in df['Username'].values:
#             return jsonify({"message":"Username already exists. Please choose a different one."})

#         new_user = {'Username': username, 'Password': password}
#         df_temp = pd.DataFrame([new_user])
       
#         df = df.append(df_temp, ignore_index=True)
#         df.to_excel('flask-project\user_details.xlsx', index=False)
#         return jsonify("Registration successful")
#     except Exception as e:
#         print(str(e))
#         return jsonify(f"An error occurred: {str(e)}"), 500
