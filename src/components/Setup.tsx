import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon, ClockIcon, InfoIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

type FormData = {
  name: string;
  description: string;
  finish: string;
  day: number;
  month: number;
  year: number;
  hour: number | 0;
  minute: number | 0;
  second: number | 0;
};

export default function Setup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigator = useNavigate();

  const onSubmit = (data: FormData) => {
    const query = btoa(JSON.stringify(data));
    const queryParams = new URLSearchParams([["params", query]]).toString();
    navigator(`/countdown?${queryParams}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-2xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center text-indigo-700">
            Setup Your Event
          </CardTitle>
          <CardDescription className="text-center text-indigo-500">
            Enter the details of your upcoming event
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-indigo-600"
              >
                <CalendarIcon className="w-4 h-4 inline-block mr-2" />
                Event Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your event name"
                className="w-full border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                {...register("name", {
                  required: "Name is required",
                })}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="desc"
                className="text-sm font-medium text-indigo-600"
              >
                <InfoIcon className="w-4 h-4 inline-block mr-2" />
                Event Description
              </Label>
              <Input
                id="desc"
                placeholder="Enter a short description"
                className="w-full border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="finish"
                className="text-sm font-medium text-indigo-600"
              >
                <ClockIcon className="w-4 h-4 inline-block mr-2" />
                Finishing Note
              </Label>
              <Input
                id="finish"
                placeholder="Enter a short note to show when event is over"
                className="w-full border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                {...register("finish", {
                  required: "Finishing note is required",
                })}
              />
              {errors.finish && (
                <p className="text-sm text-red-500">{errors.finish.message}</p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="day"
                  className="text-sm font-medium text-indigo-600"
                >
                  Day
                </Label>
                <Input
                  id="day"
                  placeholder="DD"
                  type="number"
                  className="w-full border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                  {...register("day", {
                    valueAsNumber: true,
                    required: "Required",
                    min: { value: 1, message: "Invalid" },
                    max: { value: 31, message: "Invalid" },
                  })}
                />
                {errors.day && (
                  <p className="text-sm text-red-500">{errors.day.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="month"
                  className="text-sm font-medium text-indigo-600"
                >
                  Month
                </Label>
                <Input
                  id="month"
                  placeholder="MM"
                  type="number"
                  className="w-full border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                  {...register("month", {
                    valueAsNumber: true,
                    required: "Required",
                    min: { value: 1, message: "Invalid" },
                    max: { value: 12, message: "Invalid" },
                  })}
                />
                {errors.month && (
                  <p className="text-sm text-red-500">{errors.month.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="year"
                  className="text-sm font-medium text-indigo-600"
                >
                  Year
                </Label>
                <Input
                  id="year"
                  placeholder="YYYY"
                  type="number"
                  className="w-full border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                  {...register("year", {
                    valueAsNumber: true,
                    required: "Required",
                    min: {
                      value: new Date().getFullYear(),
                      message: "Invalid",
                    },
                  })}
                />
                {errors.year && (
                  <p className="text-sm text-red-500">{errors.year.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="hour"
                  className="text-sm font-medium text-indigo-600"
                >
                  Hour
                </Label>
                <Input
                  id="hour"
                  placeholder="HH"
                  type="number"
                  className="w-full border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                  defaultValue={0}
                  {...register("hour", {
                    valueAsNumber: true,
                    min: { value: 0, message: "Invalid" },
                    max: { value: 23, message: "Invalid" },
                  })}
                />
                {errors.hour && (
                  <p className="text-sm text-red-500">{errors.hour.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="minute"
                  className="text-sm font-medium text-indigo-600"
                >
                  Minute
                </Label>
                <Input
                  id="minute"
                  placeholder="MM"
                  type="number"
                  className="w-full border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                  defaultValue={0}
                  {...register("minute", {
                    valueAsNumber: true,
                    min: { value: 0, message: "Invalid" },
                    max: { value: 59, message: "Invalid" },
                  })}
                />
                {errors.minute && (
                  <p className="text-sm text-red-500">
                    {errors.minute.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="second"
                  className="text-sm font-medium text-indigo-600"
                >
                  Second
                </Label>
                <Input
                  id="second"
                  placeholder="SS"
                  type="number"
                  className="w-full border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                  defaultValue={0}
                  {...register("second", {
                    valueAsNumber: true,
                    min: { value: 0, message: "Invalid" },
                    max: { value: 59, message: "Invalid" },
                  })}
                />
                {errors.second && (
                  <p className="text-sm text-red-500">
                    {errors.second.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-300"
            >
              Create Countdown
              <ClockIcon className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
