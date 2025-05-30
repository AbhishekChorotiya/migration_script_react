import * as React from "react";
import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> { }

const LockIcon = (props: Props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="svg-icon"
        style={{
            width: "1rem",
            height: "1rem",
            verticalAlign: "middle",
            fill: "white",
            overflow: "hidden",
        }}
        viewBox="0 0 1024 1024"
        {...props}
    >
        <path d="M768 341.333h-42.667V256c0-117.76-95.573-213.333-213.333-213.333S298.667 138.24 298.667 256v85.333H256c-47.147 0-85.333 38.187-85.333 85.334v426.666c0 47.147 38.186 85.334 85.333 85.334h512c47.147 0 85.333-38.187 85.333-85.334V426.667c0-47.147-38.186-85.334-85.333-85.334zm-256 384c-47.147 0-85.333-38.186-85.333-85.333s38.186-85.333 85.333-85.333 85.333 38.186 85.333 85.333-38.186 85.333-85.333 85.333zm132.267-384H379.733V256c0-72.96 59.307-132.267 132.267-132.267S644.267 183.04 644.267 256v85.333z" />
    </svg>
);
export default LockIcon;
