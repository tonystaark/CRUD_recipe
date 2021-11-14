import React from 'react';
import Home from './pages/Home';
import Questions from './pages/Recipes';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css';
import Recipes from './pages/Recipes';
import NewRecipe from './pages/NewRecipe';
import RecipeDetails from './pages/RecipeDetails';
import PageNotFound from './pages/PageNotFound';

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="main-layout">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create-recipe' element={<NewRecipe/>} />
            <Route path='/recipes' element={<Recipes/>} />
            <Route path='/recipes/:id' element={<RecipeDetails/>} />
            <Route element={<PageNotFound/>} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
