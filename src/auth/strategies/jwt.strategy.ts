
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable,  UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../constants/constants';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService:UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload:{sub:number, email:string}) {
    const data = {id:payload.sub, email: payload.email} 
     const user = await this.userService.findByCond(data) //undefined or obj
     if(!user){
       throw new UnauthorizedException('Not access')
     }
    return {
      id:user.id,
      email:user.email,
      fullName:user.fullName,
    }
  }
}
