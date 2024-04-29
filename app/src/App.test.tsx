// unit test for App component
//
// Path: client/src/App.test.tsx
import { render, screen } from "@testing-library/react";
import App from "./App";
import React from "react";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
