import React from "react";

function MyLogo({ fillColor1 = "#F7E700", fillColor2 = "#FFFFFF", fillColor3 = "#1DBF73", textColor = "#FFFFFF", siteName = "Elevate" }) {
  return (
    <svg
      width="180"
      height="60"
      viewBox="0 0 180 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="30" cy="30" r="15" fill={fillColor1} />
      <circle cx="45" cy="30" r="15" fill={fillColor2} />
      <circle cx="60" cy="30" r="15" fill={fillColor3} />
      <text
        x="80"
        y="32"
        fontFamily="'Great Vibes', cursive"
        fontSize="26"
        fontWeight="700"
        fill={textColor}
        letterSpacing="0.5px"
        textAnchor="start"
        alignmentBaseline="middle"
      >
        {siteName}
      </text>
    </svg>
  );
}

export default MyLogo;
