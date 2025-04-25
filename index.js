require('dotenv').config();
const express = require('express');
const app = express();

console.log("JWT_SECRET:", process.env.JWT_SECRET); 
require('./swagger')(app); 

const authRoutes = require('./routes/auth.routes');
const catRoutes = require('./routes/cat.routes')
const hallRoutes = require('./routes/hall.routes')
const movieRoutes = require('./routes/movie.routes');
const sessionRoutes = require('./routes/session.routes')
const placeRoutes = require('./routes/place.routes');
const priceRoutes = require('./routes/price.routes');

const ticketRoutes = require('./routes/ticket.routes');
const reportRoutes = require('./routes/report.routes');






app.use(express.json()); 
app.use('/', authRoutes);
app.use('/', catRoutes);
app.use('/', hallRoutes);
app.use('/', movieRoutes);

app.use('/', sessionRoutes);
app.use('/', placeRoutes);
app.use('/', priceRoutes);
app.use('/',ticketRoutes);
app.use('/', reportRoutes);




app.listen(3001, () => {
  console.log('port 3001');
});