import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

test("Display the app title", () => {
  render(<Home />);
  const appTitle = screen.getByText("Project Management App");
  expect(appTitle).toBeInTheDocument();
});
test("Display the backlog title", () => {
  render(<Home />);
  const backlogTitle = screen.getByText("Backlog");
  expect(backlogTitle).toBeInTheDocument();
});

test("Display the in progress title", () => {
  render(<Home />);
  const inProgressTitle = screen.getByText("In Progress");
  expect(inProgressTitle).toBeInTheDocument();
});

test("Display the finished title", () => {
  render(<Home />);
  const finishedTitle = screen.getByText("Finished");
  expect(finishedTitle).toBeInTheDocument();
});
