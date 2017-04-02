export default class AccessToken {
  constructor(accessToken, expireTime) {
    this.accessToken = accessToken;
    this.expireTime = expireTime;
  }

  isValid = () => !!this.accessToken && (new Date().getTime()) < this.expireTime;
}
