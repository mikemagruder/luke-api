import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Form from './Form';
import { store } from '../context/StateProvider'

const DisplayPlanet = () => {
    const { state } = useContext(store);
    const [ starship, setStarship ] = useState([])

    useEffect(() => {
        axios.get(`https://swapi.dev/api/starships/${state.numberSelector}`)
            .then((res)=>{
                setStarship(res.data)
            })
            .catch((error) => {
                console.log(error)
                return (
                    <div>These aren't the droids you're looking for!</div>
                )}
            )
    }, [ state.numberSelector ])

    return (
        <div style={{backgroundImage : `url('https://wallpapercave.com/wp/NUAFBPM.jpg')`, color: "white" }}>
            <h1>Starships of Star Wars!!!</h1>
            <p>Name: { starship.name }</p>
            <p>Starship Class: { starship.starship_class }</p>
            <p>Starship Model: { starship.model }</p>
            <p>Length: { starship.length }</p>
            <p>Crew Number: { starship.crew }</p>
            <p>Maximum Passengers: { starship.passengers }</p>
            <p>Manufacturer: { starship.manufacturer }</p>
        </div>
    )
}

export default DisplayPlanet;