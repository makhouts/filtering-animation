import { useEffect, useState } from 'react';
import './App.css';
import { Filter } from './Filter';
import { Movie } from './Movie';
import { motion, AnimatePresence } from "framer-motion";

function App() {

  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);

  

  useEffect(() => fetchData(), []);

  const fetchData = async () => {
    const data = await fetch(
      "Https://api.themoviedb.org/3/movie/popular?api_key=d5c35e51c81488b19da7c1f572507a3d&language=en-US&page=1"
    );
    const movies = await data.json();
    setPopular(movies.results)
    setFiltered(movies.results)
  };

  return (
    <div className="App">
      <Filter
        popular={popular}
        setFiltered={setFiltered}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
      />
      <motion.div layout className="popular">
        <AnimatePresence>
          {filtered.map((movie) => {
            return <Movie key={movie.id} movie={movie} />;
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
