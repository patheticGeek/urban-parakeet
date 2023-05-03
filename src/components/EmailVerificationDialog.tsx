import { Dialog, type DialogProps } from "./UI/Dialog";

type Props = Pick<DialogProps, "isOpen" | "setIsOpen"> & { email: string };

export const EmailVerificationDialog = ({ email, ...props }: Props) => {
  return (
    <Dialog title="Verify Email" {...props}>
      <p className="text-gray">
        Please verify your account. We have sent an email to{" "}
        <span className="font-medium">{email}</span>. If you are unable to find
        the verification email please contact us at:{" "}
        <a href="tel:+919380644532" className="font-medium hover:underline">
          +91-9380644532
        </a>
      </p>
    </Dialog>
  );
};
