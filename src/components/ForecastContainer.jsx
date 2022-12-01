import React from "react";
import DayCard from "./DayCard";
import DegreeToggle from "./DegreeToggle";
import { WEATHER_API, WEATHER_URL } from "../constants";

class ForecastContainer extends React.Component {
  state = {
    dailyData: [],
    loading: false,
    error: false,
    degreeType: "fahrenheit",
    zip: "",
    city: "",
    country: "",
  };
  async getAPI(zip) {
    try {
      const response = await fetch(`${WEATHER_URL}${WEATHER_API}&zip=${zip}`);
      this.setState({ loading: true });
      if (response.ok) {
        console.log(response);
        const json = await response.json();
        const data = json.list
          .filter((day) => day.dt_txt.includes("21:00:00"))
          .map((item) => ({
            temp: item.main.temp,
            dt: item.dt,
            date: item.dt_txt,
            imgId: item.weather[0].id,
            desc: item.weather[0].description,
            feelsLike: item.main.feels_like,
            humidity: item.main.humidity,
            windSpeed: item.wind.speed,
          }));
        const city = json.city.name;
        const country = json.city.country;
        this.setState({
          dailyData: data,
          loading: false,
          city: city,
          country: country,
        });
      } else {
        this.state({ loading: false, error: true });
      }
    } catch (err) {
      console.error("You got bugs", err);
    }
  }
  updateForecastDegree = ({ target: { value } }) =>
    this.setState({ degreeType: value });
  handleChange = (event) => this.setState({ zip: event.target.value });
  render() {
    const { loading, error, dailyData, degreeType, zip, city, country } =
      this.state;
    return (
      <div className="container mt-5">
        <h1 className="display-1 bg-light py-5 mb-4">5-Day Forecast</h1>
        <input
          className="p-1"
          type="text"
          value={zip}
          onChange={this.handleChange}
        />
        <button
          className="btn btn-primary ms-2"
          onClick={() => this.getAPI(this.state.zip)}
        >
          Get Weather
        </button>
        <h5 className="text-muted my-3">{`${city}, ${country}`}</h5>
        <DegreeToggle
          degreeType={degreeType}
          updateForecastDegree={this.updateForecastDegree}
        />
        <div className="row justify-content-center mt-3 mb-3">
          {!loading ? (
            dailyData.map((item) => (
              <DayCard data={item} degreeType={degreeType} key={item.dt} />
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
        {error && <h3 className="text-danger">Error loading data</h3>}
      </div>
    );
  }
}

export default ForecastContainer;
