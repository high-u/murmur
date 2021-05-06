CREATE TABLE public.murmurs (
    id integer NOT NULL,
    user_id integer NOT NULL,
    text text NOT NULL,
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    room_key text NOT NULL
);

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    email text
);

CREATE TABLE public.rooms (
    id integer NOT NULL,
    key text NOT NULL,
    name text NOT NULL,
    create_at timestamp without time zone DEFAULT now() NOT NULL
);
