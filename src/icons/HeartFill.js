import React from 'react';
import styled from 'styled-components';

const HeartFill = () => {
  return (
    <Wrapper>
      <svg xmlns="http://www.w3.org/2000/svg" className='animate-pulse' width="25" height="25" fill="#FF0000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M133.7,211.9l81-81c19.9-20,22.8-52.7,4-73.6a52,52,0,0,0-75.5-2.1L128,70.5,114.9,57.3c-20-19.9-52.7-22.8-73.6-4a52,52,0,0,0-2.1,75.5l83.1,83.1A8.1,8.1,0,0,0,133.7,211.9Z" fill="#FF0000" stroke="#FF0000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>
    </Wrapper>
  )
}

const Wrapper = styled.div`
:hover {
  .animate-pulse {
    animation: animate-pulse 300ms;
}
@keyframes animate-pulse {
  0% {transform: scale(1.2)}
  50% {transform: scale(1.5)}
  100% {transform: scale(1.2)}
}
`

export default HeartFill