import { Password } from './../services/password';
import express, { Request, Response} from 'express';
import {body, validationResult} from 'express-validator';
import { validateRequest } from '../middlewars/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';

const router=express.Router();
router.post('/api/users/signin',[
    body('email').isEmail().withMessage("Email must be valid"),
    body('password').trim().notEmpty().withMessage('You must supply a password')
], validateRequest, async( req: Request, res: Response)=>{
    const {email, password}=req.body;
    const existingUser = await User.findOne({email});
    if(!existingUser){
        throw new BadRequestError('Invalid credential');
    }
    const PasswordMatch=await Password.compare(existingUser.password,password);
    if(!PasswordMatch){
        throw new BadRequestError('Invalid credential');
    }

     //Generate JWT
     const userJwt=jwt.sign({
        id:existingUser.id,
        email:existingUser.email
    },process.env.JWT_KEY!);

    //Store it to cookie session
    req.session={
        jwt:userJwt
    }

    res.status(201).send(existingUser)
})

export {router as signinRouter};