require('dotenv').config();
const express = require('express');
const app = express();

console.log("JWT_SECRET:", process.env.JWT_SECRET); 
require('./swagger')(app); 

const authRoutes = require('./routes/auth.routes');
const catRoutes = require('./routes/cat.routes')
const hallRoutes = require('./routes/hall.routes')
const movieRoutes = require('./routes/movie.routes');
const placeRoutes = require('./routes/place.routes');



app.use(express.json()); 
app.use('/', authRoutes);
app.use('/', catRoutes);
app.use('/', hallRoutes);
app.use('/', movieRoutes);
app.use('/', placeRoutes);


app.listen(3001, () => {
  console.log('port 3001');
});