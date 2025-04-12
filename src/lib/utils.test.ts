import { formatWalletAddress } from "./utils";

describe("formatWalletAddress", () => {
  it("should return the address as is if it is 10 characters or less", () => {
    expect(formatWalletAddress("1234567890")).toBe("1234567890");
  });

  it("should format the address correctly if it is longer than 10 characters", () => {
    expect(formatWalletAddress("12345678901234567890")).toBe("1234567...67890");
  });
});
