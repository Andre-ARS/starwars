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
    multFilter } = useContext(PlanetContext);

  const [numFilter, setNumFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const usedColumns = multFilter.map(({ column }) => column);

  useEffect(() => {
    setNumFilter({
      ...numFilter,
      column: NUM_FILTER_OPT.filter((optt) => !usedColumns
        .some((column) => optt === column))[0],
    });
  }, [multFilter]);

  const handleChange = ({ target: { name, value } }) => {
    setNumFilter({
      ...numFilter,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setfilterByNumericValues({ ...numFilter });
    setMultfilter([...multFilter, { ...numFilter }]);
    setNumFilter({ ...numFilter, value: 0 });
  };

  return (
    <header>
      <input
        type="text"
        value={ filterByName }
        onChange={ ({ target: { value } }) => setfilterByName(value) }
        data-testid="name-filter"
      />
      <form onSubmit={ handleSubmit }>
        <label htmlFor="column">
          Coluna
          <select
            data-testid="column-filter"
            id="column"
            name="column"
            value={ numFilter.column }
            onChange={ handleChange }
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
            onChange={ handleChange }
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
          onChange={ handleChange }
        />
        <button
          type="submit"
          data-testid="button-filter"
        >
          Filtrar

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
