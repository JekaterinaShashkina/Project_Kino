const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleCheck');

router.post('/movies', authMiddleware, checkRole(['Admin']),    /* #swagger.tags = ['Movie'] #swagger.description = "Post new movie" #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
    "title": "string",
    "duration": "int",
    "releasedate": "date",
    "rating": "decimal",
    "status": "string",
    "movielanguage": "string",
    "categoryids": [1, 2]
}
}*/ 
    movieController.createMovie);
router.get('/movies', /* #swagger.tags = ['Movie'] #swagger.description = "Get all movies"  */ 
    movieController.getAllMovies);

router.get('/movies/search',  /* #swagger.tags = ['Movie'] #swagger.description = "Get movie by title, category or reliase"  */  
    movieController.searchMovies);


router.get('/movies/:id', /* #swagger.tags = ['Movie'] #swagger.description = "Get movie by ID"  */ 
    movieController.getMovieById);
router.put('/movies/:id', authMiddleware, checkRole(['Admin']),/* #swagger.tags = ['Movie'] #swagger.description = "Update movie" #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: {
    "title": "string",
    "duration": "int",
    "releasedate": "date",
    "rating": "decimal",
    "status": "string",
    "movielanguage": "string",
    "categoryids": [1, 2]
}
}*/ 
    movieController.updateMovie);
// router.delete('/movies/:id', authMiddleware, checkRole(['Admin']), /* #swagger.tags = ['Movie'] #swagger.description = "Delete movie"  */
//     movieController.deleteMovie);





module.exports = router;
