const doLoadMovies = (movies) => {
    return {
      type: 'LOADMOVIE',
      payload: movies,
    };
  };

const doEditMovie = (movie) => {
    return {
      type: 'EDITMOVIE',
      payload: movie,
    };
  };
  
const doAddMovie = (movie) => {
    return {
      type: 'ADDMOVIE',
      payload: movie,
    };
  };

  const doDeleteMovie = (movie) => {
    return {
      type: 'DELETEMOVIE',
      payload: movie,
    };
  };
  
  
  export  { doLoadMovies, doEditMovie, doAddMovie, doDeleteMovie }