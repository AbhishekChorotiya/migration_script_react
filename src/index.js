import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./migration";
class CustomWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["name"];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const mountPoint = document.createElement("div");
    mountPoint.setAttribute("id", "visa-checkout-mount-point");
    mountPoint.style.cssText =
      "display: flex; flex-direction: column; height: 100%; width: 100%;";
    const linkTag = document.createElement("link");
    linkTag.rel = "stylesheet";
    linkTag.href =
      "https://cdn.jsdelivr.net/npm/tailwindcss@latest/dist/tailwind.min.css";

    this.shadowRoot.appendChild(linkTag);
    this.shadowRoot.appendChild(mountPoint);
    linkTag.onload = () => {
      ReactDOM.createRoot(mountPoint).render(<App />);
    };
  }
}

customElements.define("visa-checkout", CustomWebComponent);
