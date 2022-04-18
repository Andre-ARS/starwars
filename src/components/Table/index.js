import React, { useContext } from 'react';
import PlanetContext from '../../context/PlanetContext';
import Loading from '../Loading';

export default function Table() {
  const {
    data,
    filterByName,
    filterByNumericValues,
    multFilter } = useContext(PlanetContext);
  // const [filtredPlanet, setFiltredPlanet] = useState([{ name: 'xablau' }]);

  if (!data) return <Loading />;

  const getFilterValues = (arr) => {
    // const { column, comparison, value } = filterByNumericValues;
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
  // console.log(filtredPlanet);
  const filtredPlanets = filterByNumericValues ? getFilterValues(planets) : planets;
  // if (filterByNumericValues && filtredPlanets
  //   .some((planet, i) => planet.name !== filtredPlanet[i].name)) {
  //   setFiltredPlanet(filtredPlanets);
  // }
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
