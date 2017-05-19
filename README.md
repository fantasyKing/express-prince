# express - prince

## API

1. /article/list

* mehtod GET

* 参数

|名称|类型|是否必填|描述|
|----|----|----|----|
|page|number|0|当前页码|
|limit|number|0|每页显示数量|
|timestamp|number|0|显示文章的最晚时间|
|text|string|0|关键词(梅西 罗本)要用空格隔开|

* 返回结果

```json
{
  "code": 1,
  "result": {
    "pagination": { "page": "当前页码", "limit": "当前页显示的数量", "timestamp": "显示文章的最晚的时间", "text": "搜索的关键字(梅西 罗本)" },
    "result": [{
      "title": "文章标题",
      "description": "文章描述",
      "url": "文章的url",
      "display_time": "文章的发布时间",
      "thumb": "文章的头像",
      "article_id": "文章的id",
      "id": "文章的mongoid"
    }]
  }
}
```

2. /sentence/text

* method POST

* 参数

```text
采用form-data的提交方式，将.aac类型的文件post到该url下
```

>语音中关键词，当前仅支持两个。例如：`请帮我搜索梅西相关的文章。`中，关键词为梅西。也可以是`搜索梅西`，`搜索梅西和罗本`，`请帮我搜索与梅西和罗本相关的文章`，`梅西`。

* 返回结果

```json
{
  "code": 1,
  "result": "梅西 罗本"
}
```

## 项目部署

所有的项目都需要先执行make dist编译。

1. spider

>爬虫服务采用fork方式部署。

```bash
cd /root/spider-prince/dist

NODE_ENV=production pm2 start index.js --name="spider"
```

2. express

>该项目为客户端提供api接口。需要采用cluster方式运行

ecosystem.json

```json
{
  "apps": [
    {
      "name": "express-prince",
      "script": "index.js",
      "instances": 1, // 视机器情况而定, 建议至少起动2个实例
      "exec_mode": "cluster"
    }
  ]
}
```

```bash
cd /root/express-prince/dist

NODE_ENV=production pm2 startOrRestart ecosystem.json
```

## ffmpeg包安装(ubantu)

1. 执行 git clone https://git.ffmpeg.org/ffmpeg.git ffmpeg，获取ffmpeg的sourcecode

2. 设置编码的选项

>配置过程中可能会提示某些包无法找到的错误，需要先安装相应的包，在执行该命令。

```bash
./configure --prefix=/usr/local/ffmpeg --enable-shared --disable-yasm --enable-pthreads --enable-gpl --enable-version3 --enable-hardcoded-tables --enable-avresample --enable-libfdk-aac --enable-libmp3lame --enable-libopencore-amrnb --enable-libopencore-amrwb --enable-libwavpack --enable-libx264 --enable-libxvid --disable-lzma --enable-nonfree
```

3. 编译源码

```bash
make
```

4. 安装一些引入的包

```bash
make install
```

5. 路径处理

* 在/etc/ld.so.conf.d/目录下创建一个新文件`ffmpeg.conf`

* 在文件中写入`/usr/local/ffmpeg/lib`

* 执行ldconfig，更新ld.so.cache，使修改生效

6. 使ffmpeg命令生效

```bash
sudo ln -s /usr/local/ffmpeg/bin/ffmpeg /usr/local/bin/

sudo ln -s /usr/local/ffmpeg/bin/ffprobe /usr/local/bin/

sudo ln -s /usr/local/ffmpeg/bin/ffserver /usr/local/bin/
```

7. 完成

  在shell中输入ffmpeg命令，查看命令是否生效

```bash
ffmpeg
```
