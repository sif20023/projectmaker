"use client"
import * as React from "react";
import { cn } from "@/lib/utils";

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(value);

    React.useEffect(() => {
      if (value !== undefined) setInternalValue(value);
    }, [value]);

    return (
      <div
        ref={ref}
        className={cn("flex flex-col space-y-2", className)}
        role="radiogroup"
        aria-valuenow={internalValue}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          const childValue = (child as React.ReactElement<any>).props.value;
          return React.cloneElement(child as React.ReactElement<any>, {
            checked: internalValue === childValue,
            onCheckedChange: (v: string) => {
              setInternalValue(v);
              onValueChange?.(v);
            },
          });
        })}
      </div>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

export { RadioGroup };
