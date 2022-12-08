import { Request, Response } from 'express';
import { UnauthorizedError } from '../../helpers/api-erros';
import api from '../api';

export class FriendsController {
  async getFriends(req: Request, res: Response) {
    try {
      const data = await api.get('/users');

      return res.json(data);
    } catch (error){
      console.log(error);
      
      return error
    }
  }
}
