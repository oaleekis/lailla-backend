export class AuthResponseDto {
    accessToken: string;
    expiresIn: number | string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
  