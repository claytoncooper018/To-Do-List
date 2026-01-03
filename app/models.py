from . import db
from datetime import datetime

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    status = db.Column(db.String(20), default="pending")  # pending/completed
    priority = db.Column(db.String(20), default="medium") # low/medium/high
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
