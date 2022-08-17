/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-max-depth */
import React, { useContext, useState, useEffect } from 'react';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import PlanetContext from '../../context/PlanetContext';
import style from './style.module.css';

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
    setSort,
    handleClick,
    dropFilter,
    dropSort } = useContext(PlanetContext);

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
    <header className={ style.header_container }>
      <div className={ style.filters_container }>
        <button
          type="submit"
          data-testid="button-filter"
          onClick={ (e) => handleSubmit(e, 'filter') }
        >
          Filtrar

        </button>
        <div
          className={ style.column_filter }
          onClick={ (e) => handleClick(e, 'filter') }
        >
          <p>
            Filtrar por Coluna
            { dropFilter ? <GoTriangleUp /> : <GoTriangleDown /> }
          </p>
          <form className={ style.filter_form }>
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
          </form>
        </div>
      </div>
      <input
        type="text"
        value={ filterByName }
        onChange={ ({ target: { value } }) => setfilterByName(value) }
        data-testid="name-filter"
        className={ style.name_filter }
        placeholder="Nome do Planeta"
      />
      <div className={ style.sort_container }>
        <div
          className={ style.column_sort }
          onClick={ (e) => handleClick(e, 'sort') }
        >
          <p>
            Ordenar por Coluna
            { dropSort ? <GoTriangleUp /> : <GoTriangleDown /> }
          </p>
          <form className={ style.sort_form }>
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
          </form>
        </div>
        <button
          type="submit"
          data-testid="column-sort-button"
          onClick={ (e) => handleSubmit(e, 'sort') }
        >
          Ordenar
        </button>
      </div>
      {/* <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => setMultfilter([]) }
      >
        Remover Filtros
      </button> */}
    </header>
  );
}
