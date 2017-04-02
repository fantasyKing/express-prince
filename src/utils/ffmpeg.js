import ffmpeg from 'fluent-ffmpeg';

export default new class {
  convert = (fileStream, filepath) => new Promise((resolve, reject) => {
    new ffmpeg(fileStream)
      .withAudioBitrate(16)
      .withAudioChannels(1)
      .withAudioFrequency(8000)
      .on('start', (commandLine) => {
        // The 'start' event is emitted just after the FFmpeg process is spawned.
        logger.debug(`Spawned FFmpeg with command: ${commandLine}`);
      })
      .on('error', (err) => {
        // The 'error' event is emitted when an error occurs,
        // either when preparing the FFmpeg process or while
        // it is running
        logger.debug(`Cannot process audio: ${err.message}`);
        reject(err);
      })
      .on('end', () => {
        // The 'end' event is emitted when FFmpeg finishes
        // processing.
        logger.debug('Processing finished successfully');
        resolve();
      })
      .save(filepath);
  })
};
