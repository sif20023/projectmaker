"use client"
import * as React from "react";
import { cn } from "@/lib/utils";

export interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number[];
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number[]) => void;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, value, defaultValue = [0], min = 0, max = 100, step = 1, onValueChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = value ?? internalValue;

    const handleChange = (newValue: number[]) => {
      setInternalValue(newValue);
      onValueChange?.(newValue);
    };

    return (
      <div
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}
      >
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue[0]}
          onChange={(e) => handleChange([Number(e.target.value)])}
          className="w-full"
        />
      </div>
    );
  }
);
Slider.displayName = "Slider";

export { Slider };
