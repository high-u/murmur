# Provisioning

## Create Table

### users

```sql
create table users (
  id              uuid      default gen_random_uuid(),
  email           text      not null,
  thumbnail_url   text,
  display_name    text,
  verified_email  boolean   not null default false,
  updated_at      timestamp without time zone default now(),
  primary key (id),
  unique (email)
);
```

```bash
curl -0 -v -X POST http://localhost:18081/v2/query \
-H "x-hasura-admin-secret: myadminsecretkey" \
-H 'Content-Type: application/json; charset=utf-8' \
-d @- <<'EOF'
{
  "type": "run_sql",
  "args": {
    "source": "default",
    "sql": "create table users ( id uuid default gen_random_uuid(), email text not null, thumbnail_url text, display_name text, verified_email boolean not null default false, updated_at timestamp without time zone default now(), primary key (id), unique (email));"
  }
}
EOF
```

```bash
curl -0 -v -X POST http://localhost:18081/v1/query \
-H "x-hasura-admin-secret: myadminsecretkey" \
-H 'Content-Type: application/json; charset=utf-8' \
-d @- <<'EOF'
{
  "type": "track_table",
  "args": "users"
}
EOF
```

### rooms

```sql
create table rooms (
  id              uuid      default gen_random_uuid(),
  key             text      not null,
  name            text,
  entered_room_at timestamp without time zone default now(),
  create_at       timestamp without time zone default now(),
  primary key (id),
  unique (key, name)
);
```

```bash
curl -0 -v -X POST http://localhost:18081/v2/query \
-H "x-hasura-admin-secret: myadminsecretkey" \
-H 'Content-Type: application/json; charset=utf-8' \
-d @- <<'EOF'
{
  "type": "run_sql",
  "args": {
    "source": "default",
    "sql": "create table rooms ( id uuid default gen_random_uuid(), key text not null, name text, entered_room_at timestamp without time zone default now(), create_at timestamp without time zone default now(), primary key (id), unique (key, name));"
  }
}
EOF
```

```bash
curl -0 -v -X POST http://localhost:18081/v1/query \
-H "x-hasura-admin-secret: myadminsecretkey" \
-H 'Content-Type: application/json; charset=utf-8' \
-d @- <<'EOF'
{
  "type": "track_table",
  "args": "rooms"
}
EOF
```

### murmurs

```sql
create table murmurs (
  id              uuid      default gen_random_uuid(),
  text            text      not null,
  room_key        text      not null,
  user_id         text      not null,
  create_at       timestamp without time zone default now(),
  primary key (id)
);
```

```bash
curl -0 -v -X POST http://localhost:18081/v2/query \
-H "x-hasura-admin-secret: myadminsecretkey" \
-H 'Content-Type: application/json; charset=utf-8' \
-d @- <<'EOF'
{
  "type": "run_sql",
  "args": {
    "source": "default",
    "sql": "create table murmurs ( id uuid default gen_random_uuid(), text text not null, room_key text not null, user_id text not null, create_at timestamp without time zone default now(), primary key (id) );"
  }
}
EOF
```

```bash
curl -0 -v -X POST http://localhost:18081/v1/query \
-H "x-hasura-admin-secret: myadminsecretkey" \
-H 'Content-Type: application/json; charset=utf-8' \
-d @- <<'EOF'
{
  "type": "track_table",
  "args": "murmurs"
}
EOF
```
