import React, { useContext } from 'react';
import { BsTrashFill } from 'react-icons/bs';
import PlanetContext from '../../context/PlanetContext';

export default function FilterDisplay() {
  const { multFilter, setMultfilter } = useContext(PlanetContext);

  const deleteFilter = (del) => {
    const filters = multFilter.filter(({ column }) => column !== del);

    setMultfilter([...filters]);
  };

  return (
    multFilter.map(({ column, comparison, value }) => (
      <div key={ column } data-testid="filter">
        <p>{ `${column} ${comparison}: ${value}` }</p>
        <button
          type="button"
          onClick={ () => deleteFilter(column) }
        >
          <BsTrashFill />
        </button>
      </div>
    ))
  );
}
