"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_cors import CORS
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from flask_bcrypt import Bcrypt 
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from datetime import timedelta

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../dist/')
app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
app.url_map.strict_slashes = False

app.config["JW_KEY"] = os.getenv('JW_KEY')
app.config["JW_KEY"] = timedelta(minutes=15)
jwt = JWTManager(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


@app.route('/api/login', methods=['POST'])
def login():
    
    body = request.get_json(silent=True)
    # validar body
    if body is None:
        return jsonify({'msg': 'POST method needs a body or email/password not found.'}), 400
    if 'email' not in body:
        return jsonify({'msg': 'email field is mandatory'}), 400
    if 'password' not in body:
        return jsonify({'msg': 'password field is mandatory'}), 400
    # buscar usuario
    email = body['email']
    password = body['password']

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'msg':'User or password incorrect'}), 400
    # validar password
    is_password = bcrypt.check_password_hash(user.password, password)
    print(is_password)
    
    
    if not is_password:
        return jsonify({'msg': 'User or password incorrect'}), 400
    # crear token
    access_token = create_access_token(identity=str(user.id))
    
    return jsonify(access_token=access_token)


@app.route('/api/signup', methods=['POST'])
def signup():
    body = request.get_json(silent=True)

    if body is None:
        return jsonify({'msg': 'POST method needs a body or email/password not found.'}), 400
    if 'email' not in body:
        return jsonify({'msg': 'email field is mandatory'}), 400
    if 'password' not in body:
        return jsonify({'msg': 'password field is mandatory'}), 400
    email = body.get("email")
    password = body.get("password")

    user = User.query.filter_by(email=email).first()
    if user is not None:
        return jsonify({'msg': 'Usuario ya registrado!'}), 400
    
    pw_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    user = User(email=email, password=pw_hash, is_active=True)
    db.session.add(user)
    db.session.commit()


    access_token = create_access_token(identity=str(user.id))
    return jsonify({'msg': 'User Registered successfully', 'access_token': access_token})


@app.route("/api/me", methods=["GET"])
@jwt_required()
def me():
    

    current_user = get_jwt_identity()
    user = User.query.get(current_user)
    print(user)
    return jsonify(user.serialize()), 200

@app.route('/api/update', methods=['PUT'])
@jwt_required()
def change_email():
    current_user = get_jwt_identity()
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'POST method needs a body.'}), 400
    if 'email' not in body:
        return jsonify({'msg': 'email field is mandatory'}), 400
    
    email = body.get('email')
    user_registered = User.query.get(current_user)
    user = User.query.filter_by(email=email).first()
    
    
    if user_registered.email == email:
        return jsonify({'msg': 'That is you actual email'}), 400

    if user and user.id != user_registered.id:
        return jsonify({'msg': 'That email is already in use!'}), 400

    user_registered.email = email
    db.session.commit()
    return jsonify({'msg': 'User succesfully modified!'}), 200
            
    

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
