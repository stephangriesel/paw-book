import { Button } from "bootstrap";
import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
  } from 'react-router-dom';
import Dog from "./Dog";

export default function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://api.thedogapi.com/v1/breeds`, {
            method: "GET", // default GET
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': `${process.env.REACT_APP_API_KEY}`,

            },
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
                setError(null);
                console.log("data", actualData);
            })
            .catch((err) => {
                setError(err.message);
                setData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // useEffect(() => {
    //     const menuItems = [...new Set(data.map((Val) => Val.name))];
    //     console.log("menu items:", menuItems);
    // })


    return <div className="container-fluid">
        <h1>DogReal</h1>
        
        {loading && <div>A moment please...</div>}
        {error && (
            <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
        <ul className="row justify-content-center">
            {data &&
                data.map(({ id, name, image, bred_for, life_span }) => (
                    <Link to={"/dog/" + id} className="col-md-4 col-sm-6 card my-3 py-3 border-0">
                    <li key={id}>
                        <h3>{name}</h3>
                        <div className="card-img-top text-center">
                            <img src={image.url} className="photo w-75" />
                        </div>
                        <p>{bred_for}</p>
                        <p>{life_span}</p>
                    </li>
                    </Link>
                ))}
        </ul>
    </div>;
}