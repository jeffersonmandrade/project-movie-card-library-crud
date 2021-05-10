import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EditMovie from './pages/EditMovie';
import NewMovie from './pages/NewMovie';
import MovieList from './pages/MovieList';
import NotFound from './pages/NotFound';
import MovieDetails from './pages/MovieDetails';
import './App.css';

function App() {
  return (
    <div>
      Movie Card Library Crud
      <BrowserRouter>
        <Switch>
          <Route path="/movies/:id/edit" component={ EditMovie } />
          <Route path="/movies/new" component={ NewMovie } />
          <Route path="/movies/:id" render={ (props) => <MovieDetails { ...props } /> } />
          <Route exact path="/" component={ MovieList } />
          <Route path="" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
