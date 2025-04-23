import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BandForm from "./BandForm";
import punkBand from "../band-json/punk-band.json";

describe("BandForm", () => {
  test("shows correct quantity when increment button is clicked", async () => {
    render(<BandForm band={punkBand} />);
    const incrementButton = screen.getByTestId("increment-button-general");
    fireEvent.click(incrementButton);
    expect(screen.getByTestId("quantity-general").innerHTML).toContain("1");
  });

  test("shows correct quantity when decrement button is the first click after page load", async () => {
    render(<BandForm band={punkBand} />);
    const decrementButton = screen.getByTestId("decrement-button-general");
    fireEvent.click(decrementButton);
    expect(screen.getByTestId("quantity-general").innerHTML).toContain("0");
  });

  test("shows correct quantity when decrement button is clicked after clicking increment button three times", async () => {
    render(<BandForm band={punkBand} />);
    const incrementButton = screen.getByTestId("increment-button-general");
    const decrementButton = screen.getByTestId("decrement-button-general");
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(decrementButton);
    expect(screen.getByTestId("quantity-general").innerHTML).toContain("2");
  });

  test("shows correct subtotal when increment button is clicked twice", async () => {
    render(<BandForm band={punkBand} />);
    const incrementButton = screen.getByTestId("increment-button-general");
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    const costPerTicket = punkBand.ticketTypes[0].cost / 100;
    const subtotal = Math.imul(costPerTicket, 2);
    const subtotalString = "$".concat(subtotal.toString());
    expect(screen.getByTestId("subtotal-general").innerHTML).toContain(
      subtotalString
    );
  });

  test("shows correct total when buttons are clicked for different ticket types", async () => {
    render(<BandForm band={punkBand} />);
    const incrementButtonGeneral = screen.getByTestId(
      "increment-button-general"
    );
    const incrementButtonVIP = screen.getByTestId("increment-button-vip");
    // click increment buttons: once for general, twice for VIP
    fireEvent.click(incrementButtonGeneral);
    fireEvent.click(incrementButtonVIP);
    fireEvent.click(incrementButtonVIP);
    const costPerTicketGeneral = punkBand.ticketTypes[0].cost / 100;
    const costPerTicketVIP = punkBand.ticketTypes[1].cost / 100;
    // calculate subtotals for each ticket type
    const subtotalGeneral = Math.imul(costPerTicketGeneral, 1);
    const subtotalVIP = Math.imul(costPerTicketVIP, 2);
    // calculate total
    const totalCost = subtotalGeneral + subtotalVIP;
    const totalCostString = "$".concat(totalCost.toString());
    expect(screen.getByTestId("total-cindy").innerHTML).toContain(
      totalCostString
    );
  });
});
