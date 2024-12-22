import Countdown from "./components/Countdown";

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const event = queryParams.get("event");
  const day = Number(queryParams.get("day"));
  const month = Number(queryParams.get("month"));
  const year = Number(queryParams.get("year"));
  const hour = Number(queryParams.get("hour"));
  const minute = Number(queryParams.get("minute"));

  return (
    <div className="">
      <Countdown
        event={event || "Event"}
        day={day}
        month={month}
        year={year}
        hour={hour}
        minute={minute}
        second={0}
      />
    </div>
  );
}

export default App;
