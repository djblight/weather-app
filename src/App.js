import React from 'react';
import './App.css';
import xhr from 'xhr';

class App extends React.Component {
  state = {
    location: '',
    data: {}
  };

  fetchData = (evt) => {
    evt.preventDefault();
    
    var location = encodeURIComponent(this.state.location);

    var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    var urlSuffix = '&APPID=636c999fef584b32da8c8d2811f1e98c&units=imperial';
    var url = urlPrefix + location + urlSuffix;

    var self = this;

    xhr({
      url: url
    }, function (err, data) {
      self.setState({
        data: JSON.parse(data.body)
      });
    });
  };

  changeLocation = (evt) => {
    this.setState({
      location: evt.target.value
    });
  };

  render() {
    var currentTemp = 'not loaded yet';
    if (this.state.data.list) {
      currentTemp = this.state.data.list[0].main.temp;
    }
    return (
      <div>
        <h1>Weather</h1>
          <form onSubmit={this.fetchData}>
            <label>What is the weather for:
              <p></p>
              <input
                placeholder={"City, Country or Zip"}
                type="text"
                value={this.state.location}
                onChange={this.changeLocation}
              />
            </label>
          </form>
          <p className="temp-wrapper">
            <span className="temp">{ currentTemp }</span>
            <span className="temp-symbol">°F</span>
          </p>
      </div>
    );
  }
}

export default App;
