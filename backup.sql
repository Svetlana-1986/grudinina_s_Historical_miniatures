--
-- PostgreSQL database dump
--

\restrict JDtis6SQJfvEFk3L8vJlhCM75o3edmg5GcjJKZ2hWMn8D2upbb2eRyRpONvvu9I

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: cardnick
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO cardnick;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: cardnick
--

COMMENT ON SCHEMA public IS '';


--
-- Name: HistoricalPeriod; Type: TYPE; Schema: public; Owner: cardnick
--

CREATE TYPE public."HistoricalPeriod" AS ENUM (
    'ANCIENT',
    'MIDDLE_AGES',
    'NAPOLEONIC_WARS',
    'WORLD_WAR_1',
    'WORLD_WAR_2',
    'FANTASY',
    'OTHER'
);


ALTER TYPE public."HistoricalPeriod" OWNER TO cardnick;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Card; Type: TABLE; Schema: public; Owner: cardnick
--

CREATE TABLE public."Card" (
    id text NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "authorId" text NOT NULL,
    "historicalPeriod" public."HistoricalPeriod" NOT NULL,
    "coverImage" text,
    "coverImageHero" text,
    "coverImagePreview" text
);


ALTER TABLE public."Card" OWNER TO cardnick;

--
-- Name: CardImage; Type: TABLE; Schema: public; Owner: cardnick
--

