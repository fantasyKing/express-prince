import test from 'ava';
import FFmpeg from 'fluent-ffmpeg';

test('convert aac to mp3', async t => {
  try {
    const mp3Command = new FFmpeg({ source: './../src/public/upload/example.aac' })
    .withAudioCodec('libmp3lame')
    .

  } catch (err) {
    console.log('err = ', err);
    t.falsy(false);
  }
});

// --with-fdk-aac --with-wavpack --with-opencore-amr
 