const ManyCountries = ({ countries, changeFilter }) => {
    return (
        <div>
            {countries.length > 10
                ? 'Too many matches, specify another filter'
                : countries.map(country => <CountryName key={country.name.common} name={country.name.common} changeFilter={changeFilter} />)}
        </div>
    )
}

const CountryName = ({ name, changeFilter }) => {
    return (
        <>
            {name}
            <button onClick={() => changeFilter(name)}>show</button>
            <br />
        </>
    )
}

export default ManyCountries