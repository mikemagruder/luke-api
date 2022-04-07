import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Form from './Form';
import HyperLink from './HyperLink';
import { store } from '../context/StateProvider'

const DisplayPlanet = () => {

    // const { state } = useContext(store)
    const [ planet, setPlanet ] = useState({})
    const globalStateAndDispatch = useContext(store);
    const globalState = globalStateAndDispatch.state;
    const globalDispatch = globalStateAndDispatch.dispatch;

    useEffect(() => {
        axios.get(`https://swapi.dev/api/planets/${globalState.updatedPlanetID}`)
            .then((res)=>{
                console.log(res.data)
                setPlanet(res.data)
            })
            .catch((error) => {
                console.log(error)
                return (
                    <div>These aren't the droids you're looking for!</div>
                )}
            )
    }, [ globalState.numberSelector ])

    return (
        <div style={{backgroundImage : `url('http://images.en.koreaportal.com/data/images/full/27358/totooine-endor-and-mustafar-might-feature-in-the-upcoming-star-wars-movie.jpg?w=750')`, color: "white" }}>
            <h1>Planets of Star Wars!!!</h1>
            <p>Name: { planet.name }</p>
            <p>Terrain: { planet.terrain }</p>
            <p>Climate: { planet.climate }</p>
            <p>Population: { planet.population }</p>
            <p>Gravity: { planet.gravity }</p>
            <h3>Residents of {planet.name}:</h3>
            {
                planet?.residents?.map((resident, index) => {
                    return (
                        <p key={index}>
                            <HyperLink url={resident.substring(22)} linkText={`resident: ${index}`}/>
                        </p>
                    )
                })
            }
        </div>
        
    )
}

export default DisplayPlanet;