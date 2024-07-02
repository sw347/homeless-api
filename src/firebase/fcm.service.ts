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
    // this.httpService.get()
  }

  async sendWorkPost(workPost: WorkPost) {
    //
  }
}
