import FFmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

const inputStream = fs.createReadStream(path.resolve(`${__dirname}./../src/public/upload/example.aac`));
inputStream.on('error', function(err) {
  console.log(err);
});
// const outStream = fs.createWriteStream(path.resolve(`${__dirname}./../src/public/upload/2.aac`));
function convert() {
  const mp3Command = new FFmpeg(inputStream)
  .withAudioBitrate(16)
  .withAudioChannels(1)
  .withAudioFrequency(8000)
  .on('start', (commandLine) => {
    // The 'start' event is emitted just after the FFmpeg
    // process is spawned.
    console.log('Spawned FFmpeg with command: ' + commandLine);
  })
  // .on('progress', (progress) => {
  //   // The 'progress' event is emitted every time FFmpeg
  //   // reports progress information. 'progress' contains
  //   // the following information:
  //   // - 'frames': the total processed frame count
  //   // - 'currentFps': the framerate at which FFmpeg is
  //   //   currently processing
  //   // - 'currentKbps': the throughput at which FFmpeg is
  //   //   currently processing
  //   // - 'targetSize': the current size of the target file
  //   //   in kilobytes
  //   // - 'timemark': the timestamp of the current frame
  //   //   in seconds
  //   // - 'percent': an estimation of the progress
  //   console.log('Processing: ' + progress.percent + '% done');
  // })
  .on('error', (err) => {
    // The 'error' event is emitted when an error occurs,
    // either when preparing the FFmpeg process or while
    // it is running
    console.log('Cannot process audio: ' + err.message);
  })
  .on('end', () => {
    // The 'end' event is emitted when FFmpeg finishes
    // processing.
    console.log('Processing finished successfully');
  })
  .save(path.resolve(`${__dirname}./../src/public/upload/5.aac`));

  // const outStream = mp3Command.pipe();

  // outStream.on('data', (chunk) => {
  //   console.log('ffmpeg just wrote ' + chunk.length + ' bytes');
  // })
  // .output(outStream)
  // .pipe(outStream, { end: true })
}

convert();

// --with-fdk-aac --with-wavpack --with-opencore-amr
// ffmpeg -i example.aac -ac 1 -ar 8000 -ab 16k 2.amr

// ffmpeg -i example.aac -y -b:a 16k -ac 1 -ar 8000 3.amr


// git clone https://git.ffmpeg.org/ffmpeg.git ffmpeg
// ./configure --prefix=/usr/local/ffmpeg --enable-shared --disable-yasm --enable-pthreads --enable-gpl --enable-version3 --enable-hardcoded-tables --enable-avresample --enable-libfdk-aac --enable-libmp3lame --enable-libopencore-amrnb --enable-libopencore-amrwb --enable-libwavpack --enable-libx264 --enable-libxvid --disable-lzma --enable-nonfree
// make
// sudo make install
// 在/etc/ld.so.conf.d/目录下创建一个新文件ffmpeg.conf, 文件的内容为:/usr/local/ffmpeg/lib
// 再执行ldconfig，更新ld.so.cache，使修改生效

// 为了在任何地方能够直接用ffmpeg命令运行
// sudo ln -s /usr/local/ffmpeg/bin/ffmpeg /usr/local/bin/
// sudo ln -s /usr/local/ffmpeg/bin/ffprobe /usr/local/bin/
// sudo ln -s /usr/local/ffmpeg/bin/ffserver /usr/local/bin/

// 另外，如果变成需要包含ffmpeg的头文件，最好将include目录下的ffmpeg复制到/usr/include中

// --prefix=/usr/local/ffmpeg --enable-shared --disable-yasm --enable-pthreads --enable-gpl --enable-version3 --enable-hardcoded-tables --enable-avresample --enable-libfdk-aac --enable-libmp3lame --enable-libopencore-amrnb --enable-libopencore-amrwb --enable-libwavpack --enable-libx264 --enable-libxvid --disable-lzma --enable-nonfree
