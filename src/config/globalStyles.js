import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
html,
body {
    padding: 0;
    margin: 0;
    font-family: 'Lato', sans-serif !important;
}

/* body {
    background-color: #fdfdfd !important;
    background: repeating-linear-gradient( 45deg, #d8ece9, #d8ece9 4.5px, #fdfdfd 4.5px, #fdfdfd 22.5px ) !important;
} */

a {
    color: inherit;
    text-decoration: none;
}

* {
    box-sizing: border-box;
    -ms-overflow-style: none;
  scrollbar-width: 8px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
}

`;

export default GlobalStyles;
