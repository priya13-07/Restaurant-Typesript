// import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction, RequestHandler } from 'express';

// export const generateAdminToken = (): string => {
//   const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || '', {
//     expiresIn: '1h', // Set the token expiration time
//   });
//   return token;
// };

// const authenticateAdmin: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ message: 'Access denied' });
//   }

//   try {
//     const decoded: any = jwt.verify(token, process.env.JWT_SECRET || '');

//     if (decoded.role !== 'admin') {
//       throw new Error('Unauthorized');
//     }

//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Unauthorized' });
//   }
// };

// export default authenticateAdmin;

// import { NextFunction, Request, Response } from "express";

// const auth = (req:Request, res:Response, next:NextFunction) : void  => {
//     const {token} = req.headers;
//     console.log("I am in auth middleware!");
//     if(token!=='admin'){
//         res.status(401).json({
//             message:"You are Unauthorized"
//         })
//         return;
//     }
//     next();
// }

// export default auth;

