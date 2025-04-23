import IconText from "./IconText";

function ConcertSummary({ band }) {
  const datetime = new Date(band.date);
  const concertDatetime = datetime.toLocaleString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="my-4 p-6" key={band.id}>
      <h2 className="text-xl font-bold">{band.name}</h2>
      <div className="flex flex-col mt-4">
        <IconText icon="calendar" text={concertDatetime} />
        <IconText icon="map-marker" text={band.location} />
      </div>
    </div>
  );
}

export default ConcertSummary;
