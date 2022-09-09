import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "../component/Card";

const handleOpenMock = jest.fn();
const handleStart = jest.fn();

const setup = () =>
  render(
    <Card
      handleOpen={handleOpenMock}
      id={1}
      header="In Progress"
      handleStart={handleStart}
    />
  );

describe("Testing the card component", () => {
  test("Render card component", () => {
    setup();
    expect(screen.getByRole("button")).toHaveTextContent("");
  });

  test("Call handleOpen on click", () => {
    setup();
    const button = screen.getByRole("button");
    userEvent.click(button);
    expect(handleOpenMock).toHaveBeenCalledTimes(1);
  });
});
