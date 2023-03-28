import { useState, useEffect } from 'react';
import './App.css';
import ReactDOM from 'react-dom'; 
import React from 'react'; 

function App() {
  let [crimeEvent, setCrimeEvent] = useState('Misshandel');
  let [city, setCity] = useState('Stockholm');
  let [api_URL, setApiUrl] = useState(`https://polisen.se/api/events?type=${crimeEvent}&locationName=${city}`);
  let [crimeList, setCrimeList] = useState([]);
  let [returnedCrimes, setReturnedCrimes] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (crimeEvent, city) => {
    const response = await fetch(api_URL);
    const data = await response.json();
    for (const crime in data) {
      crimeList.push(data[crime]);
      setCrimeList([crimeList]);
    }
    setReturnedCrimes(crimeList.map((crime) => { 
      return (
        <div id="cardContainer" key={Math.random()}>
          <div className="row">
            <div className="label">ID</div>
            <div className="value" id="value1">{crime.id}</div>
          </div>
          <div className="row">
            <div className="label">Date + time</div>
            <div className="value" id="value2">{crime.datetime}</div>
          </div>
          <div className="row">
            <div className="label">Named incident</div>
            <div className="value" id="value3">{crime.name}</div>
          </div>
          <div className="row">
            <div className="label">Summary</div>
            <div className="value" id="value4">{crime.summary}</div>
          </div>
          <div className="row">
            <div className="label">Type of incident</div>
            <div className="value" id="value6">{crime.type}</div>
          </div>
          <div className="row">
            <div className="label">Location</div>
            <div className="value" id="value7">{crime.location.name}</div>
          </div>
        </div>
      );
    })); 
  }
  
  return (
    <>
      {/* <button></button> */}
      <ul> 
        {returnedCrimes} 
      </ul>
    </>
  )
}

export default App;
