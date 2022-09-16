import axios from "axios"
import { useEffect, useState } from "react"

const Weather = ({ latlng, capital }) => {
    const [weather, setWeather] = useState({})
    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}`)
            .then(response => {
                setWeather(response.data)
            })
    }, [latlng, api_key])

    return (
        <div>
            <div>
                <h3>Weather in {capital}</h3>
                <div>
                    temperature {weather.main.temp} Celcius
                </div>
                <div>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={"weather"} />
                </div>
                <div>
                    wind {weather.wind.speed} m/s
                </div>
            </div>
        </div>
    )
}

export default Weather