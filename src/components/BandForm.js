import React from "react";
import { useReducer } from "react";
import PersonalInformationForm from "./PersonalInformationForm";

// Reducer function to manage state of each ticket type's quantity and subtotal
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        [`counter${action.id}`]: (state[`counter${action.id}`] ?? 0) + 1,
      };
    case "decrement":
      return {
        ...state,
        [`counter${action.id}`]: Math.max(
          0,
          (state[`counter${action.id}`] ?? 0) - 1
        ),
      };
    case "updateTicketTypeCost":
      return {
        ...state,
        [`subtotal${action.id}`]: Math.imul(
          state[`counter${action.id}`],
          action.cost / 100
        ),
      };
    default:
      throw Error(`Unknown action: ${action.type}`);
  }
}

function BandForm({ band }) {
  const [state, dispatch] = useReducer(reducer, {});
  const [totalCost, setTotalCost] = React.useState(0);

  React.useEffect(() => {
    // update the totalCost whenever state changes or band.ticketTypes changes
    const totalCost = band.ticketTypes.reduce((acc, ticket) => {
      const subtotal = state[`subtotal${ticket.id}-${ticket.type}`] ?? 0;
      return acc + subtotal;
    }, 0);
    setTotalCost(totalCost);
  }, [band.ticketTypes, state]);

  return (
    <div className="bg-slate-100 px-6 pb-2 rounded-lg">
      <h3 className="text-xl font-bold ml-1 mt-4">Select Tickets</h3>
      <table>
        <thead>
          <tr>
            <th className="w-[680px] text-left">Ticket Type</th>
            <th className="w-[100px] text-left mr-4">Quantity</th>
            <th className="w-[100px] text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {band.ticketTypes.map((ticket) => (
            <React.Fragment>
              <tr key={ticket.type}>
                {/* Ticket Type */}
                <td className="w-[680px]">
                  <p className="uppercase text-lg">{ticket.name}</p>
                  <p className="text-sm text-slate-600">{ticket.description}</p>
                  <p data-test-id={`cost-${ticket.type}`} className="text-lg">
                    &#36;{ticket.cost / 100}
                  </p>
                </td>
                {/* Quantity */}
                <td className="flex flex-row border-1 justify-between bg-white rounded-lg w-[100px] mr-4">
                  <span
                    data-testid={`quantity-${ticket.type}`}
                    className="self-center px-4"
                  >
                    {state[`counter${ticket.id}-${ticket.type}`] ?? 0}
                  </span>
                  <div className="flex flex-col justify-between border-2 text-teal-800 min-w-10 w-[100px]">
                    <button
                      data-testid={`increment-button-${ticket.type}`}
                      className="border-2 bg-teal-50 border-teal-800 hover:bg-teal-800 hover:text-white"
                      onClick={() => {
                        dispatch({
                          type: "increment",
                          id: `${ticket.id}-${ticket.type}`,
                        });
                        dispatch({
                          type: "updateTicketTypeCost",
                          id: `${ticket.id}-${ticket.type}`,
                          cost: ticket.cost,
                        });
                      }}
                    >
                      ▲
                    </button>
                    <button
                      data-testid={`decrement-button-${ticket.type}`}
                      className="border-2 bg-teal-50 border-teal-800 hover:bg-teal-800 hover:text-white"
                      onClick={() => {
                        dispatch({
                          type: "decrement",
                          id: `${ticket.id}-${ticket.type}`,
                        });
                        dispatch({
                          type: "updateTicketTypeCost",
                          id: `${ticket.id}-${ticket.type}`,
                          cost: ticket.cost,
                        });
                      }}
                    >
                      ▼
                    </button>
                  </div>
                </td>
                <td className="text-right font-normal w-[100px]">
                  <span data-testid={`subtotal-${ticket.type}`}>
                    &#36;
                    {state[`subtotal${ticket.id}-${ticket.type}`] ?? 0}
                  </span>
                </td>
              </tr>
              <hr className="border-slate-500" />
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="flex text-xl justify-between">
        <p>TOTAL</p>
        <span data-testid={`total-${band.id}`} className="min-w-32 text-center">
          ${totalCost}
        </span>
      </div>
      <PersonalInformationForm />
    </div>
  );
}

export default BandForm;
