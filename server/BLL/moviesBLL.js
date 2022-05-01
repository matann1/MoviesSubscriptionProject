const movie = require('../model/movieModel');
const sub = require('../BLL/subscriptionsBLL')

const getAllMovies = () => {
    return new Promise((resolve, reject) => {
        movie.find({}, (err, movies) => {
        if (err) {
          reject(err);
        }
        resolve(movies);
      });
    });
  };
  
  const getMovieById = (id) => {
    return new Promise((resolve, reject) => {
      movie.findById(id, (err, mov) => {
        if (err) {
          reject(err);
        }
        resolve(mov);
      });
    });
  };

  const addMovie = (newMovie) => {
    return new Promise((resolve, reject) => {
      const mov = new movie(newMovie);
      mov.save((err) => {
        if (err) {
          reject(err);
        }
        resolve('Added Successfully');
      });
    });
  };

  const updateMovie = (id, movieToUpdate) => {
    return new Promise((resolve, reject) => {
      movie.findByIdAndUpdate(id, movieToUpdate, (err) => {
        if (err) {
          reject(err);
        }
        resolve('Updated Successfully');
      });
    });
  };
  
  const deleteMovie = (id) => {
    return new Promise((resolve, reject) => {
      movie.findByIdAndDelete(id, async (err) => {
        if (err) {
          reject(err);
        }
        let resp = await sub.deleteSubscriptionsMovie(id)
        console.log(resp)
        resolve('Deleted Successfully');
      });
    });
  };


module.exports = { getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie }
