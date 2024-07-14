import { useState, useEffect } from 'react';
import './weatherstyles.css'; // Import your CSS file

function Weather(props) {
    const [data, setData] = useState(null); // Initialize state to hold weather data
    const [imgsrc, setImgsrc] = useState(""); // State to hold image source
    const [errorMessage, setErrorMessage] = useState(""); // State to hold error message
    const { searchData } = props; // Destructure searchData from props
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchData}&appid=a5e236b70d738172d85f6a214388a326`;

    useEffect(() => {
        const fetchWeather = async () => {
            if (!searchData) return; // Exit early if searchData is empty

            try {
                const response = await fetch(weatherURL);
                const weatherData = await response.json();

                // Check for API errors
                if (weatherData.cod === '400' || weatherData.cod === '404') {
                    setErrorMessage(weatherData.message);
                    setData(null); // Clear data on error
                    return;
                }

                // Convert temperatures from Kelvin to Celsius
                const convertToCelsius = kelvin => (kelvin - 273.15).toFixed(2);

                weatherData.main.temp_celsius = convertToCelsius(weatherData.main.temp);
                weatherData.main.feels_like_celsius = convertToCelsius(weatherData.main.feels_like);
                weatherData.main.temp_min_celsius = convertToCelsius(weatherData.main.temp_min);
                weatherData.main.temp_max_celsius = convertToCelsius(weatherData.main.temp_max);

                setData(weatherData); // Set weather data in state
                console.log(weatherData); // Log weather data to console

                // Set image source based on weather condition
                if (weatherData.weather && weatherData.weather.length > 0) {
                    const mainWeather = weatherData.weather[0].main;
                    if (mainWeather === "Clouds") {
                        setImgsrc("cloudy.png");
                    } else if (mainWeather === "Mist") {
                        setImgsrc("mist.png");
                    } else {
                        setImgsrc("sunny.png");
                    }
                }
            } catch (error) {
                console.error('Error fetching weather:', error);
                setErrorMessage("Error fetching weather. Please try again later.");
                setData(null); // Clear data on error
            }
        };

        fetchWeather();
    }, [searchData, weatherURL]); 

    
    return (
        <div className="weather-container">
            {/* Render weather data or error message */}
            {errorMessage ? (
                <div className="weather-data">
                    <h2>{errorMessage}</h2>
                </div>
            ) : (
                data && (
                    <div className="weather-data">
                        <h2>Weather Information for {searchData}</h2>
                        <img src={imgsrc} alt="Weather Icon" className="weather-icon" />
                        <p>Temperature: {data.main.temp_celsius} °C</p>
                        <p>Feels Like: {data.main.feels_like_celsius} °C</p>
                        <p>Min Temperature: {data.main.temp_min_celsius} °C</p>
                        <p>Max Temperature: {data.main.temp_max_celsius} °C</p>
                        <p>Pressure: {data.main.humidity}</p>
                        <p>Wind: {data.wind.speed}</p>
                    </div>
                )
            )}
        </div>
    );
}

export default Weather;
