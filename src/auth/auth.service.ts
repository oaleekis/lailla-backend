import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { AuthResponseDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private readonly jwtExpirationTime: string;
    private readonly jwtSecret: string;

    constructor(
        private readonly usersService: UsersService, 
        private readonly jwtService: JwtService, 
        private readonly configService: ConfigService
    ) { 
        const jwtExpiration = this.configService.get<string>('JWT_EXPIRATION_TIME');
        if(!jwtExpiration){
            throw new Error('Jwt is not defined in the configuration');
        }
        const secret = this.configService.get<string>('JWT_SECRET');
        if(!secret) {
            throw new Error('JWT_SECRET is not defined in the configuration');
        }
        this.jwtExpirationTime = jwtExpiration;
        this.jwtSecret = secret;
    }

    async signIn(email: string, password: string): Promise<AuthResponseDto> {
        const foundUser = await this.usersService.findOneByEmail(email);

        if (!foundUser || !bcryptCompareSync(password, foundUser.password)) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload = { sub: foundUser.id, email: foundUser.email };

        const token = this.jwtService.sign(payload, {
            secret: this.jwtSecret,
            expiresIn: this.jwtExpirationTime,
        });

        return {
            accessToken: token,
            expiresIn: this.jwtExpirationTime,
            user: {
                id: foundUser.id as string,
                name: foundUser.name,
                email: foundUser.email
            }
        };
    }
}
