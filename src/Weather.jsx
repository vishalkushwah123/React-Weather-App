import React from 'react'
import { useState } from 'react'
import { Dna } from 'react-loader-spinner'

const api = {
    key: 'ccafb3c182558c283e028ad7db6fba86',
    base: 'https://api.openweathermap.org/data/2.5/'
}
function Weather() {
    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState({})

    const search = (evt) => {
        if (evt.key == 'Enter') {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`).then(res => res.json()).then(result => { setWeather(result); setQuery(''); console.log(result) })
        }
    }

    const searchButton = (evt) => {
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`).then(res => res.json()).then(result => { setWeather(result); setQuery(''); console.log(result) })
    }

    const dateBuilder = (d) => {
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
        let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let day = days[d.getDay()]
        let month = months[d.getMonth()]
        let date = d.getDate()
        let year = d.getFullYear()

        return `${day} ${date} ${month} ${year}`
    }
    return (
        <div>
            <main className='weather-box'>
                <div className="serch-box">
                    <input type="text" onKeyPress={search} placeholder='Serch Weather..' value={query} className='serch-bar' onChange={(e) => setQuery(e.target.value)} />
                    <button onClick={searchButton}>Go</button>
                </div>
                {(typeof weather.main != "undefined") ? (<div className="location-box">
                    <div className="location">
                        {weather.name}, {weather.sys.country}
                    </div>
                    <div className="date">
                        {dateBuilder(new Date())}
                    </div>
                    <div className="temp-box">
                        <div className="temp">
                            {Math.round(weather.main.temp)}'c
                        </div>
                    </div>
                    <div className="weather">
                        {weather.weather[0].main}
                    </div>
                </div>) : <Dna
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                />}

            </main>
        </div>
    )
}

export default Weather
