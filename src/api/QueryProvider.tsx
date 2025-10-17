import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./query";

const CustomQueryClientProvider: React.FunctionComponent<{
  children: React.ReactNode;
  showDevTools?: boolean;
}> = ({ children, showDevTools = true }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {showDevTools && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};

export default CustomQueryClientProvider;
