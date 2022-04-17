import React, { useContext, useState } from 'react';
import PlanetContext from '../../context/PlanetContext';
import Loading from '../Loading';

export default function Table() {
  const {
    data,
    filterByName,
    filterByNumericValues } = useContext(PlanetContext);
  const [filtredPlanet, setFiltredPlanet] = useState([{ name: 'xablau' }]);

  if (!data) return <Loading />;

  const getFilterValues = (arr) => {
    const { column, comparison, value } = filterByNumericValues;
    let filter = [];
    if (comparison === 'maior que') {
      filter = arr.filter((planet) => parseFloat(planet[column]) > value);
    } else if (comparison === 'menor que') {
      filter = arr.filter((planet) => parseFloat(planet[column]) < value);
    } else {
      filter = arr.filter((planet) => planet[column] === value);
    }
    return filter;
  };

  const tableHeads = Object.keys(data.results[0]).filter((key) => key !== 'residents');
  const planets = filtredPlanet[0].name !== 'xablau' ? filtredPlanet : data.results
    .filter(({ name }) => name.includes(filterByName));
  // console.log(filtredPlanet);
  const filtredPlanets = filterByNumericValues ? getFilterValues(planets) : planets;
  if (filterByNumericValues && filtredPlanets
    .some((planet, i) => planet.name !== filtredPlanet[i].name)) {
    setFiltredPlanet(filtredPlanets);
  }
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
