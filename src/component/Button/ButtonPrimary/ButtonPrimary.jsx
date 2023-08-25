import React from "react";

export default function ButtonPrimary({history, url, content}) {
  return (
    <button
      className="button-primary"
      onClick={() => {
        history.push(`${url}`);
      }}
    >
      {content}
    </button>
  );
}
