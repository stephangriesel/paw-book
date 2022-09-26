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
                console.log("data",actualData);
            })
            .catch((err) => {
                setError(err.message);
                setData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);



    return <div className="App">
        <h1>API Posts</h1>
        {loading && <div>A moment please...</div>}
        {error && (
            <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
        <ul>
            {data &&
                data.map(({ id, name, image }) => (
                    <li key={id}>
                        <h3>{name}</h3>
                        <img src={image.url} />
                    </li>
                ))}
        </ul>
    </div>;
}