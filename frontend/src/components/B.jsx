import * as React from "react";
import { cn } from "@/lib/utils";

const Button = ({ className, ...props }) => {
  return (
    <button className={cn("px-4 py-2 rounded", className)} {...props} />
  );
};

export { Button };
