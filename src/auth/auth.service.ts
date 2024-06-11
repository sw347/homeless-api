import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getOAuthUserData(provider: string, token: string) {
    switch (provider) {
      case 'kakao':
        return await this.getKakaoOAuthUser(token);
      case 'naver':
        return await this.getNaverOAuthUser(token);
    }
  }

  async getKakaoOAuthUser(token: string) {
    const user = await this.httpService.axiosRef.get<{
      id: number;
      connected_at: string;
    }>('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { id } = user.data;
    return { id: String(id), provider: 'kakao' };
  }

  async getNaverOAuthUser(token: string) {
    const user = await this.httpService.axiosRef.get<{
      resultCode: string;
      message: string;
      response: {
        id: string;
        email: string;
        name: string;
      };
    }>('https://openapi.naver.com/v1/nid/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { ...user.data.response, provider: 'naver' };
  }

  async login(oauthUser: { id: string; provider: string }) {
    let user = await this.userService.findOne(oauthUser.id);

    if (user == null) {
      await this.userService.create(oauthUser);
      user = await this.userService.findOne(oauthUser.id);
    }

    return await this.createAccessToken(user.uuid);
  }

  async createAccessToken(id: string) {
    return this.jwtService.sign(
      { id },
      { secret: this.configService.get<string>('JWT_SECRET') },
    );
  }
}
