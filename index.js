require('dotenv').config();
const express = require('express');
const app = express();

console.log("JWT_SECRET:", process.env.JWT_SECRET); 

require('./swagger')(app); 

const authRoutes = require('./routes/auth.routes');




app.use(express.json()); 
app.use('/', authRoutes);

app.listen(3001, () => {
  console.log('port 3001');
});