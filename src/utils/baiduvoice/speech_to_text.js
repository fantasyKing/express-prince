import uuid from 'uuid';

export default class {
  async speechToText(format, speech, len, lan) {
    return await this.preRequest(this.__speechToText, format, speech, len, lan);
  }

  async __speechToText(format, speech, len, lan) {
    const options = {
      format,
      rate: 8000,
      channel: 1,
      cuid: uuid.v4(),
      token: this.token.accessToken,
      lan,
      speech,
      len
    };
    const result = await this.request.post(this.voicePrefix, options);
    if (result && result.err_no === 0) {
      return result.result;
    }
    logger.debug('result---->', result);
    throw new Error(result && result.err_msg || 'speechToText error');
  }
}
