import React, { useEffect, useState, useContext } from "react";
import {
    Link
} from 'react-router-dom';
import { Fade } from "react-awesome-reveal";
import { GlobalContext } from '../context/GlobalState';
import Loading from "./Loading";
import HeartFull from '../icons/HeartFill';

export default function App() {
    const [data, setData] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addDogToFavorites } = useContext(GlobalContext);

    const fetchList = async () => {
        const data = await
            fetch(`https://api.thedogapi.com/v1/breeds`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "x-api-key": `${process.env.REACT_APP_API_KEY}`
                },
                referrerPolicy: "same-origin",
                keepalive: true,
                cache: "reload",
            })
                .then((response) => {
                    console.log("check fetch response", response);
                    console.log("check response status", response.status);
                    if (!response.ok) {
                        throw new Error(
                            `This is an HTTP error: The status is ${response.status}`
                        );
                    }
                    return response.json();
                })
                .then((actualData) => {
                    setData(actualData);
                    setFiltered(actualData);
                    console.log(actualData);
                    setTimeout(function(){ window.location.reload(); }, 7000);
                })
                .catch((err) => {
                    console.error('Issue fetching');
                    setError(err.message);
                    setData(null);
                })
                .finally(() => {
                    setLoading(false);
                });

        const listData = await data.json();
        console.log(listData);
    }

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="container-fluid">
            <div className="search-box text-center">
                <div className="input-wrapper">
                    <input placeholder="What breed you looking for?" style={{ textTransform: 'lowercase' }}
                        onChange={(event) => {
                            const value = event.target.value;
                            console.log(value)
                            const filtered = data.filter((dog) => dog.name.toLowerCase().includes(value));
                            console.log("filtered", filtered);
                            setFiltered(filtered);
                        }}
                    />
                    <div className="favorite-box">
                        <Link className="d-flex" to="/favorites">MY <HeartFull />'s</Link>
                    </div>
                </div>
            </div>
            {loading && <div className="text-center"><Loading /></div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            <ul className="row justify-content-center">
                {filtered.map((dog) => (
                    <div
                        className="col-md-4 col-sm-6 card my-3 py-3"
                        key={dog.name}
                    >
                        <Fade delay={200}>
                            <li className="cards text-center" key={dog.id}>
                                <h3>{dog.name}</h3>
                                <div className="card-img-top text-center">
                                    <Link to={"/dog/" + dog.id}>
                                        <img className="card-img-custom" alt="dog" src={dog.image.url} />
                                    </Link>
                                </div>
                                {dog.id !== 196 && dog.id !== 197 && dog.id !== 261 ?
                                    <p className="m-2">I am <span className="text-lowercase">{dog.temperament}</span></p> : <div>I am loving dog</div>}
                            </li>
                            <div className="text-center">
                                <div className="text-center" onClick={() => addDogToFavorites(dog)}><Link to="#" className="d-flex justify-content-center"><HeartFull /></Link></div>
                            </div>
                        </Fade>
                    </div>
                ))}
            </ul>
        </div>
    );
}