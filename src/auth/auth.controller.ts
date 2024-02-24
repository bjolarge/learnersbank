import { 
  Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Req, 
  Res,ClassSerializerInterceptor, UseInterceptors, HttpStatus, Query,} from 
'@nestjs/common';
import { Request, Response} from 'express';
import { AuthService } from './auth.service';
import  UserService  from '../user/user.service';
import { RegisterDto } from './dto/registerdto';
import { LocalAuthenticationGuard } from './guard/localAuthentication.guard';
import RequestWithUser from './requestWithUser.interface';
import JwtAuthenticationGuard from './guard/jwt-authentication.guard';
//import { LoginDto } from './dto/login.dto';
import JwtRefreshGuard from './guard/JwtRefreshGuard';
import { INormalResponse } from 'src/common/interface/index.interface';
import { ResendCodeDto } from './dto/resend-code.dto';
import { PasswordResetDto } from './dto/password-reset.dto';
import { ConfigService } from '@nestjs/config';
//import { Login } from './interfaces/Login.interface';
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
   private readonly userService: UserService,
    ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    //former flow

    const user= this.authService.register(registrationData);
    console.log('Errrornow');
    return user;
    
  
  }
 
  // @HttpCode(200)
  // @UseGuards(LocalAuthenticationGuard)
  // @Post('log-in')
  // async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
  //   const {user} = request;
  //   const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(user.id);
  //   const refreshTokenCookie = this.authService.getCookieWithJwtRefreshToken(user.id);
 
  //   await this.userService.setCurrentRefreshToken(refreshToken, user.id);
 
  //   request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
  //   return user;
  //   // const cookie = this.authService.getCookieWithJwtToken(user.id);
  //   // response.setHeader('Set-Cookie', cookie);
  //   // user.password = undefined;
  //   // console.log("successfully log in");
  //   // return response.send(user);
  // }
 

  //real login with token feature
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user.id,
    );
    const {
      cookie: refreshTokenCookie,
      token: refreshToken,
    } = this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.userService.setCurrentRefreshToken(refreshToken, user.id);

    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return user;

    //going one

    // const user = request.user;
    // user.password = undefined;
    // return user;
  }

  //Log-out
  // @UseGuards(JwtAuthenticationGuard)
  // @Post('log-out') 
  // async logOut(@Req() request:RequestWithUser, @Res() response: Response) {
  //   response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
  //   console.log("Successfully logout");
  //   return response.sendStatus(200);
  // }

  // @UseGuards(JwtAuthenticationGuard)
  // @Post('log-out')
  // @HttpCode(200)
  // async logOut(@Req() request: RequestWithUser) {
  //   await this.userService.removeRefreshToken(request.user.id);
  //   request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
  // }

  @UseGuards(LocalAuthenticationGuard)
  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    await this.userService.removeRefreshToken(request.user.id);
    request.res.setHeader(
      'Set-Cookie',
      this.authService.getCookiesForLogOut(),
    );
  }


  //Login
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    console.log("Login")
    return user;
  }
  // handling the refresh token endpoint
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(request.user.id);
 
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }

  //Password reset flow

  // @Post("email/reset-password")
  // @HttpCode(HttpStatus.OK)
  // public async setNewPassword(
  //   @Body()resetPassword:ResetPasswordDto
  // ) :Promise<IResponse>{
  //   try{
  //     var isNewPasswordChanged: boolean = false;
  //     if(resetPassword.email && resetPassword.currentPassword){
  //       var isValidPassword = await this.authService.checkPassword(
  //         resetPassword.email,
  //         resetPassword.newPassword
  //       );
  //     }
  //   }else{
  //     return new ResponseError('RESET PASSWORD, WRONG CURRENT PASSWORD');
  //   }
  // }else if(resetPassword.newPasswordToken){
  //   var forgottenPasswordModel = await this.authService.getForgottenPasswordModel(
  //     resetPassword.newPasswordToken
  //   );

  //   isNewPasswordChanged = await this.userService.setPassword(
  //     forgottenPasswordModel.email,
  //     resetPassword.newPassword
  //   );
  //   if(isNewPasswordChanged) await forgottenPasswordModel.remove();
  // }else{
  //   return new UnhealthyResponseCodeError('RESET_PASSWORD_CHANGED_PASSWORD_ERROR');
  // }
  // return new ResponseSuccess(
  //   'RESET_PASSWORD.PASSWORD_CHANGED',
  //   isNewPasswordChanged
  // )

  // reset password flow
  // @Post('forget/password')
  // async forgetPassword(
  //   @Body() resendCodeDto: ResendCodeDto,
  // ): Promise<INormalResponse> {
  //   return await this.authService.forgetPassword(resendCodeDto);
  // }

  // @UseGuards(JwtAuthenticationGuard)
  // @Post('reset/password')
  // async resetPassword(
  //   //@Query('token') token:string,
  //   @Query('token')token:string,
  //   @Body() passwordResetDto: PasswordResetDto,
  // ): Promise<INormalResponse> {
  //   return await this.authService.passwordReset(
  //     token, 
  //     passwordResetDto);
  // }

}
