import * as React from "react";
const CloseIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} {...props}>
    <path
      fill="#003ea9"
      fillRule="nonzero"
      d="M1.707.293 7 5.585 12.293.293a1 1 0 0 1 1.414 1.414L8.415 7l5.292 5.293a1 1 0 0 1-1.414 1.414L7 8.415l-5.293 5.292a1 1 0 1 1-1.414-1.414L5.585 7 .293 1.707A1 1 0 1 1 1.707.293Z"
      className="close-icon-svgpath"
    />
  </svg>
);
export default CloseIcon;
