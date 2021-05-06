# xx

```graphql
mutation MyMutation($name: String) {
  insert_users_one(object: {name: $name}) {
    id
    name
  }
}

{
  "name": "higuchi"
}
```

```graphql
mutation MyMutation($key: String, $name: String) {
  insert_rooms_one(object: {key: $key, name: $name}) {
    id
    key
    name
  }
}

{
  "key": "room1",
  "name": "部屋１"
}
```

```graphql
mutation MyMutation($roomKey: String, $text: String, $userId: Int) {
  insert_murmurs_one(object: {room_key: $roomKey, text: $text, user_id: $userId}) {
    id
    room_key
    text
    user_id
    create_at
  }
}

{
  "roomKey": "room1",
  "text": "ああああ",
  "userId": 1
}
```

```graphql
query MyQuery($roomKey: String = "") {
  murmurs(where: {room_key: {_eq: $roomKey}}) {
    create_at
    id
    text
    room {
      id
      name
      key
    }
    user {
      id
      name
    }
  }
}

{
  "roomKey": "room1"
}
```

// 下記は古いバージョンだからアップグレードしろって言われる

```graphql
subscription MySubscription($room_key: String_comparison_exp = {}) {
  murmurs(where: {room_key: $room_key}) {
    create_at
    id
    text
    user {
      id
      name
    }
    room {
      id
      key
      name
    }
  }
}

{
  "room_key": {
    "_eq": "room1"
  }
}
```
