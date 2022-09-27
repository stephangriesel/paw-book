import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import React from 'react'

function Dog() {

    let params = useParams();

    const[details,setDetails] = useState({});

    const fetchDetails = async () => {
        const data = await 
        fetch(`https://api.thedogapi.com/v1/breeds/${params.name}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': `${process.env.REACT_APP_API_KEY}`,

            },
        })

        const detailData = await data.json();
        console.log(detailData);
        setDetails(detailData);
    }

    useEffect(() => {
        fetchDetails();
    }, [params.name])

  return (
    <div>{details.name}</div>
  )
}

export default Dog