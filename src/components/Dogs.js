import { useState, useEffect } from "react";

export default function App() {
 const [data, setData] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 useEffect(() => {
    fetch(`https://api.thedogapi.com/v1/breeds`, {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'live_jokLUMPertUQojxSPDsV3O9bJTaj7EVGJTXOqDqceMDZnIpAHLvARfBQvDLVmTEm',
            
        },
    })
      .then((response) => response.json())
      .then((actualData) => console.log(actualData));
  }, []);

 return <div className="App">App</div>;
}