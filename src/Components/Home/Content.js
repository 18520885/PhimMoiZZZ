import React from "react";
import SliderMovie from "../Slider/SliderMovie";
import SliderTv from "../Slider/SliderTv";

function Content() {
  return (
    <div className="container">
      <div className="movie">
        <SliderMovie type="trending" />
        <SliderMovie type="popular" />
        <SliderMovie type="top_rated" />
      </div>
      <div className="tv">
        <SliderTv type="trending" />
        <SliderTv type="popular" />
        <SliderTv type="top_rated" />
      </div>
    </div>
  );
}

export default Content;
