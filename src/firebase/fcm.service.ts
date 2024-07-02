import { Injectable } from '@nestjs/common';
import * as firebaseConfig from './firebase-config.json';
import * as admin from 'firebase-admin';
import { HttpService } from '@nestjs/axios';
import { UserService } from '../user/user.service';
import { Post } from '../post/entities/post.entity';
import { WorkPost } from '../work-post/entities/work-post.entity';

const firebase_params = {
  type: firebaseConfig.type,
  projectId: firebaseConfig.project_id,
  privateKeyId: firebaseConfig.private_key_id,
  privateKey: firebaseConfig.private_key,
  clientEmail: firebaseConfig.client_email,
  clientId: firebaseConfig.client_id,
  authUri: firebaseConfig.auth_uri,
  tokenUri: firebaseConfig.token_uri,
  authProviderX509CertUrl: firebaseConfig.auth_provider_x509_cert_url,
  clientC509CertUrl: firebaseConfig.client_x509_cert_url,
};

@Injectable()
export class FcmService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
  ) {
    admin.initializeApp({
      credential: admin.credential.cert(firebase_params),
    });
  }

  async apply(token: string, title: string, message: string) {
    const payload = {
      token: token,
      notification: {
        title: title,
        body: message,
      },
      data: {
        body: message,
      },
    };

    return await admin.messaging().send(payload);
  }

  async sendPost(post: Post) {
    const users = await this.httpService.axiosRef.get<string[]>(
      `http://localhost:8727/search/user?title=${post.title}&description=${post.description}`,
    );

    const tokens = (await this.userService.finds(users.data)).map(
      (user) => user.fcmToken,
    );
    // const tokens = [
    //   'cQF6338ITySHTSvC89guDt:APA91bFKa0souHX7W8Q9L0mbJUbsQzvje_ey094Mjm-xCBlELRPC0ExhyVTgUPOwj7xdtPnZ3gt3VDznXC_7WpnqIPngHuzRwDK7_8J3SKqoIIPQrYUAybqvWoO_-FC4rWjqQN2WZNlI',
    // ];

    const payload = {
      tokens,
      notification: {
        title: `새 게시물을 확인해보세요!`,
        body: `${post.title}`,
      },
      data: {
        body: `${post.title}`,
      },
    };
    return await admin.messaging().sendEachForMulticast(payload);
  }
}
