import React, { useContext } from 'react';
import PlanetContext from '../../context/PlanetContext';
import FilterDisplay from '../FilterDisplay';
import Loading from '../Loading';

export default function Table() {
  const {
    data,
    filterByName,
    filterByNumericValues,
    sort,
    getFilteredValues } = useContext(PlanetContext);

  if (!data) return <Loading />;

  const sortFunc = (a, b) => {
    const ONE_NEG = -1;
    const x = a.name.toLowerCase();
    const y = b.name.toLowerCase();
    if (x < y) return ONE_NEG;
    if (x > y) return 1;
    return 0;
  };

  const sortByColumn = (arr) => {
    const { columnSort, sortOrder } = sort;

    const removeUKN = arr.filter((planet) => planet[columnSort] !== 'unknown');
    const unknowns = arr.filter((planet) => planet[columnSort] === 'unknown')
      .sort(sortFunc);

    const planetSort = sortOrder === 'ASC'
      ? removeUKN.sort((a, b) => a[columnSort] - b[columnSort])
      : removeUKN.sort((a, b) => b[columnSort] - a[columnSort]);
    return [...planetSort, ...unknowns];
  };

  const tableHeads = Object.keys(data.results[0]).filter((key) => key !== 'residents');
  const planets = data.results
    .filter(({ name }) => name.includes(filterByName));
  const filteredPlanets = filterByNumericValues
    ? getFilteredValues(planets)
    : planets;
  const sortedPlanets = sort
    ? sortByColumn(filteredPlanets)
    : filteredPlanets.sort(sortFunc);

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
          { sortedPlanets.map((planet) => (
            <tr key={ planet.name }>
              { tableHeads.map((head, i) => (
                <td
                  key={ planet[head] }
                  data-testid={ i === 0 ? 'planet-name' : null }
                >
                  { planet[head] }

                </td>
              ))}
            </tr>
          )) }
        </tbody>
      </table>
    </main>
  );
}
