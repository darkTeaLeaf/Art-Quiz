import React from "react";
import { connect } from "react-redux";
import "./Carousel.css";

const Carousel = ({ painting }) => {
  return (
    <div id="Carousel">
      {painting.id !== null
        ? [
            <div key="rope" className="rope"></div>,
            <img key="painting_image" src={painting.url} alt="painting"></img>
          ]
        : ""}
    </div>
  );
};

const mapStateToProps = store => ({
  painting: store.painting
});

export default connect(mapStateToProps)(Carousel);
