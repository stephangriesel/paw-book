import React, { useEffect, useState, useContext } from "react";
import {
    Link
} from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import Loading from "./Loading";
export default function App({dog}) {
    const [data, setData] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addDogToFavorites, favorites } = useContext(GlobalContext);

    useEffect(() => {
        fetch(`https://api.thedogapi.com/v1/breeds`, {
            method: "GET", // default GET
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${process.env.REACT_APP_API_KEY}`
            }
        })
            .then((response) => {
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
            })
            .catch((err) => {
                setError(err.message);
                setData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="container-fluid">
            {loading && <div className="text-center"><Loading /></div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            <div className="search-box text-center">
                <input placeholder="What breed you looking for?" style = {{textTransform:'lowercase'}}
                    onChange={(event) => {
                        const value = event.target.value;
                        console.log(value)
                        const filtered = data.filter((dog) => dog.name.toLowerCase().includes(value));
                        console.log("filtered", filtered);
                        setFiltered(filtered);
                    }}
                />
            </div>
            <ul className="row justify-content-center">
                {filtered.map((dog) => (
                    <Link
                        to={"/dog/" + dog.id}
                        className="col-md-4 col-sm-6 card my-3 py-3"
                        key={dog.name}
                    >
                        <li className="cards text-center" key={dog.id}>
                            <h3>{dog.name}</h3>
                            <div className="card-img-top text-center">
                                <img className="card-img-custom" src={dog.image.url} />
                            </div>
                            <p className="m-2">I am <span className="text-lowercase">{dog.temperament}</span></p>
                        </li>
                        <div>
                            <button onClick={() => addDogToFavorites(dog)} className="btn"><Link to="#">Add to favorite</Link></button>
                        </div>
                    </Link>
                ))}
            </ul>
        </div>
    );
}