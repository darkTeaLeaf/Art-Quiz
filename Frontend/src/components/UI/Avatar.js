import React from "react";

const Avatar = ({ src, width, height, rounded=false, borderWidth=0 }) => {
  const style = {
    width,
    height,
    overflow: "hidden",
    backgroundImage: `url(${src})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    borderRadius: rounded ? "50%" : "",
    border: `${borderWidth} solid black`,
  };

  return <div style={style}></div>;
};

export default Avatar;
