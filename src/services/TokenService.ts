const LOCAL_STORAGE_TOKEN_KEY_NAME = 'token';

export const TokenSerivce = {
  set(token: string): void {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY_NAME, token);
  },
  get(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY_NAME);
  },
  remove(): void {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY_NAME);
  },
};
