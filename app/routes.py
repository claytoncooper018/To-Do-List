from flask import Blueprint, request, jsonify, render_template
from .models import db, Task

bp = Blueprint("main", __name__)

@bp.route("/")
def index():
    return render_template("index.html")

# Get all tasks or create a new task
@bp.route("/tasks", methods=["GET", "POST"])
def tasks():
    if request.method == "POST":
        data = request.get_json()
        task = Task(title=data["title"], description=data.get("description", ""), priority=data.get("priority", "medium"))
        db.session.add(task)
        db.session.commit()
        return jsonify({"id": task.id, "title": task.title, "status": task.status, "priority": task.priority})
    else:
        tasks = Task.query.order_by(Task.created_at.desc()).all()
        return jsonify([{"id": t.id, "title": t.title, "status": t.status, "priority": t.priority} for t in tasks])

# Update task status or details
@bp.route("/tasks/<int:id>", methods=["PUT"])
def update_task(id):
    task = Task.query.get_or_404(id)
    data = request.get_json()
    task.title = data.get("title", task.title)
    task.status = data.get("status", task.status)
    task.priority = data.get("priority", task.priority)
    db.session.commit()
    return jsonify({"message": "Task updated"})

# Delete task
@bp.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted"})
