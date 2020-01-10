import React from 'react';
import './Weather.css';

const Weather = (props) => {
    console.log("icon:" + props.icon);
    return (
        <div className="weather-container">
            <div className="cards pt-4">
                <h1>{props.city}</h1>
                <h5 className="py-4">
                    <i className={`wi ${props.icon} display-1`}></i>
                </h5>
                {props.temp_celsius ?
                    (<h1 className="py-2">{props.celsius}&deg;</h1>)
                    : null
                }
                {/* show max and min temp of the city */}
                {minmaxTemp(props.temp_min, props.temp_max)}
                <h4 className="py-3">{props.description}</h4>
            </div>
        </div>
    );
}

function minmaxTemp(min, max) {
    if (min && max) {
        return (
            <h3>
                <span className='px-4'>{min}&deg;</span>
                <span className='px-4'>{max}&deg;</span>

            </h3>
        );
    }
}

export default Weather;