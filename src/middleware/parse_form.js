import fs from 'fs';
import moment from 'moment';
import uuid from 'uuid';

import config from './../config';

export default new class {
  parse = (req, res, next) => {
    if (req.busboy) {
      req.busboy.on('field', (key, value) => {
        logger.debug('field', key, value);
        req.body[key] = value;
      });

      req.busboy.on('file', async (fieldname, fileStream, filename, encoding, mimetype) => {
        logger.debug('busboy file ', fieldname, filename, encoding, mimetype);
        const _fileName = `${moment().format('YYYYMMDDHHmmss')}_${uuid.v4()}${this.__getFileType(filename)}`;
        const file_path = this.__getSaveFolder() + _fileName;
        await this.__checkFile(file_path);
        await this.__saveFile(file_path, fileStream);
      });
      req.busboy.on('finish', () => {
        logger.debug('busboy finish...');
        next();
      });
      req.pipe(req.busboy);
    }
  }

  __saveFile = (path, file) => new Promise((resolve, reject) => {
    const fstream = fs.createWriteStream(path);
    file.pipe(fstream);
    fstream.on('close', () => {
      resolve({ fileSize: fstream.bytesWritten });
    });
    fstream.on('error', (err) => {
      reject(err);
    });
    fstream.on('progress', (progress) => {
      logger.debug(`chunk size: ${progress.delta}`);
    });
  });

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

  __getFileType = (fileName) => {
    if (!fileName) {
      return '';
    }
    const idx = fileName.lastIndexOf('.');
    if (idx === -1) {
      return fileName;
    }
    return fileName.substring(idx);
  };
};
