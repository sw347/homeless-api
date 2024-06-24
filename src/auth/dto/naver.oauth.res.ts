export class NaverOAuthResponse {
  resultCode: string;
  message: string;
  response: {
    id: string;
    email: string;
    name: string;
  };
}
