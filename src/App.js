import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import { Container, Row, Col } from 'reactstrap';
import Weather from './components/Weather/Weather';
import Form from './components/Weather/Form';
import Clothing from './components/Clothing/Clothing';

//api.openweathermap.org/data/2.5/weather?q=London,uk
const API_key = "3a4e2a499f382c202cfa74f399c24d72";

const weatherIcon = {
  Thunderstorm: "wi-thunderstorm",
  Drizzle: "wi-sleet",
  Rain: "wi-storm-showers",
  Snow: "wi-snow",
  Atmosphere: "wi-fog",
  Clear: "wi-sunny",
  Clouds: "wi-day-fog"
}

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false,
    }
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  getWeatherIcon(rangeID) {
    console.log(rangeID);
    switch (true) {
      case rangeID >= 200 && rangeID <= 232:
        this.setState({ icon: weatherIcon.Thunderstorm })
        break;
      case rangeID >= 300 && rangeID <= 321:
        this.setState({ icon: weatherIcon.Drizzle })
        break;
      case rangeID >= 500 && rangeID <= 531:
        this.setState({ icon: weatherIcon.Rain })
        break;
      case rangeID >= 600 && rangeID <= 622:
        this.setState({ icon: weatherIcon.Snow })
        break;
      case rangeID >= 701 && rangeID <= 781:
        this.setState({ icon: weatherIcon.Atmosphere })
        break;
      case rangeID >= 801 && rangeID <= 804:
        this.setState({ icon: weatherIcon.Clouds })
        break;
      case rangeID = 800:
        this.setState({ icon: weatherIcon.Clear })
        break;
      default:
        this.setState({ icon: weatherIcon.Clear })
        break;
    }
  }

  getWeather = async (e) => {

    e.preventDefault();

    const city=e.target.elements.city.value;
    const country=e.target.elements.country.value;

    if(city && country){

      this.setState({error:false});

      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`
      );
  
      const response = await api_call.json();
  
      console.log(response);
  
      this.setState({
        city: `${response.name},${response.sys.country}`,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description
      })

      this.getWeatherIcon(response.weather[0].id);
    }else{
      this.setState({error:true});
    }

    
  }

  render() {
    return (
      <div className="App">
        <h1 style={{ textAlign: 'center' }}>Weather App</h1>
        <Container>
          <Row>
            <Col xs="12">
              <Form 
                getWeather={this.getWeather} 
                error={this.state.error}/>
              <Weather
                city={this.state.city}
                country={this.state.country}
                celsius={this.state.celsius}
                temp_max={this.state.temp_max}
                temp_min={this.state.temp_min}
                description={this.state.description}
                icon={this.state.icon}
              />
            </Col>
            <Col xs="6">
              <Clothing/>
            </Col>
            <Col xs="6">
              <Clothing/>
            </Col>
          </Row>

        </Container>
      </div>
    );

  }
}

export default App;
