import React from "react";
import { connect } from "react-redux";
import "./Carousel.css";

const Carousel = ({ painting }) => {
  return (
    <div id="Carousel">
      {Object.keys(painting).length !== 0
      ? [<div className="rope"></div>, <img src={painting.url} alt="painting"></img>]
      : ""
      }
    </div>
  );
};

const mapStateToProps = state => {
  return { painting: state.painting };
};

export default connect(mapStateToProps)(Carousel);
