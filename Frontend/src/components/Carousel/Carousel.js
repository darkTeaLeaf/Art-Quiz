import React from "react";
import { connect } from "react-redux";
import "./Carousel.css";
import { switchPainting } from "../../actions";

const Carousel = ({painting, switchPainting}) => {
  return (
    <div id="Carousel">
      {Object.keys(painting).length !== 0
        ? [
            <div className="rope"></div>,
            <img src={painting.url} alt="painting"></img>
          ]
        : ""}
    </div>
  );
};

const mapStateToProps = store => {
  console.log(store);
  return { painting: store.painting };
};

export default connect(mapStateToProps, { switchPainting })(Carousel);
