const routes= require('express').Router();

const UserController= require('./controllers/UserController');
const CommentController= require('./controllers/CommentController');
const RoomController= require('./controllers/RoomController');
const AuthController= require('./controllers/AuthController');
const Users_roomController= require('./controllers/Users_roomController');

routes.get('/user', UserController.index);
routes.post('/user', UserController.create);

routes.get('/comment', CommentController.index);
routes.post('/comment', CommentController.create);

routes.get('/room', RoomController.index);
routes.post('/room', RoomController.create);

routes.post('/auth', AuthController.create);

routes.get('/room/add', Users_roomController.index);
routes.post('/room/add/:id', Users_roomController.create);

module.exports= routes;