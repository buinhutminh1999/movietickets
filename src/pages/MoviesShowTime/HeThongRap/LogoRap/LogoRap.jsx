import React, { memo } from "react";

function LogoRap({ item }) {
    console.log('render logoo')
  return (
    <div className="logo text-center d-flex flex-column align-items-center">
      <div className="logo__item" style={{ width: "30px" }}>
        <img className="img-fluid" src={item.logo} alt="" />
      </div>
      <div className="logo__content">
        <p className="m-0">{item.maHeThongRap}</p>
      </div>
    </div>
  );
}
export default memo(LogoRap);
