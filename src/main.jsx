import ReactDOM from 'react-dom';

import App from './App.jsx';

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


// Create a QueryClient instance
const queryClient = new QueryClient();

// Let's say you want to add custom colors
const customTheme = extendTheme({
  styles: {
    global: {
      "h1, .h1, h2, .h2,h3, .h3": {
        marginTop: "25px",
        marginBottom: "12.5px",
      },
      "h4, .h4,h5, .h5, h6, .h6": {
        marginTop: "12.5px",
        marginBottom: "12.5px",
      },
      hr: {
        marginTop: "5px",
        marginBottom: "25px",
      },
      a: {
        color: "#2EB398",
      },
      "h1, .h1": { fontSize: "36px" },
      "h2, .h2": { fontSize: "30px" },
      "h3, .h3": { fontSize: "24px" },
      "h4, .h4": { fontSize: "18px" },
      "h5, .h5": { fontSize: "14px" },
      "h6, .h6": { fontSize: "12px" },
      img: {
        display: "initial"
      },
      "ul, ol": {
        paddingInlineStart: '40px'
      },
      body: {
        lineHeight: 1.78571
      }
    },
  },
});


ReactDOM.render(

  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </QueryClientProvider>,
  document.getElementById('root')

)  ;
