import React, { useContext } from 'react';
import PlanetContext from '../../context/PlanetContext';
import FilterDisplay from '../FilterDisplay';
import Loading from '../Loading';

export default function Table() {
  const {
    data,
    filterByName,
    filterByNumericValues,
    multFilter } = useContext(PlanetContext);

  if (!data) return <Loading />;

  const getFilteredValues = (arr) => {
    let filteredValues = arr;
    multFilter.map(({ column, comparison, value }) => {
      let filter = [];
      if (comparison === 'maior que') {
        filter = filteredValues.filter((planet) => parseFloat(planet[column]) > value);
      } else if (comparison === 'menor que') {
        filter = filteredValues.filter((planet) => parseFloat(planet[column]) < value);
      } else {
        filter = filteredValues.filter((planet) => planet[column] === value);
      }
      filteredValues = filter;
      return filter;
    });
    return filteredValues;
  };

  const tableHeads = Object.keys(data.results[0]).filter((key) => key !== 'residents');
  const planets = data.results
    .filter(({ name }) => name.includes(filterByName));
  const filtredPlanets = filterByNumericValues ? getFilteredValues(planets) : planets;

  return (
    <main>
      <FilterDisplay />
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
    </main>
  );
}
