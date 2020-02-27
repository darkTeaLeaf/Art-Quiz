import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./Carousel.css";
import { switchPainting } from "../../actions";

const Carousel = ({ painting, switchPainting }) => {
  useEffect(() => {
    switchPainting();
  }, []);

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

const mapDispatchToProps = dispatch => ({
  switchPainting: () => dispatch(switchPainting())
});

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
