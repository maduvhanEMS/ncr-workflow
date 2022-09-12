import styled from "styled-components";
import Button from "@mui/material/Button";

export const Container = styled.section`
  max-width: 1600px;
  margin: 0 auto;
  height: calc(100vh-80px);
  padding: 1rem;
`;

export const StyledButton = (props) => {
  <Button
    sx={{
      mx: 1,
      color: props.color,
    }}
    variant="outlined"
  >
    {props.text}
  </Button>;
};
