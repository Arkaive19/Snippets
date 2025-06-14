import React from "react";

const Cnt = (props) => {
  let { Class, children } = props;
  return <div className={Class}>{children}</div>;
};

export default Cnt;
