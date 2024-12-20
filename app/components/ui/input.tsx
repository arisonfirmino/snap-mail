import * as React from "react";

import { cn } from "@/app/lib/utils";

import { LucideIcon } from "lucide-react";
import { FieldError } from "react-hook-form";

interface InputProps extends React.ComponentProps<"input"> {
  icon?: LucideIcon;
  error?: FieldError | undefined;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon: Icon, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        <div className="relative flex items-center">
          {Icon && (
            <Icon size={16} className="absolute left-3 text-muted-foreground" />
          )}
          <input
            type={type}
            className={cn(
              `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${Icon && "pl-9"} ${error && "border-red-600 focus-visible:ring-red-600"}`,
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-600">{error.message}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
