import { Router } from 'express'
import { UserController } from './api/controllers/userController'
import { authMiddleware } from './middlewares/authMiddleware'

import { FriendsController } from './api/controllers/friendsController'

const routes = Router()

routes.post('/user', new UserController().create)
routes.post('/login', new UserController().login)

routes.use(authMiddleware)

routes.get('/profile', new UserController().getProfile)

routes.get('/list-friends', new FriendsController().getFriends)

export default routes