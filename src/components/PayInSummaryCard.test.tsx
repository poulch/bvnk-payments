import { PayInSummaryCard } from "./PayInSummaryCard";
import { render, screen } from "@testing-library/react";

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
    };

    render(<PayInSummaryCard {...props} />);

    // Assert
    expect(screen.getByText("Payment Title")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("For reference number:")).toBeInTheDocument();
    expect(screen.getByText(props.reference)).toBeInTheDocument();
  });
});
