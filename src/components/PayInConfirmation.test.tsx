import { PayInConfirmation } from "./PayInConfirmation";
import { act, fireEvent, render, screen } from "@testing-library/react";

jest.mock("@/hooks/useUpdatePayment", () => ({
  useUpdatePayment: jest.fn(() => ({
    updatePayment: {
      data: {
        paidCurrency: {
          amount: 100,
          currency: "USD",
        },
        acceptanceExpiryDate: 0,
      },
      isPending: false,
      mutate: jest.fn(),
    },
  })),
}));

jest.mock("@/hooks/useComfirmPayment", () => ({
  useConfirmPayment: jest.fn(() => ({
    confirmPayment: jest.fn(),
  })),
}));

const mockPush = jest.fn();
jest.mock("next/navigation", () => {
  return {
    useRouter: jest.fn(() => ({
      push: mockPush,
    })),
    useParams: jest.fn(() => ({
      uuid: "12345",
    })),
  };
});

describe("PayInConfirmation", () => {
  it("should render select currency combobox on init", () => {
    // Arrange
    render(<PayInConfirmation />);

    // Assert
    expect(screen.getByText("Pay with")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.queryByText("Amount due")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Quoted price expires in")
    ).not.toBeInTheDocument();
  });

  it("should select currency and click confirm", async () => {
    // Arrange
    render(<PayInConfirmation />);

    // Act
    await act(async () => {
      await fireEvent.click(screen.getByRole("combobox"));
      await fireEvent.click(screen.getByText("Bitcoin"));
    });

    // Assert
    expect(screen.getByText("Amount due")).toBeInTheDocument();
    expect(screen.getByText("Quoted price expires in")).toBeInTheDocument();

    // Act
    await act(async () => {
      await fireEvent.click(screen.getByRole("button", { name: /confirm/i }));
    });

    // Assert
    expect(
      screen.getByRole("button", { name: /processing.../i })
    ).toBeDisabled();
    expect(mockPush).toHaveBeenCalledWith("/payin/12345/pay");
  });
});
