import "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    username: string;
    email: string;
    token: string;
    first_name: string;
    last_name: string;
    username: string;
    refresh_token: string;
    access_token: string;
  }

  interface Session extends DefaultSession {
    id: number;
    user: User;
    token: string;
    first_name: string;
    last_name: string;
    username: string;
    access_token: string;
    user_id: number;
    refresh_token: string;
  }
}
