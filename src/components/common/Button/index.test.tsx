import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./index";

describe("Button", () => {
  describe("rendering", () => {
    it("renders a button element with its children", () => {
      render(<Button>Click me</Button>);

      const button = screen.getByRole("button", { name: "Click me" });
      expect(button).toBeInTheDocument();
    });

    it("defaults to type='button' when no type is passed", () => {
      render(<Button>Submit</Button>);

      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("respects an explicitly passed type prop", () => {
      render(<Button type="submit">Submit</Button>);

      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("forwards the ref to the underlying <button> element", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Ref test</Button>);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current).toHaveTextContent("Ref test");
    });

    it("spreads arbitrary HTML button props through to the element", () => {
      render(
        <Button data-testid="cta" aria-label="cta-button" disabled>
          Disabled
        </Button>,
      );

      const button = screen.getByTestId("cta");
      expect(button).toHaveAttribute("aria-label", "cta-button");
      expect(button).toBeDisabled();
    });
  });

  describe("regular (color) variant", () => {
    it("applies the default color variant classes when no color/category is passed", () => {
      render(<Button>Default</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-transparent");
      expect(button).toHaveClass("rounded", "border", "border-black");
    });

    it("applies the correct classes for a given color prop", () => {
      render(<Button color="blue">Blue button</Button>);

      expect(screen.getByRole("button")).toHaveClass("bg-blue-200");
    });

    it("does not apply any icon-only classes when category is not set", () => {
      render(<Button color="gray">Gray</Button>);

      const button = screen.getByRole("button");
      expect(button).not.toHaveClass("rounded-full");
      expect(button).not.toHaveClass("h-9");
    });
  });

  describe("icon variant", () => {
    it("applies iconVariants classes when a category is passed", () => {
      render(<Button category="resetButton">Reset</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-red-100", "rounded-full", "h-9", "w-9");
    });

    it("does not apply regular buttonVariants classes when category is set", () => {
      render(<Button category="password">Toggle</Button>);

      const button = screen.getByRole("button");
      expect(button).not.toHaveClass("border-black");
      expect(button).not.toHaveClass("min-w-[10rem]");
    });
  });

  describe("className merging", () => {
    it("merges a custom className with the regular variant classes", () => {
      render(<Button className="custom-class">Merged</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
      expect(button).toHaveClass("bg-transparent");
    });

    it("merges a custom className with the icon variant classes", () => {
      render(
        <Button category="chevronRight" className="custom-icon-class">
          Next
        </Button>,
      );

      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-icon-class");
      expect(button).toHaveClass("absolute", "right-0.5");
    });

    it("lets a conflicting tailwind className override the variant default via twMerge", () => {
      render(
        <Button color="blue" className="bg-red-500">
          Override
        </Button>,
      );

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-red-500");
      expect(button).not.toHaveClass("bg-blue-200");
    });
  });

  describe("interaction", () => {
    it("calls the onClick handler when clicked", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click</Button>);

      fireEvent.click(screen.getByRole("button"));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when the button is disabled", () => {
      const handleClick = jest.fn();
      render(
        <Button onClick={handleClick} disabled>
          Click
        </Button>,
      );

      fireEvent.click(screen.getByRole("button"));

      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
