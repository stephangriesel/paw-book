import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
                    mode: "cors",
                })

        const detailData = await data.json();
        console.log(detailData);
        setDetails(detailData);

    }

    useEffect(() => {
        fetchDetails(params.name);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.name])

    return (
        <div className="info-block mt-5">
            <div><img className="dog-img" alt="dog" src={`https://cdn2.thedogapi.com/images/${details.reference_image_id}.jpg`} /></div>
            <div className="flex-column m-5">
                <h3>BREED: {details.name}</h3>
                <p>BRED FOR: <span className="text-capitalize">{details.bred_for}</span></p>
                <p>TEMPERAMENT: <span className="text-capitalize">{details.temperament}</span></p>
                <p>LIFE SPAN: <span className="text-capitalize">{details.life_span}</span></p>
            </div>
        </div>

    )
}

export default Dog