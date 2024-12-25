import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function Home() {
  const navigator = useNavigate();
  return (
    <div className="m-5">
      <h1 className="text-4xl font-bold text-center">Welcome to Countdown!</h1>
      <Button
        onClick={() => navigator("/setup")}
        className="block mx-auto mt-8"
      >
        Setup Your Countdown
      </Button>
    </div>
  );
}

export default Home;
