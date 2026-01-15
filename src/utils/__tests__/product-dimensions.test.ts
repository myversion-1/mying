/**
 * Unit Tests for Product Dimensions Parser
 * Tests parsing and constraint checking functions
 */

import {
  parseHeight,
  parseFootprint,
  productFitsConstraints,
} from "../product-dimensions";

describe("parseHeight", () => {
  describe("Valid height strings", () => {
    test("should parse meters with space", () => {
      expect(parseHeight("5.9 m")).toBe(5.9);
      expect(parseHeight("11 m")).toBe(11);
      expect(parseHeight("12.5 m")).toBe(12.5);
    });

    test("should parse meters without space", () => {
      expect(parseHeight("5.9m")).toBe(5.9);
      expect(parseHeight("11M")).toBe(11);
      expect(parseHeight("12.5M")).toBe(12.5);
    });

    test("should parse Chinese format", () => {
      expect(parseHeight("11米")).toBe(11);
      expect(parseHeight("5.9米")).toBe(5.9);
      expect(parseHeight("高度: 12米")).toBe(12);
    });

    test("should parse feet and convert to meters", () => {
      expect(parseHeight("15 ft")).toBeCloseTo(4.572, 2); // 15 * 0.3048
      expect(parseHeight("20 feet")).toBeCloseTo(6.096, 2); // 20 * 0.3048
      expect(parseHeight("10ft")).toBeCloseTo(3.048, 2);
    });

    test("should parse height with prefix text", () => {
      expect(parseHeight("高度: 5.9 m")).toBe(5.9);
      expect(parseHeight("Height: 11 m")).toBe(11);
      expect(parseHeight("H: 12M")).toBe(12);
    });
  });

  describe("Invalid or edge cases", () => {
    test("should return null for empty string", () => {
      expect(parseHeight("")).toBeNull();
    });

    test("should return null for N/A", () => {
      expect(parseHeight("N/A")).toBeNull();
      expect(parseHeight("n/a")).toBeNull();
    });

    test("should return null for invalid format", () => {
      expect(parseHeight("invalid")).toBeNull();
      expect(parseHeight("no numbers here")).toBeNull();
    });

    test("should return null for null or undefined", () => {
      expect(parseHeight(null as any)).toBeNull();
      expect(parseHeight(undefined as any)).toBeNull();
    });
  });
});

describe("parseFootprint", () => {
  describe("Valid footprint strings", () => {
    test("should extract maximum dimension from diameter format", () => {
      expect(parseFootprint("D12M*H5.9M")).toBe(12);
      expect(parseFootprint("D8M*H4M")).toBe(8);
    });

    test("should extract maximum dimension from length-width-height format", () => {
      expect(parseFootprint("L16M*W10.5M*H11M")).toBe(16);
      expect(parseFootprint("L8M*W12M*H5M")).toBe(12); // Width is largest
    });

    test("should extract maximum dimension from x format", () => {
      expect(parseFootprint("12M x 8M")).toBe(12);
      expect(parseFootprint("8M x 12M")).toBe(12);
    });

    test("should handle decimal values", () => {
      expect(parseFootprint("D12.5M*H5.9M")).toBe(12.5);
      expect(parseFootprint("L16.8M*W10.5M")).toBe(16.8);
    });

    test("should handle multiple dimensions", () => {
      expect(parseFootprint("20M x 15M x 10M")).toBe(20);
      expect(parseFootprint("10M x 20M x 15M")).toBe(20);
    });
  });

  describe("Invalid or edge cases", () => {
    test("should return null for empty string", () => {
      expect(parseFootprint("")).toBeNull();
    });

    test("should return null for N/A", () => {
      expect(parseFootprint("N/A")).toBeNull();
      expect(parseFootprint("n/a")).toBeNull();
    });

    test("should return null for invalid format", () => {
      expect(parseFootprint("invalid")).toBeNull();
      expect(parseFootprint("no numbers")).toBeNull();
    });

    test("should return null for null or undefined", () => {
      expect(parseFootprint(null as any)).toBeNull();
      expect(parseFootprint(undefined as any)).toBeNull();
    });
  });
});

