import { PayInSummaryCard } from "./PayInSummaryCard";
import { render, screen, fireEvent, act } from "@testing-library/react";

describe("PayInSummaryCard", () => {
  it("should render content correcly", () => {
    // Arrange
    const props = {
      reference: "123456",
      title: "Payment Title",
      currency: {
        amount: 100,
        currency: "USD",
      },
      onCurrencyChange: jest.fn(),
    };

    render(<PayInSummaryCard {...props} />);

    // Assert
    expect(screen.getByText("Payment Title")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("For reference number:")).toBeInTheDocument();
    expect(screen.getByText(props.reference)).toBeInTheDocument();
    expect(screen.getByText("Pay with")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("should call onCurrencyChange when currency is changed", async () => {
    // Arrange
    const props = {
      reference: "123456",
      title: "Payment Title",
      currency: {
        amount: 100,
        currency: "USD",
      },
      onCurrencyChange: jest.fn(),
    };
    render(<PayInSummaryCard {...props} />);

    // Act
    await act(async () => {
      await fireEvent.click(screen.getByRole("combobox"));
      await fireEvent.click(screen.getByText("Bitcoin"));
    });

    // Assert
    expect(props.onCurrencyChange).toHaveBeenCalledWith("BTC");
  });
});
