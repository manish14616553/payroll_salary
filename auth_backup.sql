--
-- PostgreSQL database dump
--

-- Dumped from database version 14.11 (Ubuntu 14.11-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.11 (Ubuntu 14.11-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    salary text,
    department character varying(255) NOT NULL,
    key text,
    iv text
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees (id, name, salary, department, key, iv) FROM stdin;
1	Manish	$2b$10$bh.OiDVh7YwFKkNrMweHPOt33WqEBfxdoSrr9QFV9pPy1tV8jvUx6	it	\N	\N
2	ritu	$2b$10$yb1XPvFqX.H8oa6iRA0ObeZRmAHYZYS5HcGe5Fu9YvZV8kjgJTZ/.	IT	\N	\N
3	ankur	$2b$10$U1j14OpHD/K6K8zSuznUkuQXlLE/Za7346Ogd5OZEzkdMAVPMm2c.	IT	\N	\N
4	jatin	$2b$10$QSPh1.Q2bhmiI1.D/ZE1x.sJ63fScxFSasjV22hrb/ZAcH4gD69xy	IT	\N	\N
5	oiuytgfdsz	$2b$10$Z7dekeyakv/AF9SKBFbH1eMiFCaHiJ23apQ9G85gGN/Km8q11uCF.	IT	\N	\N
6	oiuytgfdszf	$2b$10$JKTHNlzEoEDTwcRRilwHmuY7/46IdlJrKE4RD197V7jKvLm4JWtsC	IT	\N	\N
7	oiujhgv	$2b$10$0yIkSu67AQLbSGNuDfbu3e7HniUKkSf91lH7rX4C33zddsVS6toh6	IT	\N	\N
8	oiujhgvre	c270cc6b8b8b571bf302714fa25a4670	IT	b49ce5d328dc714e7921c1d1ab1dc589b95ead7e57690bb0aa620c73254393ed	eefa98a6b72f2618c186ff04664f1ff7
9	Brijesh	535f1eafabdb079e22debbe7e7517e9b	Redmine	2ee4d7459e5842b319dbed2d8234eab8b0ea01d38f18f0f8e4be433d53621bc4	29d8df968e5bf7d96bc3c45e547ed176
10	Brijesh	d5b775d21433ea748d339312f6bb951f	Redmine	896e886e4a266f01bea54578a60687289f810deb05d43c18ed5fe525c0d30c43	d713a8ee7135a4e35a562394d694d237
\.


--
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- Name: TABLE employees; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.employees TO newdata;


--
-- PostgreSQL database dump complete
--

