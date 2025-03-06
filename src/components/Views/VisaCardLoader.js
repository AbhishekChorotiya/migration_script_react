import React from "react";
// import ClickToPayLogo from "./ClickToPayLogo";

const VisaSrcLoader = ({ cardBrandsArr }) => {
  return (
    <>
      <style>
        {`
                    @keyframes card-bounce {
                        0% {
                            animation-timing-function: cubic-bezier(0.17, 0.17, 0.32, 1);
                            -webkit-translate: 0 -60%;
                            -moz-translate: 0 -60%;
                            -ms-translate: 0 -60%;
                            translate: 0 -60%
                        }

                        9.70874% {
                            animation-timing-function: cubic-bezier(0.41, 0, 0.49, 1);
                            -webkit-translate: 0 8.5%;
                            -moz-translate: 0 8.5%;
                            -ms-translate: 0 8.5%;
                            translate: 0 8.5%
                        }

                        23.4466% {
                            animation-timing-function: cubic-bezier(0.29, 0, 0.26, 1);
                            -webkit-translate: 0 -22.5%;
                            -moz-translate: 0 -22.5%;
                            -ms-translate: 0 -22.5%;
                            translate: 0 -22.5%
                        }

                        47.7184% {
                            -webkit-translate: 0;
                            -moz-translate: 0;
                            -ms-translate: 0;
                            translate: 0
                        }

                        63.8835% {
                            animation-timing-function: cubic-bezier(1, 0, 0.78, 1);
                            -webkit-translate: 0;
                            -moz-translate: 0;
                            -ms-translate: 0;
                            translate: 0
                        }

                        86.5534% {
                            -webkit-translate: 0 40.7%;
                            -moz-translate: 0 40.7%;
                            -ms-translate: 0 40.7%;
                            translate: 0 40.7%
                        }

                        to {
                            -webkit-translate: 0 40.7%;
                            -moz-translate: 0 40.7%;
                            -ms-translate: 0 40.7%;
                            translate: 0 40.7%
                        }
                    }

                    @keyframes card-fade-100 {
                        0% {
                            animation-timing-function: linear;
                            opacity: 0
                        }

                        8.1068% {
                            opacity: 1
                        }

                        78.4466% {
                            opacity: 1
                        }

                        86.5534% {
                            opacity: 0
                        }

                        to {
                            opacity: 0
                        }
                    }

                    @keyframes card-fade-60 {
                        0% {
                            animation-timing-function: linear;
                            opacity: 0
                        }

                        8.1068% {
                            opacity: .6
                        }

                        78.4466% {
                            opacity: .6
                        }

                        86.5534% {
                            opacity: 0
                        }

                        to {
                            opacity: 0
                        }
                    }

                    @keyframes card-fade-20 {
                        0% {
                            animation-timing-function: linear;
                            opacity: 0
                        }

                        8.1068% {
                            opacity: .2
                        }

                        78.4466% {
                            opacity: .2
                        }

                        86.5534% {
                            opacity: 0
                        }

                        to {
                            opacity: 0
                        }
                    }

                    .card-animation-layer-1 {
                        animation: card-bounce 2.06s linear infinite both, card-fade-100 2.06s linear infinite both;
                        animation-delay: 0.1s;
                        opacity: 1;
                        z-index: 3;
                        background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%271064%27 height=%27466%27 fill=%27none%27%3E%3Cpath fill=%27%23fff%27 fill-rule=%27evenodd%27 d=%27m895.31 228.862-46.416-10.988c-1.172-.381-2.528-.481-3.565-.203-1.582.424-1.825 1.567-.543 2.554.676.52 1.641.893 2.634 1.067l42.816 10.545-.537 21.742-2.328.624-6.897 1.848 1.146-20.056q.002-.019.003-.037h.005c.061-.536-.274-1.054-.864-1.494-.563-.447-1.399-.831-2.462-1.065l-.003.001-.072-.016-46.587-10.849-.032-.008c-1.18-.39-2.554-.496-3.601-.215l-16.926 4.535c-1.582.424-1.825 1.568-.542 2.555.389.299.859.593 1.407.742l44.453 10.938-.526 19.429c-.021.101.234 2.007-2.662 2.783l-22.831 6.118c-3.105.832-7.644.01-10.253-1.998l-32.227-24.8c-2.271-1.748-2.029-4.233 1.146-5.083l14.204-3.806c1.674-.449 1.938-1.481.58-2.526s-3.556-1.501-5.23-1.053l-14.297 3.879c-6.795 1.82-6.817 6.539-2.199 10.093l32.275 24.837c4.972 3.826 14.615 5.636 20.567 4.042l22.824-6.116c1.151-.309 2.067-.696 2.797-1.118q.156-.091.301-.183c2.32-1.48 2.521-3.296 2.528-3.671l1.19-21.406c.081-.992-1.14-2.073-3.289-2.548l-.003.002-.072-.017-39.385-9.196 7.065-1.893 2.329-.624 41.998 10.256-.496 22.836q0 .01.093.032c.113.304.361.618.75.918 1.283.987 3.605 1.443 5.187 1.02l16.925-4.535c1.048-.281 1.507-.878 1.326-1.536l1.612-23.779.002-.037.005-.001c.123-1.083-1.369-2.092-3.323-2.539%27/%3E%3Cpath stroke=%27%23fff%27 d=%27m895.31 228.862-46.416-10.988c-1.172-.381-2.528-.481-3.565-.203-1.582.424-1.825 1.567-.543 2.554.676.52 1.641.893 2.634 1.067l42.816 10.545-.537 21.742-2.328.624-6.897 1.848 1.146-20.056q.002-.019.003-.037h.005c.061-.536-.274-1.054-.864-1.494-.563-.447-1.399-.831-2.462-1.065l-.003.001-.072-.016-46.587-10.849-.032-.008c-1.18-.39-2.554-.496-3.601-.215l-16.926 4.535c-1.582.424-1.825 1.568-.542 2.555.389.299.859.593 1.407.742l44.453 10.938-.526 19.429c-.021.101.234 2.007-2.662 2.783l-22.831 6.118c-3.105.832-7.644.01-10.253-1.998l-32.227-24.8c-2.271-1.748-2.029-4.233 1.146-5.083l14.204-3.806c1.674-.449 1.938-1.481.58-2.526s-3.556-1.501-5.23-1.053l-14.297 3.879c-6.795 1.82-6.817 6.539-2.199 10.093l32.275 24.837c4.972 3.826 14.615 5.636 20.567 4.042l22.824-6.116c1.151-.309 2.067-.696 2.797-1.118q.156-.091.301-.183c2.32-1.48 2.521-3.296 2.528-3.671l1.19-21.406c.081-.992-1.14-2.073-3.289-2.548l-.003.002-.072-.017-39.385-9.196 7.065-1.893 2.329-.624 41.998 10.256-.496 22.836q0 .01.093.032c.113.304.361.618.75.918 1.283.987 3.605 1.443 5.187 1.02l16.925-4.535c1.048-.281 1.507-.878 1.326-1.536l1.612-23.779.002-.037.005-.001c.123-1.083-1.369-2.092-3.323-2.539%27/%3E%3Cpath fill=%27%23fff%27 fill-opacity=%27.9%27 fill-rule=%27evenodd%27 d=%27M418.95 242.813c-1.166.08-3.042-.372-4.121-.994-.702-.405-.941-.755-1.527-2.243-2.373-6.017-6.517-11.028-13.679-16.54-6.921-5.325-13.863-9.053-24.178-12.987-2.215-.844-4.182-1.652-4.368-1.795-.687-.528-.979-1.482-.612-1.986.505-.691 2.349-1.081 3.824-.809.567.103 2.521.743 4.345 1.421 7.215 2.687 13.99 5.937 20.009 9.598 3.723 2.267 9.803 6.823 12.219 9.164 4.462 4.317 7.493 8.422 9.4 12.73 1.153 2.604 1.269 3.77.4 4.003a2.4 2.4 0 0 0-.548.23c-.132.08-.653.173-1.164.208m-16.069-.701c-1.791.122-4.29-.719-4.965-1.671-.163-.23-.697-1.349-1.19-2.485-2.083-4.815-6.346-9.43-12.427-13.455-4.994-3.305-8.797-5.218-15.392-7.737-4.424-1.69-4.929-2-5.087-3.117-.146-1.06 1.961-1.804 4.061-1.431 1.457.258 8.467 2.972 11.969 4.634 11.594 5.498 19.993 12.484 23.913 19.889 2.008 3.792 1.779 5.192-.882 5.373m-16.492-.659c-1.224-.015-2.768-.406-3.758-.951-.603-.332-.912-.797-1.614-2.437-2.575-6.024-8.768-10.833-18.898-14.676-4.447-1.688-5.038-2.104-4.718-3.324.158-.605.358-.757 1.34-1.02 1.642-.44 3.175-.146 7.121 1.365 6.068 2.325 10.298 4.621 14.525 7.881 4.345 3.352 6.465 5.882 8.069 9.62.915 2.141.839 2.79-.389 3.282-.375.149-1.131.266-1.678.26m-15.379-.611c-.949.006-2.546-.385-3.476-.851-1.035-.519-1.424-1.045-1.796-2.434-.477-1.786-1.147-2.632-3.558-4.488s-3.719-2.531-6.931-3.584c-1.089-.356-2.302-.809-2.698-1.003-1.658-.818-1.914-2.296-.508-2.936 1.187-.544 2.67-.406 5.617.522 8.533 2.685 14.934 7.611 15.941 12.27.357 1.645-.521 2.495-2.591 2.504%27/%3E%3Crect width=%27110%27 height=%2774%27 fill=%27url%28%23a%29%27 rx=%2710%27 transform=%27matrix%28.96593 -.25882 .7925 .60987 199.717 245.906%29%27/%3E%3Cg stroke=%27%23000%27 stroke-opacity=%27.8%27 stroke-width=%272%27%3E%3Cpath d=%27m233.447 236.868 46.846 36.05c.876.673.72 1.451-.347 1.737l-31.799 8.521M266.657 262.424l-33.731 9.038m17.126-21.816-33.73 9.038m115.215 13.423-46.846-36.05c-.875-.673-.72-1.451.347-1.737l31.799-8.52M298.327 246.551l33.731-9.038m-17.126 21.816 33.731-9.038%27/%3E%3Crect width=%27112%27 height=%2776%27 x=%27-1.758%27 y=%27-.351%27 rx=%2711%27 style=%27mix-blend-mode:soft-light%27 transform=%27matrix%28.96593 -.25882 .7925 .60987 199.935 245.314%29%27/%3E%3C/g%3E%3Cdefs%3E%3ClinearGradient id=%27a%27 x1=%27-12.604%27 x2=%2799.193%27 y1=%270%27 y2=%2788.114%27 gradientUnits=%27userSpaceOnUse%27%3E%3Cstop stop-color=%27%23fff%27/%3E%3Cstop offset=%27.484%27 stop-color=%27%23b3b3b3%27/%3E%3Cstop offset=%271%27 stop-color=%27%23fff%27/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E") 0 0 no-repeat,url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%271064%27 height=%27466%27 fill=%27none%27%3E%3Cg clip-path=%27url%28%23a%29%27%3E%3Crect width=%27728%27 height=%27455%27 fill=%27url%28%23b%29%27 rx=%2724%27 transform=%27matrix%28.96593 -.25882 .7925 .60987 0 188.42%29%27/%3E%3Cg fill=%27%23033783%27%3E%3Cpath fill-opacity=%27.2%27 d=%27M638.209-50.009C376.564 99.506 477.408 320.518 560.535 412.335L1063.78 277.49z%27/%3E%3Cpath fill-opacity=%27.4%27 d=%27M711.119 6.099C494.132 130.043 577.63 313.21 646.503 389.3l417.277-111.81z%27/%3E%3C/g%3E%3Cpath fill=%27%23003780%27 d=%27M791.162 67.695C624.04 163.343 688.839 304.87 742.129 363.677l321.651-86.187z%27/%3E%3C/g%3E%3Cdefs%3E%3ClinearGradient id=%27b%27 x1=%2772.545%27 x2=%27249.224%27 y1=%2726.435%27 y2=%27498.002%27 gradientUnits=%27userSpaceOnUse%27%3E%3Cstop stop-color=%27%233382ea%27/%3E%3Cstop offset=%271%27 stop-color=%27%23003ea9%27/%3E%3C/linearGradient%3E%3CclipPath id=%27a%27%3E%3Crect width=%27728%27 height=%27455%27 fill=%27%23fff%27 rx=%2724%27 transform=%27matrix%28.96593 -.25882 .7925 .60987 0 188.42%29%27/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E") 0 0 no-repeat;
                    }

                    .card-animation-layer-2, .card-animation-layer-3 {
                        background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%271064%27 height=%27466%27 fill=%27none%27%3E%3Cg clip-path=%27url%28%23a%29%27%3E%3Crect width=%27728%27 height=%27455%27 fill=%27url%28%23b%29%27 rx=%2724%27 transform=%27matrix%28.96593 -.25882 .7925 .60987 0 188.42%29%27/%3E%3Cg fill=%27%23033783%27%3E%3Cpath fill-opacity=%27.2%27 d=%27M638.209-50.009C376.564 99.506 477.408 320.518 560.535 412.335L1063.78 277.49z%27/%3E%3Cpath fill-opacity=%27.4%27 d=%27M711.119 6.099C494.132 130.043 577.63 313.21 646.503 389.3l417.277-111.81z%27/%3E%3C/g%3E%3Cpath fill=%27%23003780%27 d=%27M791.162 67.695C624.04 163.343 688.839 304.87 742.129 363.677l321.651-86.187z%27/%3E%3C/g%3E%3Cdefs%3E%3ClinearGradient id=%27b%27 x1=%2772.545%27 x2=%27249.224%27 y1=%2726.435%27 y2=%27498.002%27 gradientUnits=%27userSpaceOnUse%27%3E%3Cstop stop-color=%27%233382ea%27/%3E%3Cstop offset=%271%27 stop-color=%27%23003ea9%27/%3E%3C/linearGradient%3E%3CclipPath id=%27a%27%3E%3Crect width=%27728%27 height=%27455%27 fill=%27%23fff%27 rx=%2724%27 transform=%27matrix%28.96593 -.25882 .7925 .60987 0 188.42%29%27/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E") 0 0 no-repeat;
                    }

                    .card-animation-layer-2 {
                        animation: card-bounce 2.06s linear infinite both, card-fade-60 2.06s linear infinite both;
                        animation-delay: 50ms;
                        opacity: 0.6;
                        transform: translateY(25%);
                        z-index: 2;
                    }

                    .card-animation-layer-3 {
                        animation: card-bounce 2.06s linear infinite both, card-fade-20 2.06s linear infinite both;
                        opacity: 0.2;
                        transform: translateY(50%);
                        z-index: 1;
                    }
                `}
      </style>
      <div class="bg-white flex flex-col w-full h-full justify-center items-center relative">
        <div class="mx-auto text-center mb-8">
          Click to Pay is looking for your linked cards...
        </div>
        <div className="w-full h-fit relative">
          <div
            style={{ height: "200px", filter: "grayscale(90%)" }}
            class="relative flex items-center justify-center w-full mb-12"
          >
            <div
              style={{ width: "140px", backgroundSize: "contain" }}
              class="absolute w-full h-28  card-animation-layer-1"
            ></div>
            <div
              style={{ width: "140px", backgroundSize: "contain" }}
              class="absolute w-full h-28  card-animation-layer-2"
            ></div>
            <div
              style={{ width: "140px", backgroundSize: "contain" }}
              class="absolute w-full h-28  card-animation-layer-3"
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisaSrcLoader;
