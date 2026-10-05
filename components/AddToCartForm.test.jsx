import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AddToCartForm from "./AddToCartForm";

const addItemMock = vi.fn();

vi.mock("@/context/CartContext", () => ({
  useCart: () => ({ addItem: addItemMock }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

const product = {
  id: "sofa-1",
  price: 100000,
  options: [
    {
      id: "color",
      name: "색상",
      choices: [
        { id: "navy", label: "네이비", priceDelta: 0 },
        { id: "cream", label: "크림", priceDelta: 20000 },
      ],
    },
  ],
};

describe("AddToCartForm", () => {
  beforeEach(() => {
    addItemMock.mockClear();
  });

  it("기본 선택지(첫 번째 선택지) 기준 가격을 보여준다", () => {
    render(<AddToCartForm product={product} />);
    expect(screen.getByText("100,000원")).toBeInTheDocument();
  });

  it("추가금액이 있는 옵션을 고르면 총 금액이 올라간다", () => {
    render(<AddToCartForm product={product} />);
    fireEvent.click(screen.getByText(/크림/));
    expect(screen.getByText("120,000원")).toBeInTheDocument();
  });

  it("옵션이 없는 상품은 옵션 선택 UI 없이 기본 가격만 보여준다", () => {
    render(<AddToCartForm product={{ id: "stool-1", price: 50000, options: [] }} />);
    expect(screen.getByText("50,000원")).toBeInTheDocument();
  });

  it("장바구니 담기를 누르면 선택한 옵션과 함께 addItem이 호출된다", () => {
    render(<AddToCartForm product={product} />);
    fireEvent.click(screen.getByText("장바구니 담기"));
    expect(addItemMock).toHaveBeenCalledWith(
      "sofa-1",
      1,
      expect.arrayContaining([
        expect.objectContaining({
          groupId: "color",
          choiceId: "navy",
          priceDelta: 0,
        }),
      ])
    );
  });
});
