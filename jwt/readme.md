# 使い方

```bash
docker compose up -d

curl http://localhost:3001

open http://localhost:18081
```

- hasura で `user` テーブルを作成

| column_name | column_type | default_value | Nullable | Unique | key         |
|:------------|:------------|:--------------|:--------:|:------:|:-----------:|
|id           |text         |               |false     |(true)  |primary key  |
|name         |text         |               |false     |true    |             |

- データを流し込む

```sql
insert into users (id, name) values ("1234567890", "Smith");
```

- テーブルの Permissions でロール作成
  - `user` ロール
  - `select`
    - With custom check にチェックして下記の json のように設定
    - Column select permissions
      - [x] id
      - [x] name

```json
{
  "id":{
    "_eq": "X-Hasura-User-Id"
  }
}
```

- hasura の API で、Request Headers を下記のように設定（access-token は取得したものに置き換える）して、下記 query を叩く。
  - [x] `content-type` : `application/json`
  - [ ] `x-hasura-admin-secret` : `********`
  - [x] `Authorization` : `Bearer {access-token}`

```graphql
query MyQuery {
  user {
    id
    name
  }
}
```
