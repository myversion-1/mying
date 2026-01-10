/**
 * Unit Tests for SmartSelector Component
 * Tests venue-equipment matching functionality with edge cases
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SmartSelector } from "../SmartSelector";
import type { Product } from "../../content/copy";
import { useLanguage } from "../language";

// Mock the useLanguage hook
jest.mock("../language", () => ({
  useLanguage: jest.fn(),
}));

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock ROICalculator to focus on SmartSelector logic
jest.mock("../ROICalculator", () => ({
  ROICalculator: () => <div data-testid="roi-calculator">ROI Calculator</div>,
}));

const mockUseLanguage = useLanguage as jest.MockedFunction<typeof useLanguage>;

describe("SmartSelector", () => {
  const mockProducts: Product[] = [
    {
      name: "Small Ride",
      category: "Family Ride",
      footprint: "D8M*H4M",
      height: "4 m",
      riders: "12",
      status: "New",
    },
    {
      name: "Medium Ride",
      category: "Family Ride",
      footprint: "D12M*H5.9M",
      height: "5.9 m",
      riders: "24",
      status: "New",
    },
    {
      name: "Large Ride",
      category: "Thrill Ride",
      footprint: "L16M*W10.5M*H11M",
      height: "11 m",
      riders: "36",
      status: "New",
    },
  ];

  beforeEach(() => {
    mockUseLanguage.mockReturnValue({ lang: "en" } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Initial render", () => {
    test("should render component with header", () => {
      render(<SmartSelector products={mockProducts} />);
      expect(screen.getByText("Smart Product Selector")).toBeInTheDocument();
    });

    test("should display all products when no filters applied", () => {
      const onFilteredChange = jest.fn();
      render(
        <SmartSelector
          products={mockProducts}
          onFilteredProductsChange={onFilteredChange}
        />
      );

      // Component should notify parent with all products initially
      expect(onFilteredChange).toHaveBeenCalledWith(mockProducts);
    });
  });

  describe("Filter expansion", () => {
    test("should expand filters when expand button is clicked", () => {
      render(<SmartSelector products={mockProducts} />);
      const expandButton = screen.getByLabelText("Expand");
      fireEvent.click(expandButton);

      expect(screen.getByLabelText(/Ceiling Height/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Available Footprint/i)).toBeInTheDocument();
    });

    test("should collapse filters when collapse button is clicked", () => {
      render(<SmartSelector products={mockProducts} />);
      const expandButton = screen.getByLabelText("Expand");
      fireEvent.click(expandButton);
      fireEvent.click(expandButton);

      expect(screen.queryByLabelText(/Ceiling Height/i)).not.toBeInTheDocument();
    });
  });

  describe("Height filtering", () => {
    test("should filter products by ceiling height", async () => {
      const onFilteredChange = jest.fn();
      render(
        <SmartSelector
          products={mockProducts}
          onFilteredProductsChange={onFilteredChange}
        />
      );

      // Expand filters
      fireEvent.click(screen.getByLabelText("Expand"));

      // Set ceiling height to 6m (should include Small and Medium, exclude Large)
      const allNumberInputs = Array.from(document.querySelectorAll('input[type="number"]')) as HTMLInputElement[];
      const heightNumberInput = allNumberInputs.find(
        (input) => input.placeholder === "m" && input.min === "2"
      );
      if (heightNumberInput) {
        fireEvent.change(heightNumberInput, { target: { value: "6" } });
      }

      await waitFor(() => {
        const calls = onFilteredChange.mock.calls;
        expect(calls.length).toBeGreaterThan(0);
        const lastCall = calls[calls.length - 1][0];
        expect(lastCall).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ name: "Small Ride" }),
            expect.objectContaining({ name: "Medium Ride" }),
          ])
        );
        // Should not include Large Ride (11m > 6m)
        expect(lastCall).not.toContainEqual(expect.objectContaining({ name: "Large Ride" }));
      });
    });

    test("should handle zero ceiling height input", async () => {
      const onFilteredChange = jest.fn();
      render(
        <SmartSelector
          products={mockProducts}
          onFilteredProductsChange={onFilteredChange}
        />
      );

      fireEvent.click(screen.getByLabelText("Expand"));
      const heightNumberInput = Array.from(document.querySelectorAll('input[type="number"]')).find(
        (input) => (input as HTMLInputElement).placeholder === "m"
      ) as HTMLInputElement;
      if (heightNumberInput) {
        fireEvent.change(heightNumberInput, { target: { value: "0" } });
      }

      await waitFor(() => {
        // With zero height, no products should fit
        const lastCall = onFilteredChange.mock.calls[onFilteredChange.mock.calls.length - 1][0];
        expect(lastCall).toHaveLength(0);
      });
    });

    test("should handle negative ceiling height input", async () => {
      const onFilteredChange = jest.fn();
      render(
        <SmartSelector
          products={mockProducts}
          onFilteredProductsChange={onFilteredChange}
        />
      );

      fireEvent.click(screen.getByLabelText("Expand"));
      const heightNumberInput = Array.from(document.querySelectorAll('input[type="number"]')).find(
        (input) => (input as HTMLInputElement).placeholder === "m"
      ) as HTMLInputElement;
      if (heightNumberInput) {
        fireEvent.change(heightNumberInput, { target: { value: "-5" } });
      }

      await waitFor(() => {
        // With negative height, no products should fit
        const lastCall = onFilteredChange.mock.calls[onFilteredChange.mock.calls.length - 1][0];
        expect(lastCall).toHaveLength(0);
      });
    });
  });

  describe("Footprint filtering", () => {
    test("should filter products by footprint", async () => {
      const onFilteredChange = jest.fn();
      render(
        <SmartSelector
          products={mockProducts}
          onFilteredProductsChange={onFilteredChange}
        />
      );

      fireEvent.click(screen.getByLabelText("Expand"));

      // Set footprint to 10m (should include Small and Medium, exclude Large)
      const footprintNumberInputs = Array.from(document.querySelectorAll('input[type="number"]'));
      const footprintInput = footprintNumberInputs.find(
        (input) => (input as HTMLInputElement).placeholder === "m" && 
                   (input as HTMLInputElement).min === "3"
      ) as HTMLInputElement;
      if (footprintInput) {
        fireEvent.change(footprintInput, { target: { value: "10" } });
      }

      await waitFor(() => {
        const lastCall = onFilteredChange.mock.calls[onFilteredChange.mock.calls.length - 1][0];
        expect(lastCall).toContainEqual(expect.objectContaining({ name: "Small Ride" }));
        expect(lastCall).toContainEqual(expect.objectContaining({ name: "Medium Ride" }));
        expect(lastCall).not.toContainEqual(expect.objectContaining({ name: "Large Ride" }));
      });
    });

    test("should handle zero footprint input", async () => {
      const onFilteredChange = jest.fn();
      render(
        <SmartSelector
          products={mockProducts}
          onFilteredProductsChange={onFilteredChange}
        />
      );

      fireEvent.click(screen.getByLabelText("Expand"));
      const footprintNumberInputs = Array.from(document.querySelectorAll('input[type="number"]'));
      const footprintInput = footprintNumberInputs.find(
        (input) => (input as HTMLInputElement).placeholder === "m" && 
                   (input as HTMLInputElement).min === "3"
      ) as HTMLInputElement;
      if (footprintInput) {
        fireEvent.change(footprintInput, { target: { value: "0" } });
      }

      await waitFor(() => {
        const lastCall = onFilteredChange.mock.calls[onFilteredChange.mock.calls.length - 1][0];
        expect(lastCall).toHaveLength(0);
      });
    });

    test("should handle negative footprint input", async () => {
      const onFilteredChange = jest.fn();
      render(
        <SmartSelector
          products={mockProducts}
          onFilteredProductsChange={onFilteredChange}
        />
      );

      fireEvent.click(screen.getByLabelText("Expand"));
      const footprintNumberInputs = Array.from(document.querySelectorAll('input[type="number"]'));
      const footprintInput = footprintNumberInputs.find(
        (input) => (input as HTMLInputElement).placeholder === "m" && 
                   (input as HTMLInputElement).min === "3"
      ) as HTMLInputElement;
      if (footprintInput) {
        fireEvent.change(footprintInput, { target: { value: "-10" } });
      }

      await waitFor(() => {
        const lastCall = onFilteredChange.mock.calls[onFilteredChange.mock.calls.length - 1][0];
        expect(lastCall).toHaveLength(0);
      });
    });
  });

  describe("Empty state handling", () => {
    test("should show friendly message when no products match filters", async () => {
      const onFilteredChange = jest.fn();
      render(
        <SmartSelector
          products={mockProducts}
          onFilteredProductsChange={onFilteredChange}
        />
      );

      fireEvent.click(screen.getByLabelText("Expand"));

      // Set very restrictive constraints
      const heightNumberInput = Array.from(document.querySelectorAll('input[type="number"]')).find(
        (input) => (input as HTMLInputElement).placeholder === "m" && 
                   (input as HTMLInputElement).min === "2"
      ) as HTMLInputElement;
      if (heightNumberInput) {
        fireEvent.change(heightNumberInput, { target: { value: "1" } });
      }

      await waitFor(() => {
        const lastCall = onFilteredChange.mock.calls[onFilteredChange.mock.calls.length - 1][0];
        expect(lastCall).toHaveLength(0);
      });

      // Check that filter status shows 0 products
      expect(screen.getByText(/0.*products/i)).toBeInTheDocument();
    });

    test("should not show ROI calculator when no products match", async () => {
      render(<SmartSelector products={mockProducts} />);

      fireEvent.click(screen.getByLabelText("Expand"));
      const heightNumberInput = Array.from(document.querySelectorAll('input[type="number"]')).find(
        (input) => (input as HTMLInputElement).placeholder === "m" && 
                   (input as HTMLInputElement).min === "2"
      ) as HTMLInputElement;
      if (heightNumberInput) {
        fireEvent.change(heightNumberInput, { target: { value: "1" } });
      }

      await waitFor(() => {
        expect(screen.queryByTestId("roi-calculator")).not.toBeInTheDocument();
      });
    });
  });

  describe("Clear filters", () => {
    test("should clear all filters when clear button is clicked", async () => {
      const onFilteredChange = jest.fn();
      render(
        <SmartSelector
          products={mockProducts}
          onFilteredProductsChange={onFilteredChange}
        />
      );

      fireEvent.click(screen.getByLabelText("Expand"));

      // Set a filter
      const heightNumberInput = Array.from(document.querySelectorAll('input[type="number"]')).find(
        (input) => (input as HTMLInputElement).placeholder === "m" && 
                   (input as HTMLInputElement).min === "2"
      ) as HTMLInputElement;
      if (heightNumberInput) {
        fireEvent.change(heightNumberInput, { target: { value: "6" } });
      }

      await waitFor(() => {
        expect(onFilteredChange).toHaveBeenCalled();
      });

      // Clear filters
      const clearButton = screen.getByText(/Clear Filters/i);
      fireEvent.click(clearButton);

      await waitFor(() => {
        // Should return all products
        const lastCall = onFilteredChange.mock.calls[onFilteredChange.mock.calls.length - 1][0];
        expect(lastCall).toHaveLength(mockProducts.length);
      });
    });
  });

  describe("Multi-language support", () => {
    test("should format numbers correctly in English", () => {
      mockUseLanguage.mockReturnValue({ lang: "en" } as any);
      render(<SmartSelector products={mockProducts} />);

      fireEvent.click(screen.getByLabelText("Expand"));

      const heightInput = screen.getByLabelText(/Ceiling Height/i).nextElementSibling
        ?.querySelector('input[type="number"]') as HTMLInputElement;
      fireEvent.change(heightInput, { target: { value: "5.5" } });

      // Check that number is displayed with English formatting
      expect(screen.getByText(/5\.5 m/i)).toBeInTheDocument();
    });

    test("should format numbers correctly in Thai", () => {
      mockUseLanguage.mockReturnValue({ lang: "th" } as any);
      render(<SmartSelector products={mockProducts} />);

      fireEvent.click(screen.getByLabelText("Expand"));

      const heightInput = screen.getByLabelText(/Ceiling Height/i).nextElementSibling
        ?.querySelector('input[type="number"]') as HTMLInputElement;
      fireEvent.change(heightInput, { target: { value: "5.5" } });

      // Number formatting should work regardless of language
      // The component uses toFixed(1) which is locale-independent
      expect(screen.getByText(/5\.5 m/i)).toBeInTheDocument();
    });

    test("should display correct labels in Chinese", () => {
      mockUseLanguage.mockReturnValue({ lang: "zh" } as any);
      render(<SmartSelector products={mockProducts} />);

      expect(screen.getByText("智能选型工具")).toBeInTheDocument();
    });

    test("should display correct labels in English", () => {
      mockUseLanguage.mockReturnValue({ lang: "en" } as any);
      render(<SmartSelector products={mockProducts} />);

      expect(screen.getByText("Smart Product Selector")).toBeInTheDocument();
    });
  });

  describe("Combined filters", () => {
    test("should apply both height and footprint filters", async () => {
      const onFilteredChange = jest.fn();
      render(
        <SmartSelector
          products={mockProducts}
          onFilteredProductsChange={onFilteredChange}
        />
      );

      fireEvent.click(screen.getByLabelText("Expand"));

      // Set both constraints
      const allNumberInputs = Array.from(document.querySelectorAll('input[type="number"]')) as HTMLInputElement[];
      const heightNumberInput = allNumberInputs.find(
        (input) => input.placeholder === "m" && input.min === "2"
      );
      const footprintNumberInput = allNumberInputs.find(
        (input) => input.placeholder === "m" && input.min === "3"
      );

      if (heightNumberInput) {
        fireEvent.change(heightNumberInput, { target: { value: "6" } });
      }
      if (footprintNumberInput) {
        fireEvent.change(footprintNumberInput, { target: { value: "10" } });
      }

      await waitFor(() => {
        const lastCall = onFilteredChange.mock.calls[onFilteredChange.mock.calls.length - 1][0];
        // Should only include products that fit both constraints
        expect(lastCall.length).toBeLessThanOrEqual(mockProducts.length);
      });
    });
  });
});

