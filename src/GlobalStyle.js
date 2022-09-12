import { createGlobalStyle } from "styled-components";

export const GloblaStyle = createGlobalStyle`
body {
    color: ${(props) => (props.color ? "white" : "black")}
}
*,*:after, *:before{
    box-sizing: border-box;
}

a {
    text-decoration: none;
    color: inherit;
}
`;
