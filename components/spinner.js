import React from 'react'
import './spinner.css'

const Spinner = ({size}) => {
  return (
    <svg
      className="spinner"
      width={`${size || 40}px`}
      height={`${size || 40}px`}
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="circle"
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        cx="33"
        cy="33"
        r="30"
      ></circle>
    </svg>
  )
}

export default Spinner
