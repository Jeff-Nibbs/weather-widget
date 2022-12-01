import React from "react";
import moment from "moment/moment";
import { handleTemp, handleSpeed } from "./functions";

const DayCard = ({ data, degreeType }) => {
  const { temp, dt, imgId, desc, feelsLike, humidity, windSpeed } = data;
  const newDate = new Date();
  newDate.setTime(dt * 1000);

  const icon = `owf owf-${imgId} owf-5x`;
  return (
    <div className="col-sm-2">
      <div className="card py-3 px-2">
        <h3 className="card-title">{moment(newDate).format("dddd")}</h3>
        <p className="text-muted">
          {moment(newDate).format("MMMM Do, h:mm a")}
        </p>
        <i className={icon}></i>
        <h2>
          {degreeType === "fahrenheit"
            ? `${handleTemp(temp).fahrenheit}℉`
            : `${handleTemp(temp).celsius}℃`}
        </h2>
        <h6>
          {degreeType === "fahrenheit"
            ? `Feels Like: ${handleTemp(feelsLike).fahrenheit}℉`
            : `Feels Like: ${handleTemp(feelsLike).celsius}℃`}
        </h6>
        <h6>{`Humidity: ${humidity}`}</h6>
        <h6>
          {degreeType === "fahrenheit"
            ? `Wind Speed: ${handleSpeed(windSpeed).mph}mph`
            : `Wind Speed: ${handleSpeed(windSpeed).kph}km/h`}
        </h6>
        <div className="card-body"></div>
        <h6 className="card-text">{desc}</h6>
      </div>
    </div>
  );
};

export default DayCard;
