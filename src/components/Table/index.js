import React, { useContext } from 'react';
import PlanetContext from '../../context/PlanetContext';
import Loading from '../Loading';

export default function Table() {
  const { data } = useContext(PlanetContext);

  if (!data) return <Loading />;

  const tableHeads = Object.keys(data.results[0]).filter((key) => key !== 'residents');
  const planets = data.results;
  console.log(tableHeads);
  return (
    <table>
      <thead>
        <tr key="">
          { tableHeads.map((head) => <th key={ head }>{ head }</th>) }
        </tr>
      </thead>
      <tbody>
        { planets.map((planet) => (
          <tr key={ planet.name }>
            { tableHeads.map((head) => <td key={ planet[head] }>{ planet[head] }</td>)}
          </tr>
        )) }
      </tbody>
    </table>
  );
}
