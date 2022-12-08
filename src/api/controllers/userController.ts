import { Request, Response } from 'express';
import { BadRequestError } from '../../helpers/api-erros';
import { userRepository } from '../../repositories/userRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../entities/User';

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const userExists = await userRepository.findOneBy({ email });

    if (userExists) {
      throw new BadRequestError('E-mail já existe');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = hashPassword;

    await userRepository.save(newUser);

    const { password: _, ...user } = newUser;

    return res.status(201).json(user);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await userRepository.findOneBy({
      email: email,
    });

    if (!user) {
      throw new BadRequestError('E-mail ou senha inválidos');
    }

    const verifyPass = await bcrypt.compare(password, user.password);

    if (!verifyPass) {
      throw new BadRequestError('E-mail ou senha inválidos');
    }

    const token = jwt.sign(
      { id: user.email },
      '$2b$10$7Zxg2U3O2sBwXun5C08jHOb82sCebCduNctbp7LLPxMmDxG0ybHNy',
      {
        expiresIn: '8h',
      }
    );

    return res.json({
      token: token,
    });
  }

  async getProfile(req: Request, res: Response) {
    return res.json(req.user);
  }
}
