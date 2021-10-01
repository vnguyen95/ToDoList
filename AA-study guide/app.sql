CREATE TABLE public.Tasks (
	"id" serial NOT NULL,
	"item" VARCHAR NOT NULL,
	"created_at" DATE NOT NULL,
	CONSTRAINT "Tasks_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


INSERT INTO public.Tasks VALUES (3, 'Hello Universe', (SELECT CURRENT_DATE))