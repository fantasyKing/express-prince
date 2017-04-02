import request from './../request';
import AccessToken from './access_token';
import SpeechToText from './speech_to_text';

export default class API extends SpeechToText {
  constructor(appid, appsecret, getToken, saveToken) {
    super();
    this.appid = appid;
    this.appsecret = appsecret;
    this.getToken = getToken || this.getTokenDefault;
    this.saveToken = saveToken || this.saveTokenDefault;
    this.request = request;
    this.prefix = 'http://openapi.baidu.com/oauth/2.0/';
    this.voicePrefix = 'http://vop.baidu.com/server_api';
  }

  getTokenDefault = async () => this.store;

  saveTokenDefault = async (token) => {
    this.store = token;
    if (process.env.NODE_ENV === 'production') {
      console.warn('Don\'t save token in memory, when cluster or multi-computer!');
    }
  }

  getAccessToken = async () => {
    const url = `${this.prefix}/token?grant_type=client_credentials&client_id=${this.appid}&client_secret=${this.appsecret}`;
    const data = await this.request.post(url);
    if (data && data.error) {
      throw new Error(data.error);
    }
    const expireTime = (new Date().getTime()) + (data.expires_in - 10) * 1000;
    const token = new AccessToken(data.access_token, expireTime);
    await this.saveToken(token);
    return token;
  }

  preRequest = async (method, ...args) => {
    let token = await this.getToken();
    token = token && new AccessToken(token.accessToken, token.expireTime).isValid();
    if (token) {
      this.token = token;
      return await method.apply(this, args);
    }
    this.token = await this.getAccessToken();
    return await method.apply(this, args);
  }

  getLatestToken = async () => {
    let token = await this.getToken();
    token = token && new AccessToken(token.accessToken, token.expireTime).isValid();
    if (token && token.isValid()) {
      return token;
    }
    return await this.getAccessToken();
  }

  bind = (obj) => {
    for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(obj))) {
      this[key] = Object.getPrototypeOf(obj)[key];
    }
  }
}
