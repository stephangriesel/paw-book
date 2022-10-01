import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

const Favorites = () => {
  const {favorites} = useContext(GlobalContext);
  return (
    <>
    <div className='text-center m-5'>
      <h1>Your Favorites</h1>
    </div>
    <div>
      {favorites.map(dog => (
        <div key={dog.id}  className='d-flex justify-content-center flex-column align-items-center m-5'>
        <img className="w-75" src={dog.image.url}/>
        <p>{dog.name}</p>
        </div>
      ))}
    </div>
    </>
  )
}

export default Favorites