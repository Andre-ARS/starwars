import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

// const LOADING_TIMEOUT = 6000;

function PlanetProvider({ children }) {
  const [data, setData] = useState();
  const [filterByName, setfilterByName] = useState('');
  const [filterByNumericValues, setfilterByNumericValues] = useState('');
  const [sort, setSort] = useState('');
  const [multFilter, setMultfilter] = useState([]);
  const [loading] = useState(true);
  const [dropSort, setdropSort] = useState(false);
  const [dropFilter, setdropFilter] = useState(false);

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const result = await response.json();

      setData(result);
    };

    fetchPlanets();
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, LOADING_TIMEOUT);
  // });

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

  const handleClick = ({ target }, type) => {
    if (['P', 'path', 'svg', 'DIV'].some((tag) => tag === target.tagName)) {
      if (type === 'sort') {
        const sortForm = document.querySelector('.style_sort_form__1y499');

        sortForm.style.height = sortForm.style.height !== '227px' ? '227px' : '0';
        setdropSort(!dropSort);
      } else {
        const filter = document.querySelector('.style_filter_form__CaBsp');

        filter.style.height = filter.style.height !== '227px' ? '227px' : '0';
        setdropFilter(!dropFilter);
      }
    }
  };

  const contextValue = {
    data,
    filterByName,
    filterByNumericValues,
    multFilter,
    sort,
    loading,
    dropFilter,
    dropSort,
    setfilterByName,
    setfilterByNumericValues,
    setMultfilter,
    setSort,
    getFilteredValues,
    setdropSort,
    setdropFilter,
    handleClick,
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
