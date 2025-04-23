import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PersonalInformationForm from "./PersonalInformationForm";

describe("PersonalInformationForm", () => {
  test("shows error when first name is empty", async () => {
    render(<PersonalInformationForm />);

    const firstNameInput = screen.getByPlaceholderText(/first name/i);
    fireEvent.blur(firstNameInput);
    await screen.findByText(/first name is required/i);
  });

  test("shows error when last name is empty", async () => {
    render(<PersonalInformationForm />);

    const lastNameInput = screen.getByPlaceholderText(/last name/i);
    fireEvent.blur(lastNameInput);
    await screen.findByText(/last name is required/i);
  });

  test("shows error when first name contains non-letters", async () => {
    render(<PersonalInformationForm />);

    const firstNameInput = screen.getByPlaceholderText(/first name/i);
    fireEvent.change(firstNameInput, {
      target: { value: "Fiona123" },
    });
    fireEvent.blur(firstNameInput);
    await screen.findByText(/first name must contain only letters/i);
  });

  test("shows error when last name contains non-letters", async () => {
    render(<PersonalInformationForm />);

    const lastNameInput = screen.getByPlaceholderText(/last name/i);
    fireEvent.change(lastNameInput, {
      target: { value: "Fiona123" },
    });
    fireEvent.blur(lastNameInput);
    await screen.findByText(/last name must contain only letters/i);
  });

  test("shows error when address is empty", async () => {
    render(<PersonalInformationForm />);

    const addressInput = screen.getByPlaceholderText(/address/i);
    fireEvent.blur(addressInput);
    await screen.findByText(/address is required/i);
  });

  test("shows error when card number is empty", async () => {
    render(<PersonalInformationForm />);

    const cardNumberInput = screen.getByPlaceholderText(/0000 0000 0000 0000/i);
    fireEvent.blur(cardNumberInput);
    await screen.findByText(/card number is required/i);
  });

  test("shows error when length of card number is not 16", async () => {
    render(<PersonalInformationForm />);

    const cardNumberInput = screen.getByPlaceholderText(/0000 0000 0000 0000/i);
    fireEvent.change(cardNumberInput, {
      target: { value: "1111" },
    });
    fireEvent.blur(cardNumberInput);
    await screen.findByText(/card number must be exactly 16 digits/i);
  });

  test("shows error when card number contains letters", async () => {
    render(<PersonalInformationForm />);

    const cardNumberInput = screen.getByPlaceholderText(/0000 0000 0000 0000/i);
    fireEvent.change(cardNumberInput, {
      target: { value: "11110000abcdABCD" },
    });
    fireEvent.blur(cardNumberInput);
    await screen.findByText(/card number must contain only digits/i);
  });

  test("shows error when expiry is empty", async () => {
    render(<PersonalInformationForm />);

    const expiryInput = screen.getByRole("textbox", { name: /expiry/i });
    fireEvent.blur(expiryInput);
    await screen.findByText(/expiry is required/i);
  });

  test("shows error when expiry is not in MM/YY format", async () => {
    render(<PersonalInformationForm />);

    const expiryInput = screen.getByRole("textbox", { name: /expiry/i });
    fireEvent.change(expiryInput, {
      target: { value: "2025-12" },
    });
    fireEvent.blur(expiryInput);
    await screen.findByText(/mm\/yy format is required/i);
  });

  test("shows error when cvv is empty", async () => {
    render(<PersonalInformationForm />);

    const cvvInput = screen.getByPlaceholderText(/cvv/i);
    fireEvent.blur(cvvInput);
    await screen.findByText(/cvv is required/i);
  });

  test("shows error when cvv contains letters", async () => {
    render(<PersonalInformationForm />);

    const cvvInput = screen.getByPlaceholderText(/CVV/i);
    fireEvent.change(cvvInput, {
      target: { value: "abc" },
    });
    fireEvent.blur(cvvInput);
    await screen.findByText(/cvv must contain only digits/i);
  });

  test("shows error when length of cvv is not exactly 3", async () => {
    render(<PersonalInformationForm />);

    const cvvInput = screen.getByPlaceholderText(/cvv/i);
    fireEvent.change(cvvInput, {
      target: { value: "12" },
    });
    fireEvent.blur(cvvInput);
    await screen.findByText(/cvv must be exactly 3 digits/i);
  });

  test("shows alert when Get Tickets button is clicked", async () => {
    render(<PersonalInformationForm />);

    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    const getTicketsButton = screen.getByTestId("get-tickets-button");
    fireEvent.click(getTicketsButton);
    expect(alertMock).toHaveBeenCalledWith("Tickets purchased!");
  });
});
