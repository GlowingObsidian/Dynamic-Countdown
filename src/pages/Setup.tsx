import { useForm, Controller } from "react-hook-form";
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
import {
  CalendarIcon,
  ClockIcon,
  InfoIcon,
  SmileIcon,
  PaletteIcon,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { gradientOptions } from "@/services/palette";
import { useNavigate } from "react-router-dom";

type FormData = {
  n: string;
  de: string;
  f: string;
  d: number;
  mo: number;
  y: number;
  h: number;
  m: number;
  s: number;
  e: string;
  b: string;
};

export default function Setup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>();

  const navigator = useNavigate();

  const serialize = (data: FormData) =>
    `${data.n}|${data.de}|${data.f}|${data.d}|${data.mo}|${data.y}|${data.h}|${
      data.m
    }|${data.s}|${encodeURIComponent(data.e)}|${data.b}`;

  const onSubmit = (data: FormData) => {
    const query = btoa(serialize(data));
    const queryParams = new URLSearchParams([["p", query]]).toString();
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
                {...register("n", {
                  required: "Name is required",
                })}
              />
              {errors.n && (
                <p className="text-sm text-red-500">{errors.n.message}</p>
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
                {...register("de", {
                  required: "Description is required",
                })}
              />
              {errors.de && (
                <p className="text-sm text-red-500">{errors.de.message}</p>
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
                {...register("f", {
                  required: "Finishing note is required",
                })}
              />
              {errors.f && (
                <p className="text-sm text-red-500">{errors.f.message}</p>
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
                  {...register("d", {
                    valueAsNumber: true,
                    required: "Required",
                    min: { value: 1, message: "Invalid" },
                    max: { value: 31, message: "Invalid" },
                  })}
                />
                {errors.d && (
                  <p className="text-sm text-red-500">{errors.d.message}</p>
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
                  {...register("mo", {
                    valueAsNumber: true,
                    required: "Required",
                    min: { value: 1, message: "Invalid" },
                    max: { value: 12, message: "Invalid" },
                  })}
                />
                {errors.mo && (
                  <p className="text-sm text-red-500">{errors.mo.message}</p>
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
                  {...register("y", {
                    valueAsNumber: true,
                    required: "Required",
                    min: {
                      value: new Date().getFullYear(),
                      message: "Invalid",
                    },
                  })}
                />
                {errors.y && (
                  <p className="text-sm text-red-500">{errors.y.message}</p>
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
                  {...register("h", {
                    valueAsNumber: true,
                    min: { value: 0, message: "Invalid" },
                    max: { value: 23, message: "Invalid" },
                  })}
                />
                {errors.h && (
                  <p className="text-sm text-red-500">{errors.h.message}</p>
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
                  {...register("m", {
                    valueAsNumber: true,
                    min: { value: 0, message: "Invalid" },
                    max: { value: 59, message: "Invalid" },
                  })}
                />
                {errors.m && (
                  <p className="text-sm text-red-500">{errors.m.message}</p>
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
                  {...register("s", {
                    valueAsNumber: true,
                    min: { value: 0, message: "Invalid" },
                    max: { value: 59, message: "Invalid" },
                  })}
                />
                {errors.s && (
                  <p className="text-sm text-red-500">{errors.s.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="emojis"
                className="text-sm font-medium text-indigo-600"
              >
                <SmileIcon className="w-4 h-4 inline-block mr-2" />
                Floating Emojis (1-2)
              </Label>
              <Input
                id="emojis"
                placeholder="Enter 1-2 emojis (e.g., 🎉🎊)"
                className="w-full border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500"
                {...register("e", {
                  required: "Emojis are required",
                  validate: (value) => {
                    const emojiRegex = /^(?:[\p{Emoji}]{1,2})$/u;
                    return emojiRegex.test(value) || "Enter 1-2 valid emojis";
                  },
                })}
              />
              {errors.e && (
                <p className="text-sm text-red-500">{errors.e.message}</p>
              )}
            </div>
            <Controller
              name="b"
              control={control}
              defaultValue={"0"}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label
                    htmlFor="gradient"
                    className="text-sm font-medium text-indigo-600"
                  >
                    <PaletteIcon className="w-4 h-4 inline-block mr-2" />
                    Background Gradient
                  </Label>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value)}
                    className="grid grid-cols-3 gap-4"
                    {...field}
                  >
                    {gradientOptions.map((option, index) => (
                      <div key={option.value}>
                        <RadioGroupItem
                          value={index.toString()}
                          id={option.value}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={option.value}
                          className={`flex flex-col items-center justify-center rounded-md border-2 border-muted bg-gradient-to-r ${option.value} p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary w-full h-24 text-center text-sm overflow-hidden`}
                        >
                          <span className="line-clamp-2">{option.label}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors.b && (
                    <p className="text-sm text-red-500">{errors.b.message}</p>
                  )}
                </div>
              )}
            />
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
