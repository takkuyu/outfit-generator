import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import { Container, Row, Col } from 'reactstrap';
import Weather from './components/Weather/Weather';
import Clothing from './components/Clothing/Clothing';

//api.openweathermap.org/data/2.5/weather?q=London,uk
const API_key = "3a4e2a499f382c202cfa74f399c24d72";

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
      description: undefined,
      error: undefined,
    }
    this.getWeather();
  }

  getWeather = async () => {
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_key}`
      );

    const response = await api_call.json();

    console.log(response);

    this.setState({
      city: response.name,
      country: response.sys.country
    })
  }

  render() {

    return (
      <div className="App">
        <h1 style={{ textAlign: 'center' }}>Weather App</h1>
        <Container>
          <Row>
            <Col xs="12">
              <Weather 
                city={this.state.city} 
                country={this.state.country}
              />
            </Col>
            <Col xs="12">
              <Clothing xs="12" />
            </Col>
          </Row>

        </Container>
      </div>
    );

  }
}

export default App;
