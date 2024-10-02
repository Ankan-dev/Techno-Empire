import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const buttonLoader = () => {
    return (
        <ClipLoader
            color={'#84f0f5'}

            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    )
}

export default buttonLoader