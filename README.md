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
|sentence|string|0|关键词|

* 返回结果

```json
{
  code: 1,
  result: {
    pagination: { page, limit, timestamp, text },
    result: [{}]
  }
}
```
