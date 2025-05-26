import * as React from "react";
import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> { }

const MasterCardLogo = (props: Props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        id="svg895"
        width={40}
        height={40}
        viewBox="-96 -98.908 832 593.448"
        {...props}
    >
        <defs id="defs879">
            <style id="style877" type="text/css">
                {".e{fill:#f79e1b}"}
            </style>
        </defs>
        <path
            id="rect887"
            fill="#ff5f00"
            strokeWidth={5.494}
            d="M224.833 42.298h190.416v311.005H224.833z"
            display="inline"
        />
        <path
            id="path889"
            fill="#eb001b"
            strokeWidth={5.494}
            d="M244.446 197.828a197.448 197.448 0 0 1 75.54-155.475 197.777 197.777 0 1 0 0 311.004 197.448 197.448 0 0 1-75.54-155.53z"
        />
        <path
            id="path891"
            fill="#f79e1b"
            strokeWidth={5.494}
            d="M621.101 320.394v-6.372h2.747v-1.319h-6.537v1.319h2.582v6.373zm12.691 0v-7.69h-1.978l-2.307 5.493-2.308-5.494h-1.977v7.691h1.428v-5.823l2.143 5h1.483l2.143-5v5.823z"
            className="e"
        />
        <path
            id="path893"
            fill="#f79e1b"
            strokeWidth={5.494}
            d="M640 197.828a197.777 197.777 0 0 1-320.015 155.474 197.777 197.777 0 0 0 0-311.004A197.777 197.777 0 0 1 640 197.773z"
            className="e"
        />
    </svg>
);
export default MasterCardLogo;
