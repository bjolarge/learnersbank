// import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// export const GetUser = createParamDecorator(
//   (data: string , ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     if(data){
//       // console.log(request.user['name']);
//       return request.user[data];
//     }
//     console.log(request.user)
//     return request.user;
//   },
// );

// import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// export const GetUser = createParamDecorator(
//   (data: string, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     const user = request.user;

//     return data ? user?.[data] : user;
//   },
// );

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import  User  from '../../user/entities/user.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);