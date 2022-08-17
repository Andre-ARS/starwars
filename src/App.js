import React, { useContext } from 'react';
import './App.css';
import Filter from './components/Filter';
import Table from './components/Table';
import PlanetContext from './context/PlanetContext';
import Loading from './components/Loading';

function App() {
  const { data } = useContext(PlanetContext);
  return (
    data
      ? (
        <>
          <Filter />
          <Table />
        </>)
      : (<Loading />)
  );
}

export default App;
