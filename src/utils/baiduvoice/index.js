import BaiduVoice from './baidu_voice';
import config from './../../config';

const { appid, appsecret } = config.baidu_voice;

export default new class {

  constructor() {
    this.BaiduVoice = new BaiduVoice(appid, appsecret);
  }

  speechToText = async (format, speech, len, lan) => {
    try {
      const result = await this.BaiduVoice.speechToText(format, speech, len, lan);
      return result;
    } catch (err) {
      logger.error('BaiduVoice.error= ', err);
      throw err;
    }
  }
};
