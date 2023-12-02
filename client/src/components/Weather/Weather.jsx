import styles from './Weather.module.css';
import { useState } from 'react';

export default function Weather() {
    document.title = 'Weather';

    const initialValue = { search: '' };
    const initialWeatherData = {
        location: 'Sofia',
        temp_c: '2',
        humidity: '75',
        wind_kph: '6',
        uv: '1',
        wind_dir: 'SW'
    };

    const [searchValue, setSearchValue] = useState(initialValue);
    const [weather, setWeather] = useState(initialWeatherData);
    const [errors, setErrors] = useState({});

    //console.log(weather);
    const onChange = (event) => {
        setSearchValue(state => ({ ...state, [event.target.name]: event.target.value, }));
    };

    const onClick = (event) => {
        event.preventDefault();

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '0b1bd47e78msh9150619d0919e26p16e710jsn870f6abef60a',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${searchValue.search}&days=3`, options)
            .then(response => response.json())
            .then(data => {
                const updatedWeatherData = {
                    location: data.location.name,
                    temp_c: Math.round(Number(data.current.temp_c)),
                    humidity:Math.round(Number(data.current.humidity)),
                    wind_kph:Math.round(Number(data.current.wind_kph)),
                    uv: data.current.uv,
                    wind_dir: data.current.wind_dir
                };
                

                setWeather(updatedWeatherData);
            })
            .catch(error => setErrors(error));
    };

    const inputValidator = () => {
        if (searchValue.search.length < 1) {
            setErrors(state => ({ ...state, search: 'The search field cannot be empty!' }));
        } else {
            if (errors.search) {
                setErrors(state => ({ ...state, search: '' }));
            }
        }
    };

    return (
        <div className={styles['wrapper']}>

            <section className={styles['search-container']}>

                <form className={styles['search-form']}  >
                    <input
                        value={searchValue.search}
                        name="search"
                        type="text"
                        placeholder="Search here..."
                        onChange={onChange}
                        onBlur={inputValidator}
                        className={styles['cityInput']}
                    />
                    <button className={styles['search-button']} onClick={onClick}  >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>
            </section>
            {errors.search && (<p className={styles['errorMessage']}>{errors.search}</p>)}

            <div className={styles['container']}>

                <div className={styles['weather']}>

                    <div className={styles['upper-data']}>
                        <img src="/assets/weather-image.jpg" alt="weather-image" />
                        <div className={styles['weather-data']}>
                            <div className={styles['location']}>{weather.location}</div>
                            <div className={styles['temperature']}>{weather.temp_c}°C</div>
                            {/* <div className={styles['weather-image']}>
                                <img src={'/assets/humidity.png'} alt="" />
                            </div> */}
                        </div>
                    </div>
                    <div className={styles['lower-data']}>
                        <div className={styles['more-info-lable']}>
                            More information
                        </div>

                        <div className={styles['more-info-container']}>
                            {/* <div className={styles['info-block']}>
                                <div className={styles['info-block-lable']}>
                                    <img src="/assets/low-temperature.png" />
                                    <span>Min</span>
                                </div>
                                <div className={styles['info-block-value']}>
                                    {-2}°C
                                </div>
                            </div> */}
                            <div className={styles['info-block']}>
                                <div className={styles['info-block-lable']}>
                                    <img src="/assets/uv.png" />
                                    <span>UVI</span>
                                </div>
                                <div className={styles['info-block-value']}>
                                    {weather.uv}
                                </div>
                            </div>
                            {/* <div className={styles['info-block']}>
                                <div className={styles['info-block-lable']}>
                                    <img src="/assets/high-temperature.png" />
                                    <span>Max</span>
                                </div>
                                <div className={styles['info-block-value']}>
                                    {+2}°C
                                </div>
                            </div> */}

                            <div className={styles['info-block']}>
                                <div className={styles['info-block-lable']}>
                                    <img src="/assets/compas1.png" />
                                    <span>Wind direction</span>
                                </div>
                                <div className={styles['info-block-value']}>
                                    {weather.wind_dir}
                                </div>
                            </div>

                            <div className={styles['info-block']}>
                                <div className={styles['info-block-lable']}>
                                    <img src="/assets/humidity.png" />
                                    <span>Humidity</span>
                                </div>
                                <div className={styles['info-block-value']}>
                                    {weather.humidity}%
                                </div>
                            </div>

                            <div className={styles['info-block']}>
                                <div className={styles['info-block-lable']}>
                                    <img src="/assets/windSpead.png" />
                                    <span>Wind speed</span>
                                </div>
                                <div className={styles['info-block-value']}>
                                    {weather.wind_kph} km/h
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

