import { screen, render } from "@testing-library/jest-dom";
import Status from "../pages/Status";
import Card from "../component/Card";

const mockChildComponent = jest.fn();

jest.mock("../component/Card", () => (props) => {
  mockChildComponent(props);
  return <mock-mockChildComponent />;
});

// describe("Pass props to the children component", () => {
//   render(<Status setId={setId} index={0} id={1}/>);
// });
