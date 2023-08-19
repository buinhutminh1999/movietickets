import React, { memo } from "react";

function LogoRap({ item }) {
  return (
    <div className="flex flex-col  justify-center items-center">
      <img src={item.logo} className="img-fluid" width={35} />
      <p className="m-0 mt-2">{item.maHeThongRap}</p>
    </div>
  );
}
export default memo(LogoRap);
