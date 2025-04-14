#This file defines your API routes and implements the business logic:
from app import app, db
from models import Friend
from flask import jsonify, request


#Get all friends
@app.route('/api/friends', methods=['GET'])
def get_friends():
    friends=Friend.query.all()
    result=[friend.to_json() for friend in friends] #Converts each Friend object to a JSON serializable dictionary using the to_json method defined in the Friend model.
    return jsonify(result),200 #Returns a JSON response with the list of friends and a 200 OK status code.

#Create a new friend
@app.route('/api/friends', methods=['POST'])
def create_friend():
    try:
        data=request.json #Get the JSON data from the request body
        #validations
        required_fields=["name","role","description","gender"]
        for field in required_fields:
            if field not in data:
                return jsonify({
                    "error":f'Missing required field:{field}'
                    }),400 #Returns a 400 Bad Request error if any required field is missing.


        name=data.get("name")
        role=data.get("role")
        description=data.get("description")
        gender=data.get("gender")

        if gender=="male":
            img_url=f"https://avatar.iran.liara.run/public/boy?username={gender}"
        elif gender=="female":
            img_url=f"https://avatar.iran.liara.run/public/girl?username={gender}"
        else:
            img_url=None

        new_friend=Friend(name=name,role=role,description=description,gender=gender,img_url=img_url)

        db.session.add(new_friend)
        db.session.commit()
        return jsonify({"msg":"Friend created successfully"}),201 #Returns a 201 Created status code if the friend is created successfully.
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}),500 #Returns a 500 Internal Server Error status code if an exception occurs during the process.
         
#Delete a friend-
@app.route('/api/friends/<int:id>', methods=['DELETE'])
def delete_friend(id):
    try:
        friend=Friend.query.get(id)
        if friend is None:
            return jsonify({"error":"Friend not found"}),404 #Returns a 404 Not Found error if the friend with the specified ID does not exist.
        db.session.delete(friend)
        db.session.commit()
        return jsonify({"msg":"Friend deleted successfully"}),200 #Returns a 200 OK status code if the friend is deleted successfully.
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}),500
    
@app.route('/api/friends/<int:id>',methods=['PATCH'])
def update_friend(id):
    try:
        friend=Friend.query.get(id)
        if friend is None:
            return jsonify({"error":"Friend not found"}),404
        
        data=request.json
        friend.name=data.get("name",friend.name) #Updates the friend's name if provided in the request body, otherwise keeps the existing name as described by freind.name.
        friend.role=data.get("role",friend.role)
        friend.description=data.get("description",friend.description)   
        friend.gender=data.get("gender",friend.gender)

        db.session.commit()
        return jsonify(friend.to_json()),200 #Returns a 200 OK status code if the friend is updated successfully.
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}),500