import React from "react";
import * as LucideIcons from "lucide-react";
import { HelpCircle, Heart, Sun, Moon } from "lucide-react";

const icons = {
  Filter: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  ),
};

export default function Icon({
  name,
  size = 24,
  color = "currentColor",
  className = "",
  strokeWidth = 2,
  fill = "none",
  ...props
}) {
  // Hide star icons globally
  if (name === 'Star' || name === 'StarHalf' || name === 'StarOff' || name === 'StarHalf') {
    return null;
  }

  const IconComponent = LucideIcons[name];

  if (!IconComponent && !icons[name]) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <HelpCircle size={size} color="gray" strokeWidth={strokeWidth} />
      </div>
    );
  }

  if (IconComponent) {
    return (
      <IconComponent
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        className={className}
        fill={fill}
        {...props}
      />
    );
  } else {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icons[name]}
      </div>
    );
  }
}
