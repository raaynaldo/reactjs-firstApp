import React, { useState } from "react";

const errorBoundary = (props) => {
  const [errorState, setErrorState] = useState({
    hasError: false,
    errorMessage: "",
  });

  const componentDidCatch = (error, info) => {
    setErrorState({
      hasError: true,
      errorMessage: error,
    });
  };

  if (errorState.hasError) {
    return <h1>Something went wrong</h1>;
  } else {
    return props.children;
  }
};

export default errorBoundary;
