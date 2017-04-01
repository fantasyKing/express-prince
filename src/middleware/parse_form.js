import formidable from 'formidable';

export default new class {
  parse = async (req, res, next) => {
    try {
      const form = new formidable.IncomingForm();
      form.encoding = 'utf-8';
      form.keepExtensions = false;
      form.maxFieldsSize = 100 * 1024 * 1024; // 100Mb
      form.maxFields = 100;

      form.on('field', (name, value) => {
        if (req.body) {
          req.body[name] = value;
        }
      });

      form.on('file', (name, file) => {
        logger.debug('formidable.file = ', name, file);
      });

      form.on('error', (err) => {
        logger.error('formidable err = ', err);
        return res.json({ code: 0, message: 'file upload falied' });
      });

      form.on('aborted', () => res.json({ code: 1, message: 'file upload aborted' }));

      form.on('end', () => {
        logger.debug('formidable upload finish');
        return next();
      });
      return null;
    } catch (err) {
      logger.error('middleware formidable err = ', err);
      return next();
    }
  }
};
