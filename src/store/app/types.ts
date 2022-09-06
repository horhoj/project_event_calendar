export interface AppState {
  redirectUrl: AppRedirectUrl | null;
}

export interface AppRedirectUrl {
  path: string;
}
