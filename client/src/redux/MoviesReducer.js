const initialMoviesState = {
    movies: []
    
  };

  const applyMoviesChange = (state = initialMoviesState, action) => {
    switch (action.type) {
      case 'LOADMOVIE':
        return { ...state, movies: action.payload };

      case 'EDITMOVIE': {
          const movies = [...state.movies];

          const movieIndex = state.movies.findIndex(
            (movie) => movie._id === action.payload._id
            );
          
            movies[movieIndex] = action.payload
            
          return { ...state, movies : movies};
        }

      case 'ADDMOVIE': {
          return { ...state, movies: [...state.movies, action.payload] };
        }

      case 'DELETEMOVIE': {
          const movies = state.movies.filter(
            (movie) => movie._id !== action.payload._id
          );
          return { ...state, movies };
        }
  
      default:
        return state;
    }
  };

  export default applyMoviesChange