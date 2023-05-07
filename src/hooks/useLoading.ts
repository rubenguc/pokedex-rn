import { useState } from "react";

export const useLoading = (initialState: boolean = false) => {
  const [isLoading, setisLoading] = useState(initialState);

  const startLoading = () => setisLoading(true);
  const stopLoading = () => setisLoading(false);

  return {
    isLoading,
    startLoading,
    stopLoading,
  };
};
