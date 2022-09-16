import Weather from './Weather'

const OneCountry = ({ country }) => {


    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h3>languages:</h3>
            <ul>
                {Object.entries(country.languages).map(([key, val]) =>
                    <li key={key}>{val}</li>
                )}
            </ul>

            <img src={country.flags.png} width={200} height={150} alt={"The flag"} />
            <Weather latlng={country.latlng} capital={country.capital} />
        </div>
    )
}

export default OneCountry