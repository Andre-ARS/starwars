import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

function PlanetProvider({ children }) {
  const [data, setData] = useState();
  const [filterByName, setfilterByName] = useState('');
  const [filterByNumericValues, setfilterByNumericValues] = useState('');
  const [sort, setSort] = useState('');
  const [multFilter, setMultfilter] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const result = await response.json();

      setData(result);
    };

    fetchPlanets();
  }, []);

  const getFilteredValues = (arr) => {
    let filter = arr;
    multFilter.map(({ column, comparison, value }) => {
      if (comparison === 'maior que') {
        filter = filter.filter((planet) => parseFloat(planet[column]) > value);
      } else if (comparison === 'menor que') {
        filter = filter.filter((planet) => parseFloat(planet[column]) < value);
      } else {
        filter = filter.filter((planet) => planet[column] === value);
      }
      return filter;
    });
    return filter;
  };

  const contextValue = {
    data,
    filterByName,
    filterByNumericValues,
    multFilter,
    sort,
    setfilterByName,
    setfilterByNumericValues,
    setMultfilter,
    setSort,
    getFilteredValues,
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
