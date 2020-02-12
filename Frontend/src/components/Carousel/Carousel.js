import React from "react";
import { connect } from "react-redux";
import { switchPainting } from "../../actions";
import "./Carousel.css";

const Carousel = ({ painting, switchPainting }) => {
  return (
    <div id="Carousel">
      <h2>{painting.name}</h2>
      <h3>{painting.author}</h3>
      <img src={painting.url} alt="painting"></img>
      <button onClick={() => switchPainting()}>></button>
    </div>
  );
};

const mapStateToProps = state => {
  return { painting: state.painting };
};

export default connect(mapStateToProps, { switchPainting })(Carousel);
