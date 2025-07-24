import React from "react";

interface CurrencyProps {
  currencyFill: string;
}

const Currency: React.FC<CurrencyProps> = ({ currencyFill }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M26.7326 11.2669C28.0829 9.75116 28.9127 9.07068 30.5425 8.21036V33.4496L26.7326 34.2369V11.2669Z"
      fill={currencyFill}
    />
    <path
      d="M38.9057 23.9559C39.6956 22.2888 39.7885 21.5478 40 19.8375L10.796 26.1788C10.1035 27.7215 9.88059 28.5838 9.77387 30.1152L38.9057 23.9559Z"
      fill={currencyFill}
    />
    <path
      d="M38.9057 31.6866C39.6956 30.0194 39.7885 29.2785 40 27.5682L26.872 30.3468C26.7791 31.875 26.8858 32.6591 26.7791 34.1906L38.9057 31.6866Z"
      fill={currencyFill}
    />
    <path
      d="M38.9057 39.4162C39.6956 37.749 39.7885 37.008 40 35.2977L28.0335 37.8954C27.4295 38.729 27.0578 40.1183 26.7791 41.9201L38.9057 39.4162Z"
      fill={currencyFill}
    />
    <path
      d="M19.9027 36.784C21.0642 35.3483 22.2722 33.5422 23.1085 32.0603L9.02212 35.1136C8.32958 36.6562 8.10666 37.5185 7.99994 39.05L19.9027 36.784Z"
      fill={currencyFill}
    />
    <path
      d="M19.2986 9.13657C20.6489 7.62087 21.4787 6.94039 23.1085 6.08008V32.1529L19.2986 32.9402V9.13657Z"
      fill={currencyFill}
    />
  </svg>
);

export default Currency;
