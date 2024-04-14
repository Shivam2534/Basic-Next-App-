import React from "react";

function PersonalProfilepage({ params }: any) {
  return (
    <div className="text-white">
      <h1>PersonalProfilepage</h1>
      <p>{params.id}</p>
    </div>
  );
}

export default PersonalProfilepage;
