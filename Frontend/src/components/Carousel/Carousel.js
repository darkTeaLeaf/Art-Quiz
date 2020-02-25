import React, { Component } from "react";
import { connect } from "react-redux";
import "./Carousel.css";
import { switchPainting } from "../../actions";

class Carousel extends Component {
  componentDidMount() {
    this.props.switchPainting();
  }

  render() {
    return (
      <div id="Carousel">
        {Object.keys(this.props.painting).length !== 0
          ? [
              <div className="rope"></div>,
              <img src={this.props.painting.url} alt="painting"></img>
            ]
          : ""}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { painting: state.painting };
};

export default connect(mapStateToProps, { switchPainting })(Carousel);