describe("productFitsConstraints", () => {
  const mockProduct = {
    height: "5.9 m",
    footprint: "D12M*H5.9M",
  };

  describe("No constraints", () => {
    test("should return true when no constraints specified", () => {
      expect(
        productFitsConstraints(
          mockProduct.height,
          mockProduct.footprint,
          null,
          null
        )
      ).toBe(true);
    });
  });

  describe("Height constraints", () => {
    test("should return true when product height is within constraint", () => {
      expect(
        productFitsConstraints(mockProduct.height, mockProduct.footprint, 6, null)
      ).toBe(true);
      expect(
        productFitsConstraints(mockProduct.height, mockProduct.footprint, 10, null)
      ).toBe(true);
    });

    test("should return false when product height exceeds constraint", () => {
      expect(
        productFitsConstraints(mockProduct.height, mockProduct.footprint, 5, null)
      ).toBe(false);
      expect(
        productFitsConstraints(mockProduct.height, mockProduct.footprint, 4, null)
      ).toBe(false);
    });

    test("should return false when height cannot be parsed", () => {
      expect(
        productFitsConstraints("invalid", mockProduct.footprint, 5, null)
      ).toBe(false);
      expect(
        productFitsConstraints("N/A", mockProduct.footprint, 5, null)
      ).toBe(false);
    });
  });

  describe("Footprint constraints", () => {
    test("should return true when product footprint is within constraint", () => {
      expect(
        productFitsConstraints(mockProduct.height, mockProduct.footprint, null, 15)
      ).toBe(true);
      expect(
        productFitsConstraints(mockProduct.height, mockProduct.footprint, null, 20)
      ).toBe(true);
    });

    test("should return false when product footprint exceeds constraint", () => {
      expect(
        productFitsConstraints(mockProduct.height, mockProduct.footprint, null, 10)
      ).toBe(false);
      expect(
        productFitsConstraints(mockProduct.height, mockProduct.footprint, null, 8)
      ).toBe(false);
    });

    test("should return false when footprint cannot be parsed", () => {
      expect(
        productFitsConstraints(mockProduct.height, "invalid", null, 10)
      ).toBe(false);
      expect(
        productFitsConstraints(mockProduct.height, "N/A", null, 10)
      ).toBe(false);
    });
  });

  describe("Combined constraints", () => {
    test("should return true when both constraints are satisfied", () => {
      expect(
        productFitsConstraints(mockProduct.height, mockProduct.footprint, 6, 15)
      ).toBe(true);
    });

    test("should return false when height constraint fails", () => {
      expect(
        productFitsConstraints(mockProduct.height, mockProduct.footprint, 4, 15)
      ).toBe(false);
    });

    test("should return false when footprint constraint fails", () => {
      expect(
        productFitsConstraints(mockProduct.height, mockProduct.footprint, 6, 10)
      ).toBe(false);
    });

    test("should return false when both constraints fail", () => {
      expect(
        productFitsConstraints(mockProduct.height, mockProduct.footprint, 4, 10)
      ).toBe(false);
    });
  });

  describe("Edge cases - zero and negative values", () => {
    test("should handle zero ceiling height constraint", () => {
      // Zero height means no space, so product should not fit
      expect(
        productFitsConstraints("5.9 m", "D12M", 0, null)
      ).toBe(false);
    });

    test("should handle negative ceiling height constraint", () => {
      // Negative height is invalid, but function should handle it gracefully
      expect(
        productFitsConstraints("5.9 m", "D12M", -5, null)
      ).toBe(false);
    });

    test("should handle zero footprint constraint", () => {
      // Zero footprint means no space, so product should not fit
      expect(
        productFitsConstraints("5.9 m", "D12M", null, 0)
      ).toBe(false);
    });

    test("should handle negative footprint constraint", () => {
      // Negative footprint is invalid, but function should handle it gracefully
      expect(
        productFitsConstraints("5.9 m", "D12M", null, -10)
      ).toBe(false);
    });

    test("should handle very small constraints", () => {
      expect(
        productFitsConstraints("5.9 m", "D12M", 0.1, null)
      ).toBe(false);
      expect(
        productFitsConstraints("5.9 m", "D12M", null, 0.1)
      ).toBe(false);
    });
  });
});


























