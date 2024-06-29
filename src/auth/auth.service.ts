import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { OAuthUser } from './dto/oauth-user';
import { NaverOAuthResponse } from './dto/naver.oauth.res';
import { KakaoOAuthResponse } from './dto/kakao.oauth.res';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { SignInAdminDto } from './dto/sign-in-admin.dto';
import { SignUpAdminDto } from './dto/sign-up-admin.dto';
import { compare, hash } from 'bcrypt';
import { AdminService } from '../user/admin/admin.service';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getOAuthUserData(provider: string, token: string): Promise<OAuthUser> {
    switch (provider) {
      case 'kakao':
        return await this.getKakaoOAuthUser(token);
      case 'naver':
        return await this.getNaverOAuthUser(token);
    }
  }

  private async getKakaoOAuthUser(token: string): Promise<OAuthUser> {
    const user = await this.httpService.axiosRef.get<KakaoOAuthResponse>(
      'https://kapi.kakao.com/v2/user/me',
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return { id: user.data.id, provider: 'kakao' };
  }

  private async getNaverOAuthUser(token: string): Promise<OAuthUser> {
    const user = await this.httpService.axiosRef.get<NaverOAuthResponse>(
      'https://openapi.naver.com/v1/nid/me',
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return { ...user.data.response, provider: 'naver' };
  }

  async signIn(oauthUser: OAuthUser): Promise<string> {
    const { id, provider } = oauthUser;

    let user = await this.userService.findByOAuthId(id, provider);

    if (user === null) {
      await this.userService.create(oauthUser as CreateUserDto);
      user = await this.userService.findByOAuthId(id, provider);
    }

    return await this.createAccessToken(user.id, 'user');
  }

  async signInAdmin(signInAdminDto: SignInAdminDto): Promise<string> {
    const { email, password } = signInAdminDto;
    const admin = await this.adminService.findByEmail(email);
    if (admin === null) {
      throw new NotFoundException();
    }

    const isValid = compare(password, admin.password);
    if (!isValid) {
      throw new UnauthorizedException();
    }

    return await this.createAccessToken(admin.id, 'admin');
  }

  async signUpAdmin(signUpAdminDto: SignUpAdminDto): Promise<string> {
    const { email, password, ...data } = signUpAdminDto;
    const admin = await this.adminService.findByEmail(email);
    if (admin != null) {
      throw new ConflictException();
    }

    const hashed = await this.hashPassword(password);
    const created = await this.adminService.create({
      email,
      password: hashed,
      ...data,
    });
    if (created === null) {
      throw new InternalServerErrorException();
    }
    return this.signInAdmin({ email, password });
  }

  async createAccessToken(id: string, role: 'admin' | 'user') {
    return this.jwtService.sign(
      { id, role },
      { secret: this.configService.get<string>('JWT_SECRET') },
    );
  }

  async hashPassword(plain: string) {
    return hash(plain, 10);
  }

  async verifyAccessToken(token: string) {
    return await this.jwtService.verifyAsync<TokenDto>(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }
}
