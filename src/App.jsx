import { useState, useEffect } from 'react';
import './App.css';
import ReactDOM from 'react-dom'; 
import React from 'react'; 

const CrimeCards = (props) => {
  return (
    <div id="cardContainer" key={Math.random()}>
    <div className="row">
      <div className="label">ID</div>
      <div className="value" id="value1">{props.id}</div>
    </div>
    <div className="row">
      <div className="label">Date + time</div>
      <div className="value" id="value2">{props.datetime}</div>
    </div>
    <div className="row">
      <div className="label">Named incident</div>
      <div className="value" id="value3">{props.name}</div>
    </div>
    <div className="row">
      <div className="label">Summary</div>
      <div className="value" id="value4">{props.summary}</div>
    </div>
    <div className="row">
      <div className="label">Type of incident</div>
      <div className="value" id="value6">{props.type}</div>
    </div>
    <div className="row">
      <div className="label">Location</div>
      <div className="value" id="value7">{props.location}</div>
    </div>
  </div>
  )
}

function App() {
  let [crimeEvent, setCrimeEvent] = useState('Misshandel');
  let [city, setCity] = useState('Stockholm');
  let [api_URL, setApiUrl] = useState(`https://polisen.se/api/events?type=${crimeEvent}&locationName=${city}`);
  let [crimeList, setCrimeList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);


  // useEffect(() => {

  // }, [crimeList])

  const fetchData = async (crimeEvent, city) => {
    const response = await fetch(api_URL);
    const data = await response.json();
    let updatedCrimeList = [];
    for (const crime in data) {
      updatedCrimeList.push(data[crime]);
    }
    setCrimeList(updatedCrimeList.map((crime) => { 
      return (
        <CrimeCards id={crime.id} datetime={crime.datetime} name={crime.name} 
        summary={crime.summary} type={crime.type} location={crime.location.name}/>
      );
    })); 
  }
  return (
    <>
      {/* <button></button> */}
      <ul> 
        {crimeList} 
      </ul>
    </>
  )
}

export default App;
