import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Globe from '../icons/Globe';


function Dog() {

    let params = useParams();

    const [details, setDetails] = useState({});

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
        <div className="info-block">
            <div><img className="dog-img" src={`https://cdn2.thedogapi.com/images/${details.reference_image_id}.jpg`} /></div>
            <div className="flex-column">
                <h2>I am a {details.name}</h2>
                <p>I am best at <span className="dog-p">{details.bred_for}</span></p>
                <p>If we meet you will think I am <span className="dog-p">{details.temperament}</span></p>
                <p>I wish I could live forever but normally only between <span className="dog-p">{details.life_span}</span></p>
            </div>
        </div>

    )
}

export default Dog