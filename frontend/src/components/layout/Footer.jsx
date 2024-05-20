import { Link } from "react-router-dom";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="flex justify-around font-sans">
          <div>
            <h2 className="font-bold text-2xl">About us</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p>
                <strong>Địa chỉ:</strong> 01 Võ Văn Ngân, Linh Chiểu, Thủ Đức,
                Thành phố Hồ Chí Minh
              </p>

              <p>
                <strong>Hotline:</strong> +84 123 456 78
              </p>
              <p>
                <strong>Email:</strong> cskh@vita.com
              </p>
            </div>

            <ul
              className="ftco-footer-social list-unstyled"
              style={{ display: "flex" }}
            >
              <li style={{ marginRight: "10px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-facebook"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                </svg>
              </li>
              <li style={{ marginRight: "10px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-twitter-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                </svg>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-instagram"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                </svg>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-2xl">Link</h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Link to="/shop" style={{ textDecoration: "none" }}>
                Shop
              </Link>
              <Link to="/cart" style={{ textDecoration: "none" }}>
                Cart
              </Link>
            </div>
          </div>
          <div>
            <h2 className="font-bold text-2xl">Payment</h2>
            <div style={{ display: "flex" }}>
              <svg
                version="1.1"
                width="32"
                height="32"
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  stroke: "none",
                  strokeWidth: 0,
                  fill: "none",
                  fillRule: "nonzero",
                  opacity: 1,
                  marginRight: "10px",
                }}
              >
                <g
                  transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                  style={{
                    stroke: "none",
                    strokeWidth: 1,
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                >
                  <path
                    d="M 84.83 72.913 H 5.17 c -2.855 0 -5.17 -2.315 -5.17 -5.17 V 22.257 c 0 -2.855 2.315 -5.17 5.17 -5.17 h 79.66 c 2.855 0 5.17 2.315 5.17 5.17 v 45.485 C 90 70.598 87.685 72.913 84.83 72.913 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      fill: "rgb(54,59,56)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                  />
                  <path
                    d="M 84.83 17.087 h -1.404 v 23.531 c 0 16.021 -12.987 29.008 -29.008 29.008 H 0.366 c 0.754 1.922 2.615 3.287 4.804 3.287 h 79.66 c 2.855 0 5.17 -2.315 5.17 -5.17 V 22.257 C 90 19.402 87.685 17.087 84.83 17.087 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      fill: "rgb(46,50,47)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                  />
                  <path
                    d="M 18.972 35.272 H 7.931 c -1.173 0 -2.123 -0.951 -2.123 -2.123 v -5.945 c 0 -1.173 0.951 -2.123 2.123 -2.123 h 11.041 c 1.173 0 2.123 0.951 2.123 2.123 v 5.945 C 21.095 34.321 20.145 35.272 18.972 35.272 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      fill: "rgb(234,165,0)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                  />
                  <path
                    d="M 19.885 46.116 H 7.018 c -0.617 0 -1.117 -0.499 -1.117 -1.117 s 0.5 -1.117 1.117 -1.117 h 12.868 c 0.617 0 1.117 0.499 1.117 1.117 S 20.502 46.116 19.885 46.116 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      fill: "rgb(84,92,86)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                  />
                  <path
                    d="M 38.684 46.116 H 25.817 c -0.617 0 -1.117 -0.499 -1.117 -1.117 s 0.5 -1.117 1.117 -1.117 h 12.868 c 0.617 0 1.117 0.499 1.117 1.117 S 39.301 46.116 38.684 46.116 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      fill: "rgb(84,92,86)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                  />
                  <path
                    d="M 57.484 46.116 H 44.615 c -0.617 0 -1.117 -0.499 -1.117 -1.117 s 0.499 -1.117 1.117 -1.117 h 12.869 c 0.617 0 1.117 0.499 1.117 1.117 S 58.101 46.116 57.484 46.116 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      fill: "rgb(84,92,86)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                  />
                  <path
                    d="M 76.283 46.116 H 63.414 c -0.617 0 -1.117 -0.499 -1.117 -1.117 s 0.499 -1.117 1.117 -1.117 h 12.869 c 0.617 0 1.117 0.499 1.117 1.117 S 76.9 46.116 76.283 46.116 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      fill: "rgb(84,92,86)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                  />
                  <path
                    d="M 31.052 65.099 H 7.018 c -0.617 0 -1.117 -0.499 -1.117 -1.117 c 0 -0.617 0.5 -1.117 1.117 -1.117 h 24.034 c 0.617 0 1.117 0.499 1.117 1.117 C 32.169 64.6 31.669 65.099 31.052 65.099 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      fill: "rgb(84,92,86)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                  />
                  <path
                    d="M 31.052 58.399 h -8.401 c -0.617 0 -1.117 -0.499 -1.117 -1.117 s 0.5 -1.117 1.117 -1.117 h 8.401 c 0.617 0 1.117 0.499 1.117 1.117 S 31.669 58.399 31.052 58.399 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      fill: "rgb(84,92,86)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                  />
                  <path
                    d="M 73.658 55.457 c -1.58 0 -2.974 0.734 -3.908 1.862 c -0.935 -1.128 -2.329 -1.862 -3.908 -1.862 c -2.814 0 -5.096 2.282 -5.096 5.096 c 0 2.814 2.282 5.096 5.096 5.096 c 1.58 0 2.974 -0.734 3.908 -1.862 c 0.935 1.128 2.329 1.862 3.908 1.862 c 2.814 0 5.096 -2.282 5.096 -5.096 C 78.754 57.738 76.472 55.457 73.658 55.457 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      fill: "rgb(84,92,86)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                  />
                  <path
                    d="M 70.668 64.649 c 0.838 0.622 1.865 0.999 2.99 0.999 c 2.814 0 5.096 -2.282 5.096 -5.096 c 0 -1.064 -0.328 -2.05 -0.885 -2.867 C 75.889 60.401 73.454 62.762 70.668 64.649 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      fill: "rgb(73,79,74)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                  />
                </g>
              </svg>

              <svg
                version="1.1"
                width="32"
                height="32"
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
                xmlSpace="preserve"
                style={{ marginRight: "10px" }}
              >
                <defs></defs>
                <g
                  transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                  style={{
                    stroke: "none",
                    strokeWidth: 0,
                    fill: "none",
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                >
                  <path
                    d="M 84.259 16.068 H 5.741 C 2.57 16.068 0 18.638 0 21.809 v 6.131 v 2 V 60.06 v 2 v 6.131 c 0 3.171 2.57 5.741 5.741 5.741 h 78.518 c 3.171 0 5.741 -2.57 5.741 -5.741 V 62.06 v -2 V 29.94 v -2 v -6.131 C 90 18.638 87.43 16.068 84.259 16.068 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      fill: "rgb(99,91,255)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 4 68.191 V 62.06 v -2 V 29.94 v -2 v -6.131 c 0 -3.171 2.57 -5.741 5.741 -5.741 h -4 C 2.57 16.068 0 18.638 0 21.809 v 6.131 V 62.06 v 6.131 c 0 3.171 2.57 5.741 5.741 5.741 h 4 C 6.57 73.932 4 71.362 4 68.191 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      fill: "rgb(89,82,228)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 75 45.417 c 0 -4.267 -2.067 -7.633 -6.017 -7.633 c -3.967 0 -6.367 3.367 -6.367 7.6 c 0 5.017 2.833 7.55 6.9 7.55 c 1.983 0 3.483 -0.45 4.617 -1.083 v -3.333 C 73 49.083 71.7 49.433 70.05 49.433 c -1.617 0 -3.05 -0.567 -3.233 -2.533 h 8.15 C 74.967 46.683 75 45.817 75 45.417 z M 66.767 43.833 c 0 -1.883 1.15 -2.667 2.2 -2.667 c 1.017 0 2.1 0.783 2.1 2.667 H 66.767 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      fill: "rgb(249,249,249)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 56.183 37.783 c -1.633 0 -2.683 0.767 -3.267 1.3 L 52.7 38.05 h -3.667 v 19.433 L 53.2 56.6 l 0.017 -4.717 c 0.6 0.433 1.483 1.05 2.95 1.05 c 2.983 0 5.7 -2.4 5.7 -7.683 C 61.85 40.417 59.1 37.783 56.183 37.783 z M 55.183 49.267 c -0.983 0 -1.567 -0.35 -1.967 -0.783 L 53.2 42.3 c 0.433 -0.483 1.033 -0.817 1.983 -0.817 c 1.517 0 2.567 1.7 2.567 3.883 C 57.75 47.6 56.717 49.267 55.183 49.267 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      fill: "rgb(249,249,249)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                    strokeLinecap="round"
                  />
                  <polygon
                    points="43.3,36.8 47.48,35.9 47.48,32.52 43.3,33.4"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      fill: "rgb(249,249,249)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                  />
                  <rect
                    x="43.3"
                    y="38.07"
                    width="4.18"
                    height="14.58"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      fill: "rgb(249,249,249)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                  />
                  <path
                    d="M 38.817 39.3 l -0.267 -1.233 h -3.6 V 52.65 h 4.167 v -9.883 c 0.983 -1.283 2.65 -1.05 3.167 -0.867 v -3.833 C 41.75 37.867 39.8 37.5 38.817 39.3 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      fill: "rgb(249,249,249)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 30.483 34.45 l -4.067 0.867 L 26.4 48.667 c 0 2.467 1.85 4.283 4.317 4.283 c 1.367 0 2.367 -0.25 2.917 -0.55 v -3.383 C 33.1 49.233 30.467 50 30.467 47.533 v -5.917 h 3.167 v -3.55 h -3.167 L 30.483 34.45 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      fill: "rgb(249,249,249)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 19.217 42.3 c 0 -0.65 0.533 -0.9 1.417 -0.9 c 1.267 0 2.867 0.383 4.133 1.067 V 38.55 c -1.383 -0.55 -2.75 -0.767 -4.133 -0.767 C 17.25 37.783 15 39.55 15 42.5 c 0 4.6 6.333 3.867 6.333 5.85 c 0 0.767 -0.667 1.017 -1.6 1.017 c -1.383 0 -3.15 -0.567 -4.55 -1.333 V 52 c 1.55 0.667 3.117 0.95 4.55 0.95 c 3.467 0 5.85 -1.717 5.85 -4.7 C 25.567 43.283 19.217 44.167 19.217 42.3 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      fill: "rgb(249,249,249)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                    strokeLinecap="round"
                  />
                </g>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width="32"
                height="32"
                viewBox="0 0 256 256"
                xmlSpace="preserve"
                style={{ marginRight: "10px" }}
              >
                <defs></defs>
                <g
                  style={{
                    stroke: "none",
                    strokeWidth: 0,
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fill: "none",
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                  transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                >
                  <path
                    d="M 84.259 16.068 H 5.741 C 2.57 16.068 0 18.638 0 21.809 v 6.131 v 2 V 60.06 v 2 v 6.131 c 0 3.171 2.57 5.741 5.741 5.741 h 78.518 c 3.171 0 5.741 -2.57 5.741 -5.741 V 62.06 v -2 V 29.94 v -2 v -6.131 C 90 18.638 87.43 16.068 84.259 16.068 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(59,55,55)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                  />
                  <path
                    d="M 19.895 65.192 v -4.057 c 0 -1.552 -0.945 -2.568 -2.568 -2.568 c -0.811 0 -1.694 0.268 -2.3 1.15 c -0.473 -0.74 -1.15 -1.15 -2.166 -1.15 c -0.677 0 -1.355 0.205 -1.891 0.945 v -0.811 H 9.552 v 6.491 h 1.418 v -3.584 c 0 -1.15 0.607 -1.694 1.552 -1.694 c 0.945 0 1.418 0.607 1.418 1.694 v 3.584 h 1.418 v -3.584 c 0 -1.15 0.677 -1.694 1.552 -1.694 c 0.945 0 1.418 0.607 1.418 1.694 v 3.584 L 19.895 65.192 L 19.895 65.192 z M 40.928 58.701 h -2.3 V 56.74 H 37.21 v 1.962 h -1.284 v 1.284 h 1.284 v 2.978 c 0 1.489 0.607 2.363 2.229 2.363 c 0.607 0 1.284 -0.205 1.757 -0.473 l -0.41 -1.221 c -0.41 0.268 -0.882 0.339 -1.221 0.339 c -0.677 0 -0.945 -0.41 -0.945 -1.079 v -2.907 h 2.3 v -1.284 H 40.928 z M 52.965 58.559 c -0.811 0 -1.355 0.41 -1.694 0.945 v -0.811 h -1.418 v 6.491 h 1.418 v -3.655 c 0 -1.079 0.473 -1.694 1.355 -1.694 c 0.268 0 0.607 0.071 0.882 0.134 l 0.41 -1.355 C 53.634 58.559 53.232 58.559 52.965 58.559 L 52.965 58.559 z M 34.775 59.237 c -0.677 -0.473 -1.623 -0.677 -2.639 -0.677 c -1.623 0 -2.702 0.811 -2.702 2.095 c 0 1.079 0.811 1.694 2.229 1.891 l 0.677 0.071 c 0.74 0.134 1.15 0.339 1.15 0.677 c 0 0.473 -0.544 0.811 -1.489 0.811 c -0.945 0 -1.694 -0.339 -2.166 -0.677 l -0.677 1.079 c 0.74 0.544 1.757 0.811 2.773 0.811 c 1.891 0 2.978 -0.882 2.978 -2.095 c 0 -1.15 -0.882 -1.757 -2.229 -1.962 l -0.677 -0.071 c -0.607 -0.071 -1.079 -0.205 -1.079 -0.607 c 0 -0.473 0.473 -0.74 1.221 -0.74 c 0.811 0 1.623 0.339 2.032 0.544 L 34.775 59.237 L 34.775 59.237 z M 72.501 58.559 c -0.811 0 -1.355 0.41 -1.694 0.945 v -0.811 h -1.418 v 6.491 h 1.418 v -3.655 c 0 -1.079 0.473 -1.694 1.355 -1.694 c 0.268 0 0.607 0.071 0.882 0.134 l 0.41 -1.339 C 73.178 58.559 72.777 58.559 72.501 58.559 L 72.501 58.559 z M 54.383 61.947 c 0 1.962 1.355 3.379 3.45 3.379 c 0.945 0 1.623 -0.205 2.3 -0.74 l -0.677 -1.15 c -0.544 0.41 -1.079 0.607 -1.694 0.607 c -1.15 0 -1.962 -0.811 -1.962 -2.095 c 0 -1.221 0.811 -2.032 1.962 -2.095 c 0.607 0 1.15 0.205 1.694 0.607 l 0.677 -1.15 c -0.677 -0.544 -1.355 -0.74 -2.3 -0.74 C 55.738 58.559 54.383 59.985 54.383 61.947 L 54.383 61.947 L 54.383 61.947 z M 67.499 61.947 v -3.246 h -1.418 v 0.811 c -0.473 -0.607 -1.15 -0.945 -2.032 -0.945 c -1.828 0 -3.246 1.418 -3.246 3.379 s 1.418 3.379 3.246 3.379 c 0.945 0 1.623 -0.339 2.032 -0.945 v 0.811 h 1.418 V 61.947 L 67.499 61.947 z M 62.292 61.947 c 0 -1.15 0.74 -2.095 1.962 -2.095 c 1.15 0 1.962 0.882 1.962 2.095 c 0 1.15 -0.811 2.095 -1.962 2.095 C 63.04 63.971 62.292 63.089 62.292 61.947 L 62.292 61.947 z M 45.323 58.559 c -1.891 0 -3.246 1.355 -3.246 3.379 c 0 2.032 1.355 3.379 3.316 3.379 c 0.945 0 1.891 -0.268 2.639 -0.882 l -0.677 -1.016 c -0.544 0.41 -1.221 0.677 -1.891 0.677 c -0.882 0 -1.757 -0.41 -1.961 -1.552 h 4.797 c 0 -0.205 0 -0.339 0 -0.544 C 48.364 59.914 47.143 58.559 45.323 58.559 L 45.323 58.559 L 45.323 58.559 z M 45.323 59.78 c 0.882 0 1.489 0.544 1.623 1.552 h -3.379 C 43.701 60.458 44.307 59.78 45.323 59.78 L 45.323 59.78 z M 80.552 61.947 v -5.814 h -1.418 v 3.379 c -0.473 -0.607 -1.15 -0.945 -2.032 -0.945 c -1.828 0 -3.246 1.418 -3.246 3.379 s 1.418 3.379 3.246 3.379 c 0.945 0 1.623 -0.339 2.032 -0.945 v 0.811 h 1.418 V 61.947 L 80.552 61.947 z M 75.345 61.947 c 0 -1.15 0.74 -2.095 1.962 -2.095 c 1.15 0 1.962 0.882 1.962 2.095 c 0 1.15 -0.811 2.095 -1.962 2.095 C 76.085 63.971 75.345 63.089 75.345 61.947 L 75.345 61.947 z M 27.875 61.947 v -3.246 h -1.418 v 0.811 c -0.473 -0.607 -1.15 -0.945 -2.032 -0.945 c -1.828 0 -3.246 1.418 -3.246 3.379 s 1.418 3.379 3.246 3.379 c 0.945 0 1.623 -0.339 2.032 -0.945 v 0.811 h 1.418 V 61.947 L 27.875 61.947 z M 22.605 61.947 c 0 -1.15 0.74 -2.095 1.962 -2.095 c 1.15 0 1.962 0.882 1.962 2.095 c 0 1.15 -0.811 2.095 -1.962 2.095 C 23.345 63.971 22.605 63.089 22.605 61.947 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(212,212,212)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                  />
                  <rect
                    x="38.6"
                    y="26.91"
                    rx="0"
                    ry="0"
                    width="12.72"
                    height="22.86"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(255,90,0)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                  />
                  <path
                    d="M 39.451 38.339 c 0 -4.645 2.184 -8.767 5.534 -11.43 c -2.466 -1.939 -5.576 -3.111 -8.969 -3.111 c -8.038 0 -14.541 6.503 -14.541 14.541 S 27.978 52.88 36.015 52.88 c 3.393 0 6.503 -1.172 8.969 -3.111 C 41.629 47.143 39.451 42.983 39.451 38.339 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(235,0,27)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                  />
                  <path
                    d="M 68.495 38.339 c 0 8.038 -6.503 14.541 -14.541 14.541 c -3.393 0 -6.503 -1.172 -8.969 -3.111 c 3.393 -2.668 5.534 -6.786 5.534 -11.43 s -2.184 -8.767 -5.534 -11.43 c 2.461 -1.939 5.572 -3.111 8.965 -3.111 C 61.992 23.798 68.495 30.343 68.495 38.339 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(247,158,27)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                  />
                  <path
                    d="M 4 68.191 V 62.06 v -2 V 29.94 v -2 v -6.131 c 0 -3.171 2.57 -5.741 5.741 -5.741 h -4 C 2.57 16.068 0 18.638 0 21.809 v 6.131 V 62.06 v 6.131 c 0 3.171 2.57 5.741 5.741 5.741 h 4 C 6.57 73.932 4 71.362 4 68.191 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(46,42,42)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                  />
                </g>
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="32"
                height="32"
                viewBox="0 0 256 256"
              >
                <defs></defs>
                <g
                  style={{
                    stroke: "none",
                    strokeWidth: 0,
                    strokeDasharray: "none",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fill: "none",
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                  transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                >
                  <polygon
                    points="89,18.08 89,73.03 36,73.03 14.88,73.03 14.88,46.13 14.88,18.08"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(209,161,132)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                  />
                  <path
                    d="M 33.589 76.99 H 6.583 c -1.332 0 -2.411 -1.08 -2.411 -2.411 v -2.893 c 0 -1.332 1.08 -2.411 2.411 -2.411 h 27.005 c 1.332 0 2.411 1.08 2.411 2.411 v 2.893 C 36 75.91 34.92 76.99 33.589 76.99 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(255,236,128)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 30.417 69.274 H 3.411 C 2.08 69.274 1 68.195 1 66.863 v -2.893 c 0 -1.332 1.08 -2.411 2.411 -2.411 h 27.005 c 1.332 0 2.411 1.08 2.411 2.411 v 2.893 C 32.828 68.195 31.748 69.274 30.417 69.274 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(255,236,128)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 33.589 61.558 H 6.583 c -1.332 0 -2.411 -1.08 -2.411 -2.411 v -2.893 c 0 -1.332 1.08 -2.411 2.411 -2.411 h 27.005 c 1.332 0 2.411 1.08 2.411 2.411 v 2.893 C 36 60.479 34.92 61.558 33.589 61.558 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(255,236,128)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 30.417 53.842 H 3.411 C 2.08 53.842 1 52.763 1 51.431 v -2.893 c 0 -1.332 1.08 -2.411 2.411 -2.411 h 27.005 c 1.332 0 2.411 1.08 2.411 2.411 v 2.893 C 32.828 52.763 31.748 53.842 30.417 53.842 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(255,236,128)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 89 13.01 H 19.955 c -2.801 0 -5.072 2.271 -5.072 5.072 v 0 c 0 2.801 2.271 5.072 5.072 5.072 H 89 V 13.01 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(172,130,105)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 14.883 47.127 c -0.552 0 -1 -0.447 -1 -1 V 18.082 c 0 -0.552 0.448 -1 1 -1 s 1 0.448 1 1 v 28.045 C 15.883 46.68 15.436 47.127 14.883 47.127 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(0,0,0)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 89 74.035 H 36 c -0.552 0 -1 -0.447 -1 -1 s 0.448 -1 1 -1 h 52 V 23.154 c 0 -0.552 0.447 -1 1 -1 s 1 0.448 1 1 v 49.881 C 90 73.588 89.553 74.035 89 74.035 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(0,0,0)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 89 49.75 H 72.297 c -0.991 0 -1.794 -0.803 -1.794 -1.794 v -6.008 c 0 -0.991 0.803 -1.794 1.794 -1.794 H 89 V 49.75 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(172,130,105)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 89 50.75 H 72.297 c -1.541 0 -2.794 -1.254 -2.794 -2.795 v -6.007 c 0 -1.541 1.253 -2.794 2.794 -2.794 H 89 c 0.553 0 1 0.448 1 1 v 9.597 C 90 50.303 89.553 50.75 89 50.75 z M 72.297 41.153 c -0.438 0 -0.794 0.356 -0.794 0.794 v 6.007 c 0 0.438 0.356 0.795 0.794 0.795 H 88 v -7.597 H 72.297 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(0,0,0)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 89 24.154 H 19.955 c -3.348 0 -6.072 -2.724 -6.072 -6.072 s 2.724 -6.072 6.072 -6.072 H 89 c 0.553 0 1 0.448 1 1 v 10.144 C 90 23.706 89.553 24.154 89 24.154 z M 19.955 14.01 c -2.245 0 -4.072 1.827 -4.072 4.072 s 1.827 4.072 4.072 4.072 H 88 V 14.01 H 19.955 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(0,0,0)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 89 19.082 H 25.292 c -0.552 0 -1 -0.448 -1 -1 s 0.448 -1 1 -1 H 89 c 0.553 0 1 0.448 1 1 S 89.553 19.082 89 19.082 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(0,0,0)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 80.792 45.952 h -5.216 c -0.553 0 -1 -0.448 -1 -1 s 0.447 -1 1 -1 h 5.216 c 0.553 0 1 0.448 1 1 S 81.345 45.952 80.792 45.952 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(0,0,0)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 33.588 77.99 H 6.583 c -1.881 0 -3.411 -1.53 -3.411 -3.411 v -2.894 c 0 -1.881 1.53 -3.411 3.411 -3.411 h 27.005 c 1.881 0 3.411 1.53 3.411 3.411 v 2.894 C 37 76.46 35.469 77.99 33.588 77.99 z M 6.583 70.274 c -0.778 0 -1.411 0.633 -1.411 1.411 v 2.894 c 0 0.778 0.633 1.411 1.411 1.411 h 27.005 c 0.778 0 1.411 -0.633 1.411 -1.411 v -2.894 c 0 -0.778 -0.633 -1.411 -1.411 -1.411 H 6.583 z"
                    style={{
                      stroke: "none",
                      strokeWidth: 1,
                      strokeDasharray: "none",
                      strokeLinecap: "butt",
                      strokeLinejoin: "miter",
                      strokeMiterlimit: 10,
                      fill: "rgb(0,0,0)",
                      fillRule: "nonzero",
                      opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                    strokeLinecap="round"
                  />
                </g>
              </svg>
            </div>
          </div>
          <div>
            <h2 className="font-bold text-2xl">Introduce</h2>
            <p
              style={{
                fontSize: "15px",
                fontWeight: "normal",
                width: "250px",
              }}
            >
              <strong>Vita</strong> một trang web nhằm mục đích thương mại bán
              hàng quần áo thời trang dựa trên công nghệ MERN. Cung cấp trải
              nghiệm mua sắm trực tuyến thuận lợi cho người dùng.
            </p>
          </div>
        </div>
        <div className="self-center	">
          <p className="font-sans">Vita &copy; 2024. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
