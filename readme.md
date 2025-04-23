npm install jsonwebtoken bcryptjs

npx nodemon index.js

{
  "username": "user",
  "useremail": "1@e.11",
  "password": "123"
}

Надя 1. сделать проверку на существование емайла, без повторов. уникальный.

{
  "username": "user",
  "useremail": "1@e.11",
  "password": "123"
}

admin role

{
  "username": "admin",
  "useremail": "1@e.11",
  "password": "123"
}


http://localhost:3001/remove-role
http://localhost:3001/add-role

{
  "userid": 5,
  "roleid": 3
}


ALTER TABLE kino.ticket
ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'active';

ALTER TABLE kino.ticket
ADD CONSTRAINT ticket_status_check 
CHECK (status IN ('active', 'used', 'refunded'));