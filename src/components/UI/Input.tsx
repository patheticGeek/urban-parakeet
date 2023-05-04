/* eslint-disable react/display-name */
import { cva, type VariantProps } from "class-variance-authority";
import {
  useState,
  type DetailedHTMLProps,
  type InputHTMLAttributes,
  forwardRef,
  type ForwardedRef,
} from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const inputClass = cva(
  "font-base w-full text-sm md:text-base rounded border bg-transparent px-4 py-3 transition placeholder:text-charcoal focus:border-gray focus:outline-none focus:ring-0",
  {
    variants: {
      state: {
        default: "border-divider",
        invalid: "border-danger-4 text-danger-4",
      },
    },

    defaultVariants: {
      state: "default",
    },
  }
);

type InputElementProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type InputProps = VariantProps<typeof inputClass> &
  InputElementProps & {
    errorMessage?: string;
  };

const PasswordInput = ({
  inputRef,
  state,
  errorMessage: _,
  ...props
}: InputProps & { inputRef: ForwardedRef<HTMLInputElement> }) => {
  const [inputType, setInputType] = useState("password");

  return (
    <div className="relative flex w-full">
      <input
        ref={inputRef}
        className={inputClass({ state })}
        {...props}
        type={inputType}
      />

      <button
        className="absolute right-0 h-full p-4"
        onClick={(e) => {
          e.preventDefault();
          setInputType(inputType === "password" ? "text" : "password");
        }}
      >
        {inputType === "password" ? (
          <EyeIcon className="h-4 w-4 text-charcoal" />
        ) : (
          <EyeSlashIcon className="h-4 w-4 text-charcoal" />
        )}
      </button>
    </div>
  );
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ state, errorMessage, ...props }, ref) => {
    return (
      <div className="w-full">
        {props.type === "password" ? (
          <PasswordInput
            inputRef={ref}
            {...{ state, errorMessage }}
            {...props}
          />
        ) : (
          <input ref={ref} className={inputClass({ state })} {...props} />
        )}

        {state === "invalid" && errorMessage && (
          <p className="mt-1 text-xs text-danger-4 md:text-sm">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

export { Input };
