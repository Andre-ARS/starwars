import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

function PlanetProvider({ children }) {
  const [data, setData] = useState();
  const [filterByName, setfilterByName] = useState('');
  const [filterByNumericValues, setfilterByNumericValues] = useState('');
  const [multFilter, setMultfilter] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const result = await response.json();

      setData(result);
    };

    fetchPlanets();
  }, []);

  const contextValue = {
    data,
    filterByName,
    filterByNumericValues,
    multFilter,
    setfilterByName,
    setfilterByNumericValues,
    setMultfilter,
  };

  return (
    <PlanetContext.Provider value={ contextValue }>
      { children }
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.shape(),
}.isRequired;

export default PlanetProvider;
