import * as React from "react";
import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Home from "./views/Home";

const themeConfig: ThemeConfig = {
  initialColorMode: "dark",
};
export const theme = extendTheme({ config: themeConfig });

const queryClient = new QueryClient();

export const App = () => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Home />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  </ChakraProvider>
);