CREATE TABLE public."CardImage" (
    id text NOT NULL,
    "imageUrl" text NOT NULL,
    "position" integer DEFAULT 0 NOT NULL,
    "cardId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."CardImage" OWNER TO cardnick;

--
-- Name: Session; Type: TABLE; Schema: public; Owner: cardnick
--

CREATE TABLE public."Session" (
    id text NOT NULL,
    token text NOT NULL,
    "userId" text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Session" OWNER TO cardnick;

--
-- Name: User; Type: TABLE; Schema: public; Owner: cardnick
--

CREATE TABLE public."User" (
    id text NOT NULL,
    nick text NOT NULL,
    "passwordHash" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "displayName" text NOT NULL
);


ALTER TABLE public."User" OWNER TO cardnick;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: cardnick
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO cardnick;

--
-- Data for Name: Card; Type: TABLE DATA; Schema: public; Owner: cardnick
--

COPY public."Card" (id, slug, title, description, "createdAt", "authorId", "historicalPeriod", "coverImage", "coverImageHero", "coverImagePreview") FROM stdin;
bc66052c-c3ed-49d7-8ac9-64b0853ca578	podvig-generala-vasiliya-grigorevicha-kosteneckogo-010f008f	"Подвиг генерала Василия Григорьевича Костенецкого"	Бородинское сражение: "Подвиг генерала Василия Григорьевича Костенецкого".\nМасштаб: 1/32.\nСкульптор: Владимир Данилов.\nХудожник: Евгений Дравских.\nРасписано для проекта "Русский раритет". 	2026-06-19 10:56:49.553	f393b06a-12e3-4cfe-b0d1-df9c6b211b0b	NAPOLEONIC_WARS	/uploads/cards/1781866606658-75wz4dxlopd.jpg	/uploads/cards/hero/1781866606658-75wz4dxlopd.webp	/uploads/cards/preview/1781866606658-75wz4dxlopd.webp
a08fa8f4-f5ad-4216-ade1-14b9ae8bd0c1	legat-legatus-ead1543b	Легат (Legatus)	Легат (Legatus) от Medieval Forge Miniatures.\nМасштаб: 1/24\nСкульптор: Никита Аблеев\nХудожник: Евгений Дравских.\nРасписано для боксарта.\n	2026-06-19 11:03:29.091	f393b06a-12e3-4cfe-b0d1-df9c6b211b0b	ANCIENT	/uploads/cards/1781867006865-f7vuoow0l5f.jpg	/uploads/cards/hero/1781867006865-f7vuoow0l5f.webp	/uploads/cards/preview/1781867006865-f7vuoow0l5f.webp
cc65da37-5421-4395-b021-6abbb3aeee2e	gibel-generala-u.-ponsonbi-7c74133f	"Гибель генерала У. Понсонби"	Драматический эпизод Ватерлоо: "Гибель генерала У.Понсонби"\nСкульптор: Владимиром Даниловым.\nХудожник: Евгений Дравских.\nМасштаб: 1/35\nРасписано для проекта "Русский раритет".	2026-06-19 11:13:28.019	f393b06a-12e3-4cfe-b0d1-df9c6b211b0b	NAPOLEONIC_WARS	/uploads/cards/1781867604240-tyzhro1z7z9.jpg	/uploads/cards/hero/1781867604240-tyzhro1z7z9.webp	/uploads/cards/preview/1781867604240-tyzhro1z7z9.webp
d397b84d-a583-42b8-b374-8fc028dd4f45	gladiator-murmillon-1f7c7c06	Гладиатор "Мурмиллон"	Название: Гладиатор "Мурмиллон".\nПроизводитель: Medieval Forge Miniatures.\nСкульптор: Артем Байдушин.\nХудожник: Евгений Дравских.\nМасштаб 1/24.\nРасписано для боксарта.\n	2026-06-19 11:31:58.536	f393b06a-12e3-4cfe-b0d1-df9c6b211b0b	ANCIENT	/uploads/cards/1781868713819-acoyrnygnic.jpg	/uploads/cards/hero/1781868713819-acoyrnygnic.webp	/uploads/cards/preview/1781868713819-acoyrnygnic.webp
\.


--
-- Data for Name: CardImage; Type: TABLE DATA; Schema: public; Owner: cardnick
--

COPY public."CardImage" (id, "imageUrl", "position", "cardId", "createdAt") FROM stdin;
cmqktdf9u00007kbowe1b46is	/uploads/cards/1781866607153-3dsw7f4mmrh.jpg	0	bc66052c-c3ed-49d7-8ac9-64b0853ca578	2026-06-19 10:56:49.553
cmqktdf9v00017kbohtgqotze	/uploads/cards/1781866607699-cepmgldfkjg.jpg	1	bc66052c-c3ed-49d7-8ac9-64b0853ca578	2026-06-19 10:56:49.553
cmqktdf9v00027kbol22u8yhw	/uploads/cards/1781866608204-ou65tn0vx4.jpg	2	bc66052c-c3ed-49d7-8ac9-64b0853ca578	2026-06-19 10:56:49.553
cmqktdf9v00037kbo0i5pbccl	/uploads/cards/1781866608692-zqt6l2nevk.jpg	3	bc66052c-c3ed-49d7-8ac9-64b0853ca578	2026-06-19 10:56:49.553
cmqktlzk200047kbov69cy4cs	/uploads/cards/1781867007106-t97trp7huo.jpg	0	a08fa8f4-f5ad-4216-ade1-14b9ae8bd0c1	2026-06-19 11:03:29.091
cmqktlzk200057kbo4vd3swku	/uploads/cards/1781867007515-73iy0reehco.jpg	1	a08fa8f4-f5ad-4216-ade1-14b9ae8bd0c1	2026-06-19 11:03:29.091
cmqktlzk200067kboexvs7iba	/uploads/cards/1781867008020-utbxdw360fm.jpg	2	a08fa8f4-f5ad-4216-ade1-14b9ae8bd0c1	2026-06-19 11:03:29.091
cmqktlzk200077kboqqprn3o9	/uploads/cards/1781867008755-wb6enriwpwm.jpg	3	a08fa8f4-f5ad-4216-ade1-14b9ae8bd0c1	2026-06-19 11:03:29.091
cmqktytoz00087kboaczo4je7	/uploads/cards/1781867604796-syvc6vsjjve.jpg	0	cc65da37-5421-4395-b021-6abbb3aeee2e	2026-06-19 11:13:28.019
cmqktytoz00097kbo0odfepju	/uploads/cards/1781867605475-85eyx4j0jua.jpg	1	cc65da37-5421-4395-b021-6abbb3aeee2e	2026-06-19 11:13:28.019
cmqktytoz000a7kbojq5vgqsa	/uploads/cards/1781867606322-nhfz9vdgav.jpg	2	cc65da37-5421-4395-b021-6abbb3aeee2e	2026-06-19 11:13:28.019
cmqktytoz000b7kbozaldwuqu	/uploads/cards/1781867607019-3t4l5bd1ujq.jpg	3	cc65da37-5421-4395-b021-6abbb3aeee2e	2026-06-19 11:13:28.019
cmqkummko000c7kbom389q6z0	/uploads/cards/1781868714931-4cb04wem04j.jpg	0	d397b84d-a583-42b8-b374-8fc028dd4f45	2026-06-19 11:31:58.536
cmqkummko000d7kbor1xj4rbo	/uploads/cards/1781868716057-4qr5hlvkryp.jpg	1	d397b84d-a583-42b8-b374-8fc028dd4f45	2026-06-19 11:31:58.536
cmqkummko000e7kbon4nijlx9	/uploads/cards/1781868716807-ove34psszft.jpg	2	d397b84d-a583-42b8-b374-8fc028dd4f45	2026-06-19 11:31:58.536
cmqkummko000f7kbosjc92e5f	/uploads/cards/1781868717535-87gltg09aib.jpg	3	d397b84d-a583-42b8-b374-8fc028dd4f45	2026-06-19 11:31:58.536
\.


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: cardnick
--

COPY public."Session" (id, token, "userId", "expiresAt", "createdAt") FROM stdin;
ebf38779-f50b-4cca-906a-378d790e0533	8d5bfc4433f3699df7c7ab83ef30f6a04a2e02e6a4fc4edf2174e84dbba14d7e53ff5a897c7fe72da1040065a3c4ac5a	f393b06a-12e3-4cfe-b0d1-df9c6b211b0b	2026-07-19 13:35:35.446	2026-06-19 13:35:35.447
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: cardnick
--

COPY public."User" (id, nick, "passwordHash", "createdAt", "displayName") FROM stdin;
f393b06a-12e3-4cfe-b0d1-df9c6b211b0b	7-thjudge	$2b$10$TRSVtOStMJ5zuLMLX4DQJe1F9WiCqGgwlRyZSDaJsCxj7fq5EJrCG	2026-06-12 12:06:02.581	Evgeniy
ba289a4e-384a-493c-9271-10e9a2563112	lana	$2b$10$UP.OghA8ODwcOl7yqzrAUOyI.d6AKa7Sfiy8dUsv8Q8ZnAuqAmZKy	2026-06-18 07:31:51.784	Svetlana
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: cardnick
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
c5cda11c-dcc5-479e-ac7c-2100175306ef	5c748da628503cd70a6aa0aca7f0c5e533b2c74326fe58e3ccc3e362df917c2c	2026-05-27 11:34:39.807809+03	20260527083439_init	\N	\N	2026-05-27 11:34:39.524644+03	1
d9275b2b-1c5d-4128-906d-d18eddcb5f63	8a964fb88ec1ff60093e427e8d70bcd56d6abc3952948f9900af50e4b29fa180	2026-05-28 11:38:21.527845+03	20260528083821_add_created_at_to_card	\N	\N	2026-05-28 11:38:21.479496+03	1
dcc0d389-6936-4bcc-ae7e-6da032ac9c62	0fba4ebd4fe5e919b8b8bae3146a751ee55df9594d260f08e1ce5b249d07d3bb	2026-05-30 10:14:07.264993+03	20260530071407_add_user_model	\N	\N	2026-05-30 10:14:07.159421+03	1
0f9e98f1-aaa8-4f6f-8dbd-2b15977148bf	edfdb0ec7e94c253dab1c5512b6a4bf2feccf9c1c4de0e6828a38122d562f657	2026-06-01 16:14:37.329247+03	20260601131437_add_sessions	\N	\N	2026-06-01 16:14:37.25664+03	1
6da16f3b-5949-4dca-a9c8-451ce6412153	51aeff6dd433f702f919a528f0ffe8458c4803ee9ebc29e1ba8ba6e97d1ef2e7	2026-06-03 11:09:37.849762+03	20260603080937_add_display_name	\N	\N	2026-06-03 11:09:37.832204+03	1
188af0aa-f2b1-4511-bf61-7bddead136e6	af56ee43ea1b655490912fe010e6ac76c773fd0b6a05da63487d2c0105efd4d1	2026-06-03 12:33:07.222226+03	20260603093307_required_display_name	\N	\N	2026-06-03 12:33:07.132838+03	1
88b9d933-274a-4623-be36-9d09c4530292	4b6d4deacbce6615735fd0c75737fe6ce8b7fa86a818cb263edae1b2cb1e757f	2026-06-03 13:14:29.794619+03	20260603101429_changed_card_user	\N	\N	2026-06-03 13:14:29.782893+03	1
12dc25ff-f51d-4395-b245-f96f89644a96	25caf02fc687a3069224ea7037712fe6ba2e651d6b8179ec51ace0afb3e77f34	2026-06-05 12:50:48.742916+03	20260605095048_remove_author_nick_fields	\N	\N	2026-06-05 12:50:48.524234+03	1
6dbab48f-a706-41e4-aa5f-fa2c0fa9d5d3	f9df0a9c75b057a94656c333ff77433318d360c69573277e1abe2252b10777ee	2026-06-05 19:48:31.569847+03	20260605164831_add_historical_period_enum	\N	\N	2026-06-05 19:48:31.513624+03	1
4a496816-cc71-466e-86fa-73785caed2e9	d2eb08eb199990692fd7f3174147405fbd8ebcf1959bc4d441e34283dc88514a	2026-06-13 18:06:19.169785+03	20260613150619_add_card_cover_image	\N	\N	2026-06-13 18:06:19.157495+03	1
2efb4906-8902-4135-a4be-8666a635dde0	324f68958d31c89eebbb9e63498691429fc97e8272dcc6e20efa566e51e971e0	2026-06-13 18:09:36.302764+03	20260613150936_card_image	\N	\N	2026-06-13 18:09:36.241084+03	1
a0a42aca-d7fa-4069-8fcd-468c8434ba7d	2218c94f72fbf08b8d5e9cf6f7670970989e2c7b74698ff229984d573597a880	2026-06-17 12:01:10.12896+03	20260617090109_add_cover_versions	\N	\N	2026-06-17 12:01:10.0734+03	1
\.


--
-- Name: CardImage CardImage_pkey; Type: CONSTRAINT; Schema: public; Owner: cardnick
--

ALTER TABLE ONLY public."CardImage"
    ADD CONSTRAINT "CardImage_pkey" PRIMARY KEY (id);


--
-- Name: Card Card_pkey; Type: CONSTRAINT; Schema: public; Owner: cardnick
--

ALTER TABLE ONLY public."Card"
    ADD CONSTRAINT "Card_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: cardnick
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: cardnick
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: cardnick
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Card_slug_key; Type: INDEX; Schema: public; Owner: cardnick
--

CREATE UNIQUE INDEX "Card_slug_key" ON public."Card" USING btree (slug);


--
-- Name: Session_token_idx; Type: INDEX; Schema: public; Owner: cardnick
--

CREATE INDEX "Session_token_idx" ON public."Session" USING btree (token);


--
-- Name: Session_token_key; Type: INDEX; Schema: public; Owner: cardnick
--

CREATE UNIQUE INDEX "Session_token_key" ON public."Session" USING btree (token);


--
-- Name: User_nick_key; Type: INDEX; Schema: public; Owner: cardnick
--

CREATE UNIQUE INDEX "User_nick_key" ON public."User" USING btree (nick);


--
-- Name: CardImage CardImage_cardId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cardnick
--

ALTER TABLE ONLY public."CardImage"
    ADD CONSTRAINT "CardImage_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES public."Card"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Card Card_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cardnick
--

ALTER TABLE ONLY public."Card"
    ADD CONSTRAINT "Card_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cardnick
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: cardnick
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict JDtis6SQJfvEFk3L8vJlhCM75o3edmg5GcjJKZ2hWMn8D2upbb2eRyRpONvvu9I

