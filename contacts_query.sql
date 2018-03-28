CREATE TABLE contacts(
id serial PRIMARY KEY, 
firstname character varying(200) NOT NULL,
lastname character varying(200) NOT NULL,
email character varying(200) NOT NULL,
phone_number character(10) NOT NULL
);