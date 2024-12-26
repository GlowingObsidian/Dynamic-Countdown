import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, Smartphone, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigator = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 text-white overflow-hidden">
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <div className="relative inline-block mb-4 sm:mb-6">
            <Clock className="h-20 w-20 sm:h-24 sm:w-24 text-yellow-300 animate-pulse" />
            <Zap className="absolute -top-2 -right-2 h-6 w-6 sm:h-8 sm:w-8 text-yellow-200 animate-bounce" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-green-300 animate-gradient-x">
              icountdays
            </span>
          </h1>
          <p className="text-xl sm:text-2xl mb-6 text-cyan-100 max-w-2xl mx-auto">
            Your dynamic counter for any occasion!
          </p>
          <Button
            onClick={() => navigator("/setup")}
            size="lg"
            className="bg-gradient-to-r from-yellow-300 to-green-300 text-blue-800 hover:from-yellow-400 hover:to-green-400 transition-all duration-300 text-lg sm:text-xl px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Create Your Counter
            <ArrowRight className="inline-block ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full">
          <FeatureCard
            icon={<Zap className="h-10 w-10 text-yellow-300" />}
            title="Dynamic Setup"
            description="Customize your counter for birthdays, events, or any special moment!"
          />
          <FeatureCard
            icon={<Smartphone className="h-10 w-10 text-green-300" />}
            title="Mobile Friendly"
            description="Count down on any device, anytime, anywhere!"
          />
        </div>
      </main>

      <footer className="py-4 text-center text-cyan-200 relative z-10">
        <p className="text-sm sm:text-base">
          &copy; 2024 icountdays. Make every second count!
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center p-6 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg sm:text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-center text-cyan-100">
        {description}
      </p>
    </div>
  );
}
