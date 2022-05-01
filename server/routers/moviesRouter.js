const express = require('express');
const moviesBLL = require('../BLL/moviesBLL')

const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
      const movies = await moviesBLL.getAllMovies();
      return res.json(movies);
    } catch (error) {
      return res.json(error.message);
    }
  });
  

  router.route('/:id').get(async (req, res) => {
    try {
      const { id } = req.params;
      const movie = await moviesBLL.getMovieById(id);
      return res.json(movie);
    } catch (error) {
      return res.json(error.message);
    }
  });

  router.route('/').post(async (req, res) => {
    try {
      const newMovie = req.body;
      const result = await moviesBLL.addMovie(newMovie)
      return res.json(result);
    } catch (error) {
      return res.json(error);
    }
  });
  
 
router.route('/:id').put(async (req, res) => {
    try {
      const { id } = req.params;
      const updatedMovie = req.body;
      const result = await moviesBLL.updateMovie(id, updatedMovie);
      return res.json(result);
    } catch (error) {
      return res.json(error);
    }
  });
  

router.route('/:id').delete(async (req, res) => {
    try {
      const { id } = req.params;
      const result = await moviesBLL.deleteMovie(id)
      return res.json(result);
    } catch (error) {
      return res.json(error);
    }
  });

module.exports = router