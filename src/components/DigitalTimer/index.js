// Write your code here
import { Component } from "react";

import "./index.css";

class DigitalTimer extends Component {
  state = { isTimeRunning: false, seconds: 60, minutes: 25,userInput:25 };

  componentWillUnmount() {
    clearInterval(this.timeId);
  }

  setTimer = () => {
    this.setState((prevState) => ({
      minutes: prevState.userInput + 1,
      userInput:prevState.userInput+1
    }));
  };
  setTimer2 = () => {
    this.setState((prevState) => ({
      minutes: prevState.minutes - 1,
      userInput:prevState.userInput-1
    }));
  };
  updateTime = () => {
    const { minutes, seconds } = this.state;
    this.setState((prevState) => {
      if (prevState.seconds <= 0) {
        return { seconds: 60 };
      } else {
        return {
          seconds: prevState.seconds - 1,
          minutes: prevState.minutes - Math.floor(prevState.seconds / 60),
        };
      }
    });
    if (minutes === 0 && seconds === 0) {
      this.setState({ minutes: 0, seconds: 0, isTimeRunning: false });
      clearInterval(this.timeId);
    }
  };
  StartTimer = () => {
    const { isTimeRunning, minutes } = this.state;
    const isTimerCompleted = minutes === 0;
    if (isTimerCompleted) {
      this.setState({ seconds: 0 });
    }
    if (isTimeRunning) {
      clearInterval(this.timeId);
    } else {
      this.timeId = setInterval(this.updateTime, 1000);
    }
    this.setState((prevState) => ({ isTimeRunning: !prevState.isTimeRunning }));
  };
  resetTimer = () => {
    this.setState({ isTimeRunning: false, seconds: 60, minutes: 25,userInput:25 });
    clearInterval(this.timeId);
  };
  renderSec = () => {
    const { seconds } = this.state;
    const visibleSec = Math.floor(seconds % 60);
    if (visibleSec < 10) {
      return `0${visibleSec}`;
    } else {
      return `${visibleSec}`;
    }
  };
  renderMin = () => {
    const { minutes } = this.state;
    if (minutes < 10) {
      return `0${minutes}`;
    } else {
      return `${minutes}`;
    }
  };

  render() {
    const { isTimeRunning,userInput } = this.state;
    console.log(isTimeRunning);
    const pauseOrRunning = isTimeRunning ? "Running" : "Paused";
    const startOrPause = isTimeRunning ? "Pause" : "Start";
    const altValue=isTimeRunning?"pause icon" : "play icon"
    const imageStartOrPause = isTimeRunning
      ? "https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
      : "https://assets.ccbp.in/frontend/react-js/play-icon-img.png";
    // const renderMin = {this.renderMin};
    const renderMinAndSec = `${this.renderMin()}:${this.renderSec()}`;

    return (
      <div className="digitalTimerContainer">
        <div className="headingContainer">
          <h1 className="heading">Digital Timer</h1>
        </div>
        <div className="TimerContainer">
          <div className="imageContainer">
            <div className="stopWatch">
            <h1>{renderMinAndSec}</h1>
            <p>{pauseOrRunning}</p>
            </div>
          </div>
          <div className="ControlsContainer">
            <div className="buttonContainer">
              <button className="btnStyle" onClick={this.StartTimer}>
                <img
                  src={imageStartOrPause}
                  alt={altValue}
                  className="image"
                />
                <p>{startOrPause}</p>
              </button> 
              <button className="btnStyle" onClick={this.resetTimer}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="image"
                />
                Reset
              </button>
             
            </div>
            <div>
              <p>Set Timer Limit</p>
            </div>
            <div className="timerSetContainer">
              <button
                onClick={this.setTimer2}
                disabled={isTimeRunning}
                className="btnStyle"
              >
                -
              </button>
              <p>{userInput}</p>
              <button
                onClick={this.setTimer}
                disabled={isTimeRunning}
                className="btnStyle"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DigitalTimer;
