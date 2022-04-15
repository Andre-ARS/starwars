import React, { useContext } from 'react';
import PlanetContext from '../../context/PlanetContext';
import Loading from '../Loading';

export default function Table() {
  const { data, filterByName, filterByNumericValues } = useContext(PlanetContext);

  if (!data) return <Loading />;

  const getFilterValues = (arr) => {
    const { column, comparison, value } = filterByNumericValues;
    if (comparison === 'maior que') {
      return arr.filter((planet) => parseFloat(planet[column]) > value);
    }
    if (comparison === 'menor que') {
      return arr.filter((planet) => parseFloat(planet[column]) < value);
    }
    return arr.filter((planet) => planet[column] === value);
  };

  const tableHeads = Object.keys(data.results[0]).filter((key) => key !== 'residents');
  const planets = data.results.filter(({ name }) => name.includes(filterByName));
  const filtredPlanets = getFilterValues(planets) || planets;
  return (
    <table>
      <thead>
        <tr key="">
          { tableHeads.map((head) => <th key={ head }>{ head }</th>) }
        </tr>
      </thead>
      <tbody>
        { filtredPlanets.map((planet) => (
          <tr key={ planet.name }>
            { tableHeads.map((head) => <td key={ planet[head] }>{ planet[head] }</td>)}
          </tr>
        )) }
      </tbody>
    </table>
  );
}
