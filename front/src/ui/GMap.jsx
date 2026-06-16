import React from 'react'

const GMap = (props) => {
    return (
        <div className="col-md-12 my-4">
            <iframe src={`https://maps.google.com/maps?q=${props.lat},${props.long}&z=15&output=embed`} width="600" height="450" frameBorder="0" allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
        </div>
    )
}

export default GMap