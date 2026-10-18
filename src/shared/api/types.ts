export type AuthUser = {
  id: string;
  email: string;
  name: string;
  avatarPath?: string;
  about?: string;
  phone?: string;
  roles?: string[];
};

export type AuthUserPreview = Pick<AuthUser, 'id' | 'email'>;

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  user: AuthUserPreview;
  accessToken: string;
};
