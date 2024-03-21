import React, { useState } from 'react';
import juveImg from './images/Juve.jpg';
import MancityImg from './images/OIP.jpeg';
import ManunitedImg from './images/OIP (1).jpeg';
import RealImg from './images/OIP (2).jpeg';
import BarcaImg from './images/OIP (3).jpeg';
import BayernImg from './images/OIP (4).jpeg';

const trikots = [
  { id: 1, team: 'FC Bayern München', sizes: ['S', 'M', 'L', 'XL'], price: 119.95, image: BayernImg},
  { id: 2, team: 'FC Barcelona', sizes: ['S', 'M', 'L', 'XL'], price: 119.95, image: BarcaImg },
  { id: 3, team: 'Real Madrid', sizes: ['S', 'M', 'L', 'XL'], price: 119.95, image: RealImg },
  { id: 4, team: 'Manchester United', sizes: ['S', 'M', 'L', 'XL'], price: 119.95, image: ManunitedImg },
  { id: 5, team: 'Juventus Turin', sizes: ['S', 'M', 'L', 'XL'], price: 119.95, image: juveImg },
  { id: 6, team: 'Manchester City', sizes: ['S', 'M', 'L', 'XL'], price: 119.95, image: MancityImg }
];

const App = () => {
  const [selectedTrikot, setSelectedTrikot] = useState(null);
  const [filterSize, setFilterSize] = useState('');

  const handleTrikotChange = (event) => {
    setSelectedTrikot(parseInt(event.target.value));
    setFilterSize('');
  };

  const handleSizeFilterChange = (event) => {
    setFilterSize(event.target.value);
  };

  const renderTrikots = () => {
    const filteredTrikots = trikots.filter(trikot => filterSize ? trikot.sizes.includes(filterSize) : true);
    const rows = [];
    let currentRow = [];

    filteredTrikots.forEach((trikot, index) => {
      currentRow.push(
        <div key={trikot.id} style={{ display: selectedTrikot ? (selectedTrikot === trikot.id ? 'block' : 'none') : 'block', border: '1px solid black', padding: '10px', margin: '10px', boxSizing: 'border-box', width: '250px', height: '350px', flexBasis: '250px' }}>
          <input type="radio" id={`trikot-${trikot.id}`} value={trikot.id} checked={selectedTrikot === trikot.id} onChange={handleTrikotChange} style={{ borderRadius: '50%' }} />
          <label htmlFor={`trikot-${trikot.id}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={trikot.image} alt={trikot.team} style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
            <span style={{ fontSize: '25px', fontFamily: 'Rokkitt', fontWeight: 'bold' }}>{trikot.team}</span>
          </label>
          <div style={{ fontSize: '16px',fontFamily: 'Lato', }}>Größe: {trikot.sizes.includes(filterSize) ? filterSize : 'Alle'}</div>
          <div style={{ fontSize: '16px', fontFamily: 'Lato',  }}>Preis: {trikot.price} CHF</div>
        </div>
      );

      if ((index + 1) % 3 === 0 || index === filteredTrikots.length - 1) {
        rows.push(
          <div key={index} style={{ display: 'flex' }}>
            {currentRow}
          </div>
        );
        currentRow = [];
      }
    });

    return rows;
  };

  return (
    <div>
      <h1>Fussballfanshop</h1>
      <label htmlFor="trikotFilter">Team:</label>
      <select id="trikotFilter" value={selectedTrikot} onChange={handleTrikotChange}>
        <option value="">Alle</option>
        {trikots.map(trikot => (
          <option key={trikot.id} value={trikot.id}>{trikot.team}</option>
        ))}
      </select>
      <label htmlFor="sizeFilter">Größe:</label>
      <select id="sizeFilter" value={filterSize} onChange={handleSizeFilterChange}>
        <option value="">Alle</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>
      <div>{renderTrikots()}</div>
    </div>
  );
};

export default App;