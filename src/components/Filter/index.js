import React, { useContext } from 'react';
import PlanetContext from '../../context/PlanetContext';

export default function Filter() {
  const { filterByName, setfilterByName } = useContext(PlanetContext);
  return (
    <header>
      <input
        type="text"
        value={ filterByName }
        onChange={ ({ target: { value } }) => setfilterByName(value) }
        data-testid="name-filter"
      />
    </header>
  );
}
