import { PaymentDetails } from "./PaymentDetails";

import { render, screen } from "@testing-library/react";

describe("PaymentDetails", () => {
  const mockedProps = {
    paidCurrency: {
      amount: 0.01,
      currency: "BTC",
    },
    expiredTimestamp: 1744456664810,
    walletAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  };

  it("should render content correcly", () => {
    // Arrange
    render(<PaymentDetails {...mockedProps} />);

    // Assert
    expect(screen.getByText("Amount due")).toBeInTheDocument();
    expect(screen.getByText("0.01 BTC")).toBeInTheDocument();
    expect(screen.getByText("BTC address")).toBeInTheDocument();
    expect(screen.getByText(mockedProps.walletAddress)).toBeInTheDocument();
    expect(screen.getByText("Time left to pay")).toBeInTheDocument();
  });

  it("should allow to copy the wallet address", () => {
    // Arrange
    const writeText = jest.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText,
      },
    });

    render(<PaymentDetails {...mockedProps} />);

    // Act
    screen.getAllByText("Copy")[1].click();

    // Assert
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      mockedProps.walletAddress
    );
  });
});
