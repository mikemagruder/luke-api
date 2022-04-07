import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
// import Form from './Form';
// import DisplayPlanet from './DisplayPlanet';
import { useNavigate } from 'react-router';
import HyperLink from './HyperLink';
import { store } from '../context/StateProvider';
import { set } from 'react-hook-form';

const DisplayPeople = (props) => {

    const globalStateAndDispatch = useContext(store);
    const globalState = globalStateAndDispatch.state;
    const globalDispatch = globalStateAndDispatch.dispatch;
    // console.log(state)
    const { numberSelector, categorySelector } = useParams();
    const { results, setResults } = props;
    const [ people, setPeople ] = useState([]);
    const [ homeplanet, setHomePlanet ] = useState({})
    const [ films, setFilms ] = useState([])

    const [ planetID, setPlanetID ] = useState(0)

    let navigate = useNavigate();

    const [ isLoaded, setIsLoaded ] = useState(false);

    useEffect(() => {
        let planetUrl = [];

        axios.get(`https://swapi.dev/api/${globalState.categorySelector}/${globalState.numberSelector}`)
        // axios.get(`https://swapi.dev/api/people/${numberSelector}`)
            .then((res)=>{
                setPeople(res.data)
                // console.log(res.data)
                planetUrl = res.data.homeworld.split('/');
                setPlanetID(planetUrl[5])
                console.log(planetUrl)
                console.log(planetUrl[5])
                globalDispatch({
                    type: "planetIDUpdate",
                    payload: {
                        name: "updatedPlanetID",
                        value: planetUrl[5],
                        // value: 3,
                    }
                })
                // console.log(globalState.updatedPlanetID)
                axios.get(`${res.data.homeworld}`)
                .then((res2) =>{
                    // console.log(res2.data)
                    setHomePlanet(res2.data)
                    axios.get(`${res2.data.films[0]}`)
                    .then((res3) => {
                        console.log(res3.data)
                        setFilms(res3.data)
                    })
                })
            })
            .catch((error) => console.log(error))
    }, [ globalState.numberSelector ])

    const submitHandler = () => {
        // e.preventDefault()
        console.log(globalState.categorySelector)
        console.log(globalState.numberSelector)
        console.log(globalState.updatedPlanetID)
        
        globalDispatch({
            type: "hyperLinkNumberUpdate",
            payload: {
                name: globalState.numberSelector,
                value: globalState.updatedPlanetID,
            }
        })
        console.log(globalState.numberSelector)
        console.log(globalState.updatedPlanetID)

        // globalState.numberSelector = globalState.updatedPlanetID
        
        console.log(globalState.numberSelector)
        
        navigate(`/planets/${globalState.updatedPlanetID}`)
        // axios.get(`https://swapi.dev/api/planets/${globalState.updatedPlanetID}`)
        //     .then((res)=>{
        //         console.log(res.data)
        //         navigate(`/planets/${globalState.updatedPlanetID}`)
        //     })
        //     .catch((error) => console.log(error))
        // setIsLoaded(true)
    }

    return (
        <div style={{backgroundImage : `url('https://static0.srcdn.com/wordpress/wp-content/uploads/2019/10/Luke-Skywalker-in-Star-Wars.jpg')` }}>
            <h1>People of Star Wars!!!</h1>
            <p>Name: { people.name }</p>
            <p>Birth Year: { people.birth_year }</p>
            <p>Eye Color: { people.eye_color }</p>
            <p>Skin Color: { people.skin_color }</p>
            <p>{ globalState.numberSelector}</p>
            <h1>This person's Homeworld is:</h1>
            <p 
            style={{color: "blue", textDecoration: "underline"}} 
            onClick={() => submitHandler()} > 
                {homeplanet.name} 
            </p>
            {/* <p style={{color: "blue", textDecoration: "underline"}} 
                onClick={() => navigate(`/planets/${globalState.updatedPlanetID}`)}> 
                {homeplanet.name} 
            </p> */}
            {/* <p style={{color: "blue", textDecoration: "underline"}}>
                <HyperLink url={`/planets/${globalState.updatedPlanetID}`} linkText={`${homeplanet.name}`}/>
            </p> */}
            <p>Population: {homeplanet.population}</p>
            <p>Terrain: {homeplanet.terrain}</p>
            <p>Climate: {homeplanet.climate}</p>
            <h1>This planet first featured in: </h1>
            <h4>"{films.title}"</h4>
            <h3>And it's opening crawl read: </h3>
            <p>{films.opening_crawl}</p>
            <p>Release Date: {films.release_date}</p>
            <p>Directed by: {films.director}</p>
            {
                films?.characters?.map((character, index) => {
                    return (
                        <p key={index}>
                            <HyperLink url={character.substring(22)} linkText={`character: ${index}`} />
                        </p>
                    )
                })
            }
        </div>
    )
}

export default DisplayPeople;