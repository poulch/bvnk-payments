import { PayInConfirmation } from "./PayInConfirmation";
import { render, screen } from "@testing-library/react";

const mockedCurrency = { amount: 10, currency: "EUR" };
describe("PayInConfirmation", () => {
  it("should render null when has no currency selected", () => {
    // Arrange
    const { container } = render(
      <PayInConfirmation
        expiredTimestamp={1744456664810}
        isLoading={false}
        onConfirmPayment={jest.fn()}
        hasSelectedCurrency={false}
        paidCurrency={mockedCurrency}
      />
    );

    // Assert
    expect(container).toBeEmptyDOMElement();
  });

  it("should render table with spinners when has selected currency and is loading", () => {
    // Arrange
    render(
      <PayInConfirmation
        expiredTimestamp={1744456664810}
        isLoading={true}
        onConfirmPayment={jest.fn()}
        hasSelectedCurrency={true}
        paidCurrency={mockedCurrency}
      />
    );

    // Assert
    expect(screen.getByText("Amount due")).toBeInTheDocument();
    expect(screen.getByText("Quoted price expires in")).toBeInTheDocument();
    expect(screen.getAllByTestId("spinner")).toHaveLength(2);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should call onConfirmPayment when clicking confirm button", () => {
    // Arrange
    const onConfirmPayment = jest.fn();
    render(
      <PayInConfirmation
        expiredTimestamp={1744456664810}
        isLoading={false}
        onConfirmPayment={onConfirmPayment}
        hasSelectedCurrency={true}
        paidCurrency={mockedCurrency}
      />
    );

    // Act
    screen.getByRole("button").click();

    // Assert
    expect(onConfirmPayment).toHaveBeenCalled();
  });
});
