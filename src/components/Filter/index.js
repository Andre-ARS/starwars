import React, { useContext, useState, useEffect } from 'react';
import PlanetContext from '../../context/PlanetContext';

const NUM_FILTER_OPT = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];
const COMP_FILTER_OPT = ['maior que', 'menor que', 'igual a'];

export default function Filter() {
  const {
    filterByName,
    setfilterByName,
    setfilterByNumericValues,
    setMultfilter,
    multFilter,
    setSort } = useContext(PlanetContext);

  const [numFilter, setNumFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [order, setOrder] = useState({
    columnSort: 'population',
    sortOrder: 'ASC',
  });

  const usedColumns = multFilter.map(({ column }) => column);

  useEffect(() => {
    setNumFilter({
      ...numFilter,
      column: NUM_FILTER_OPT.filter((optt) => !usedColumns
        .some((column) => optt === column))[0],
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multFilter]);

  const filterChange = ({ target: { name, value } }) => {
    setNumFilter({
      ...numFilter,
      [name]: value,
    });
  };

  const orderChange = ({ target: { name, value } }) => {
    setOrder({
      ...order,
      [name]: value,
    });
  };
  const handleSubmit = (event, name) => {
    event.preventDefault();

    if (name === 'filter') {
      setfilterByNumericValues({ ...numFilter });
      setMultfilter([...multFilter, { ...numFilter }]);
      setNumFilter({ ...numFilter, value: 0 });
    } else {
      setSort({ ...order });
    }
  };

  return (
    <header>
      <input
        type="text"
        value={ filterByName }
        onChange={ ({ target: { value } }) => setfilterByName(value) }
        data-testid="name-filter"
      />
      <form onSubmit={ (e) => handleSubmit(e, 'filter') }>
        <label htmlFor="column">
          Coluna
          <select
            data-testid="column-filter"
            id="column"
            name="column"
            value={ numFilter.column }
            onChange={ filterChange }
          >
            { NUM_FILTER_OPT.filter((optt) => !usedColumns
              .some((column) => optt === column))
              .map((opt) => (
                <option value={ opt } key={ opt }>{ opt }</option>
              ))}
          </select>
        </label>
        <label htmlFor="comparison">
          Operador
          <select
            data-testid="comparison-filter"
            id="comparison"
            name="comparison"
            value={ numFilter.comparison }
            onChange={ filterChange }
          >
            { COMP_FILTER_OPT.map((opt) => (
              <option value={ opt } key={ opt }>{ opt }</option>
            )) }
          </select>
        </label>
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          value={ numFilter.value }
          onChange={ filterChange }
        />
        <button
          type="submit"
          data-testid="button-filter"
        >
          Filtrar

        </button>
      </form>
      <form onSubmit={ (e) => handleSubmit(e, 'sort') }>
        <label htmlFor="column_sort">
          Ordenar
          <select
            data-testid="column-sort"
            id="column_sort"
            name="columnSort"
            value={ numFilter.column }
            onChange={ orderChange }
          >
            { NUM_FILTER_OPT.map((opt) => (
              <option value={ opt } key={ opt }>{ opt }</option>
            ))}
          </select>
        </label>
        <label htmlFor="asc">
          <input
            type="radio"
            name="sortOrder"
            value="ASC"
            data-testid="column-sort-input-asc"
            onClick={ orderChange }
            id="asc"
          />
          Ascendente
        </label>
        <label htmlFor="desc">
          <input
            type="radio"
            name="sortOrder"
            value="DESC"
            data-testid="column-sort-input-desc"
            onClick={ orderChange }
            id="desc"
          />
          Descendente
        </label>
        <button
          type="submit"
          data-testid="column-sort-button"
        >
          Ordenar
        </button>
      </form>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => setMultfilter([]) }
      >
        Remover Filtros
      </button>
    </header>
  );
}
