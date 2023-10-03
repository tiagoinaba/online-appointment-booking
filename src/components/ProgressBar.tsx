import { type Dispatch, type SetStateAction } from "react";

export default function ProgressBar({
  steps,
  step,
  setStep,
}: {
  steps: number;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const getNumbers = (steps: number) => {
    const numbers = [];
    for (let i = 1; i <= steps; i++) {
      numbers.push(i);
    }
    return numbers;
  };

  return (
    <div
      className={`relative h-4 w-8/12 bg-gradient-to-r from-zinc-800 from-50% to-zinc-500 to-50% bg-[size:200%] bg-[position:100%_0%] transition-all duration-200`}
      style={{
        backgroundPosition: `${100 - ((step - 1) / (steps - 1)) * 100}% 0`,
      }}
    >
      {getNumbers(steps).map((num) => {
        return (
          <button
            key={num}
            className={`absolute rounded-full ${
              step >= num ? "bg-black text-white" : "bg-zinc-400"
            } top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center transition-colors duration-500`}
            style={{ left: `${((num - 1) / (steps - 1)) * 100}%` }}
            disabled={step <= num}
            onClick={() => setStep(num)}
          >
            {num}
          </button>
        );
      })}
    </div>
  );
}
