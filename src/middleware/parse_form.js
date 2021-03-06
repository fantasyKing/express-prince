import fs from 'fs';
import moment from 'moment';
import uuid from 'uuid';
import del from 'del';

import config from './../config';
import FFmpeg from './../utils/ffmpeg';
import BaiduVoice from './../utils/baiduvoice';

const DEFAULT = 'amr';

export default new class {
  /**
   * 将语音的类型转换为amr类型，同时调用百度语音识别，将语音转换为text
   */
  ConvertToAmr = (req, res, next) => {
    this.parse(req, res, next, 'amr');
  }

  parse = (req, res, next, type) => {
    let fileFlag = false;
    if (req.busboy) {
      req.busboy.on('field', (key, value) => {
        logger.debug('field', key, value);
        req.body[key] = value;
      });

      req.busboy.on('file', async (fieldname, fileStream, filename, encoding, mimetype) => {
        logger.debug('busboy file ', fieldname, filename, encoding, mimetype);
        try {
          fileFlag = true;
          const fileName = `${moment().format('YYYYMMDDHHmmss')}_${uuid.v4()}.${type || DEFAULT}`;
          const file_path = this.__getSaveFolder() + fileName;
          await FFmpeg.convert(fileStream, file_path); // 使用ffmpeg库，将语音转换为amr类型
          logger.debug('FFmpeg finish----->');

          // 调用百度语音，转换text，删除语音文件
          const voiceData = await this.readFile(file_path, 'base64');
          if (!voiceData) {
            return res.json({ code: 0, message: 'file is empty' });
          }

          // 获取文件的stat信息
          const fileStat = await this.fileStat(file_path);
          logger.debug('start delete file');
          await del([file_path]); // 删除本地语音文件

          // 调用百度语音识别，将语音转换为文字
          const voiceText = await BaiduVoice.speechToText(type, voiceData, fileStat.size, config.language);
          logger.debug('voiceText--->', voiceText);
          if (!voiceText || !Array.isArray(voiceText) || !voiceText.length) {
            return res.json({ code: 0, message: '无法识别您说的内容' });
          }

          // 将语音中的文字，绑定到sentence字段，转给下一个中间件
          req.body['sentence'] = voiceText[0];
          next(); // 调用下一个中间件
        } catch (err) {
          logger.error('busboy err = ', err);
          return res.json({ code: 0, message: 'upload file failed, please try later' });
        }
      });

      req.busboy.on('finish', () => {
        logger.debug('busboy finish...');
        if (!fileFlag) {
          return res.json({ code: 0, message: 'no file to convert' });
        }
      });

      req.pipe(req.busboy);
    } else {
      res.json({ code: 0, message: 'syetem error' });
    }
  }

  __getSaveFolder = () => {
    const _path = config.public_path + config.upload_path;
    logger.info('getSaveFolder._path', _path);
    if (!fs.existsSync(config.public_path)) {
      fs.mkdirSync(config.public_path);
    }
    if (!fs.existsSync(_path)) {
      fs.mkdirSync(_path);
    }
    return _path;
  };

  __checkFile = (path) => new Promise((resolve, reject) => {
    fs.exists(path, (exists) => {
      if (exists) {
        return resolve();
      }
      fs.writeFile(path, { flag: 'wx' }, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  });

  readFile = (filepath, encode) => new Promise((resolve, reject) => {
    fs.readFile(filepath, encode, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });

  fileStat = (filepath) => new Promise((resolve, reject) => {
    fs.stat(filepath, (err, stats) => {
      if (err) {
        return reject(err);
      }
      return resolve(stats);
    });
  });
};
