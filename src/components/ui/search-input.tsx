"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  containerClassName?: string;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      containerClassName,
      value,
      onChange,
      onClear,
      disabled,
      placeholder = "Buscar...",
      ...props
    },
    ref
  ) => {
    const hasValue =
      value !== undefined && value !== null && String(value).length > 0;

    return (
      <div
        className={cn(
          "relative flex h-9 w-full items-center rounded-xl border border-input/60 bg-muted/40 px-3 py-1 text-sm transition-all duration-200 focus-within:border-primary/60 focus-within:bg-background focus-within:ring-2 focus-within:ring-primary/20 hover:border-input dark:bg-input/40 dark:focus-within:bg-background/80 dark:focus-within:border-primary/50",
          disabled && "pointer-events-none opacity-50",
          containerClassName
        )}
      >
        <Search className="mr-2 size-4 shrink-0 text-muted-foreground/70 transition-colors" />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            "w-full min-w-0 border-none bg-transparent p-0 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:outline-none focus:ring-0",
            className
          )}
          {...props}
        />
        {hasValue && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="ml-1.5 rounded-full p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title="Limpiar búsqueda"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
