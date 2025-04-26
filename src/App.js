import skaBand from "./band-json/ska-band.json";
import kpopBand from "./band-json/kpop-band.json";
import punkBand from "./band-json/punk-band.json";

import BandForm from "./components/BandForm";
import ConcertDetail from "./components/ConcertDetail";
import ConcertSummary from "./components/ConcertSummary";

function App() {
  const bands = [skaBand, kpopBand, punkBand];
  return (
    <div className="App px-4 md:px-11">
      <h1 className="text-3xl font-bold text-center my-4">
        Concert Ticket Booking
      </h1>
      {bands.map((band) => (
        <div key={band.id} className="mb-6">
          <ConcertSummary band={band} />
          <div className="flex flex-col justify-center md:flex-row">
            <ConcertDetail band={band} />
            <BandForm band={band} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
