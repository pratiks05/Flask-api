#This file defines your database schema using SQLAlchemy ORM:

from app import db

class Friend(db.Model): #This class defines the Friend model, which represents a table in the database.
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(100),nullable=False)
    role=db.Column(db.String(50),nullable=False)
    description=db.Column(db.Text,nullable=False)
    gender=db.Column(db.String(10),nullable=False)
    img_url=db.Column(db.String(200),nullable=False)

    def to_json(self): #This method converts the Friend object to a JSON serializable dictionary.
        return{
            "id":self.id,
            "name":self.name,
            "role":self.role,
            "description":self.description,
            "gender":self.gender,
            "imgUrl":self.img_url,
        }