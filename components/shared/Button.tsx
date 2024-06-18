"use client";

import React from "react";

function Button({ OnClick }: { OnClick: any }) {
  return (
    <div
      onClick={OnClick}
      className="sm:w-fit bg-primary-500 text-white rounded-xl p-5 hover:bg-primary-500/80 transition-all duration-200"
    >
      Download ticket
    </div>
  );
}

export default Button;
