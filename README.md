# express - prince

## API

1. /article/list

* mehtod POST

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
  code: 1,
  result: {
    pagination: { page: "当前页码", limit: "当前页显示的数量", timestamp: "显示文章的最晚的时间", text: "搜索的关键字(梅西 罗本)" },
    result: [{
      title: "文章标题",
      description: "文章描述",
      url: "文章的url",
      display_time: "文章的发布时间",
      thumb: "文章的头像",
      article_id: "文章的id",
      id: "文章的mongoid"
    }]
  }
}
```

2. /sectence/text

* method POST

* 参数

```text
采用form-data的提交方式，将.aac类型的文件post到该url下
```

* 返回结果

```json
{
  code: 1,
  result: "梅西 罗本"
}
```
