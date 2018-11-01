interface authObj  {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
};

interface errorObj {
  error: string;
  error_description: string;
};

interface statusObj {
  status: string;
  user: any;
};

export interface KakaoAPI  {
  cleanup(): void;

  request(settings: {
    url: string,
    data?: Object,
    files?: FileList | Array<File> | Array<Blob>,
    success?: (resultObj: any) => void,
    fail?: (errorObj: errorObj) => void,
    always?: (resultObj: any | errorObj) => void,
  }): Promise<any>
};

export interface KakaoAuth {
  cleanup(): void;

  createLoginButton(settings: {
    container?: string | HTMLElement,
    lang?: string,
    size?: string
    success?: (authObj: authObj) => void,
    authObj?: authObj,
    fail?: (errorObj: errorObj) => void,
    errorObj?: errorObj,
    always?: (resultObj: authObj | errorObj) => void,
    persistAccessToken?: boolean,
    persistRefreshToken?: boolean,
  }): void;

  login(settings: {
    success?: (authObj: authObj) => void,
    fail?: (errorObj: errorObj) => void,
    always?: (resultObj: authObj | errorObj) => void,
    persistAccessToken?: boolean,
    persistApersistRefreshToken?: boolean,
    throughTalk?: boolean,
  }): void;

  logout(callback: () => void): void;

  loginForm(settings: {
    success?: (authObj: authObj) => void,
    fail?: (errorObj: errorObj) => void,
    always?: (resultObj: authObj | errorObj) => void,
    persistAccessToken?: boolean,
    persistRefreshToken?: boolean,
  }): void;

  getAccessToken(): string;

  setAccessToken(token: string, persist: boolean): void;

  setRefreshToken(token: string, persist: boolean): void;

  getAppKey(): string;

  getStatus(callback: (statusObj: statusObj, user: any) => void): void;
};

export interface Kakao {
  VERSION: string;

  API: KakaoAPI;
  Auth: KakaoAuth;

  init(apiKey: string): void;
  cleanup(): void;
};
