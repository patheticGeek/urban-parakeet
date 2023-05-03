import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { clsx } from "clsx";
import React, { Fragment, type ReactNode, type PropsWithChildren } from "react";

export type DialogProps = PropsWithChildren<{
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  trigger?: ReactNode;
}>;

const Dialog = ({
  isOpen,
  setIsOpen,
  title,
  trigger,
  children,
}: DialogProps) => {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>

      <Transition.Root show={isOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogPrimitive.Overlay
            forceMount
            className="fixed inset-0 z-20 bg-black/70"
          />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <DialogPrimitive.Content
            forceMount
            className={clsx(
              "fixed z-50",
              "w-[95vw] max-w-md rounded-lg md:w-full",
              "left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]",
              "bg-white",
              "focus:outline-none"
            )}
          >
            <div className="flex items-center justify-between border-b border-divider p-6 pb-4">
              <DialogPrimitive.Title className="text-2xl font-medium">
                {title}
              </DialogPrimitive.Title>

              <DialogPrimitive.Close className="flex h-8 w-8 rounded-full bg-lightBg">
                <XMarkIcon className="text-gray-500 m-auto h-4 w-4" />
              </DialogPrimitive.Close>
            </div>

            <div className="px-6 py-4">{children}</div>
          </DialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </DialogPrimitive.Root>
  );
};

export { Dialog };
