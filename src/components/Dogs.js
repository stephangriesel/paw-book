import { useEffect, useState } from "react";
import {
    Link
} from 'react-router-dom';
import Loading from "./Loading";
export default function App() {
    const [data, setData] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                {filtered.map(({ id, name, image, temperament }) => (
                    <Link
                        to={"/dog/" + id}
                        className="col-md-4 col-sm-6 card my-3 py-3"
                        key={name}
                    >
                        <li className="cards text-center" key={id}>
                            <h3>{name}</h3>
                            <div className="card-img-top text-center">
                                <img className="card-img-custom" src={image.url} />
                            </div>
                            <p className="m-2">I am <span className="text-lowercase">{temperament}</span></p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}