import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import React from "react";

const override = css`
  display: block;
  margin: 10% auto;
  border-color: red;
`;

const LoadingComponent = ({ size, color }) => {
  return <ClipLoader css={override} size={size} color={color} />;
};

export default LoadingComponent;
