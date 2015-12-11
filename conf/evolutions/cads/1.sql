# Users schema
 
# --- !Ups
 
CREATE TABLE "User"(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    address VARCHAR(255)
);

INSERT INTO "User" (name, address) VALUES ('John Doe', '200 King Street East');
INSERT INTO "User" (name, address) VALUES ('Jane Doe', '100 King Street East');
INSERT INTO "User" (name, address) VALUES ('Vince Doe', '50 Queen Street West');
INSERT INTO "User" (name, address) VALUES ('Scott Doe', '100 Yonge Street');
 
# --- !Downs
 
DROP TABLE "User";
