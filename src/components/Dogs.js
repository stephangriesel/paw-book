import { useState, useEffect } from "react";

export default function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://api.thedogapi.com/v1/breeds`, {
            method: "GET", // default GET
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'live_jokLUMPertUQojxSPDsV3O9bJTaj7EVGJTXOqDqceMDZnIpAHLvARfBQvDLVmTEm',

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



    return <div className="container-fluid">
        <h1>DogReal</h1>
        {loading && <div>A moment please...</div>}
        {error && (
            <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
        <ul className="row justify-content-center">
            {data &&
                data.map(({ id, name, image, bred_for, life_span }) => (
                    <li key={id} className="col-md-4 col-sm-6 card my-3 py-3 border-0">
                        <h3>{name}</h3>
                        <div className="card-img-top text-center">
                            <img src={image.url} className="photo w-75" />
                        </div>
                        <p>{bred_for}</p>
                        <p>{life_span}</p>
                    </li>
                ))}
        </ul>
    </div>;
}