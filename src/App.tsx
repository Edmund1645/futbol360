import * as React from "react";
import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Home from "./views/Home";

const themeConfig: ThemeConfig = {
  initialColorMode: "dark",
};
export const theme = extendTheme({ config: themeConfig });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 60 * 60 * 1000, // 1hr because the data barely changes
      refetchOnWindowFocus: false,
    },
  },
});

export const App = () => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Home />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  </ChakraProvider>
);
