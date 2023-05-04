import Image from "next/image";
import Link from "next/link";
import { Dots } from "~/assets/Dots";
import { SideLogo } from "~/assets/SideLogo";
import { Input } from "~/components/UI/Input";
import turtlePic from "~/assets/turtle.png";
import { api } from "~/utils/api/client";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SignInSchema, signInSchema } from "~/utils/validators/auth";
import { EmailVerificationDialog } from "~/components/EmailVerificationDialog";
import { useState } from "react";

const SignInPage = () => {
  const router = useRouter();

  const [verificationTo, setVerificationTo] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInSchema>({
    reValidateMode: "onBlur",
    resolver: zodResolver(signInSchema),
  });

  const { mutateAsync: signIn, isLoading } = api.auth.signIn.useMutation({
    onSuccess: () => {
      router.push("/");
    },
    onError(error, data) {
      if (error.message === "email_invalid") {
        setError("email", { message: "Sorry! This email is not registered." });
      } else if (error.message === "password_invalid") {
        setError("password", {
          message: "Sorry! Password entered is incorrect",
        });
      } else if (error.message === "email_verification_required") {
        setVerificationTo(data.email);
        setShowVerification(true);
      }
    },
  });

  const onSubmit = handleSubmit((data) => {
    signIn(data);
  });

  return (
    <div className="flex h-screen flex-1 overflow-hidden">
      <div className="flex w-1/2 max-w-[526px] items-end bg-gray text-white">
        <div>
          <Image src={turtlePic} alt="turtle" className="min-w-[165px]" />
        </div>

        <div className="flex h-full flex-col p-6 pl-0">
          <SideLogo className="my-auto w-[150px]" />

          <h2 className="text-2xl font-bold">Welcome back!</h2>

          <p className="mt-3">
            Sign In to find opportunities that match your interests. We have
            both part-time and full-time roles that can be done online and
            in-person.
          </p>

          <div className="mt-12">
            <Dots />
          </div>

          <p className="mt-16 text-xs">
            Please contact us at{" "}
            <a href="tel:+919380644532" className="font-medium hover:underline">
              +91-9380644532
            </a>{" "}
            if you need any assistance.
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold">Sign In to WisdomCircle</h1>

          <p className="mb-1 text-base font-medium text-gray">
            {"Don't have an account? "}
            <Link href="/signup" className="text-royalBlue-4">
              Sign Up
            </Link>
          </p>

          <form className="mt-6 flex flex-col" onSubmit={onSubmit}>
            <div className="flex flex-col space-y-4">
              <Input
                placeholder="Email"
                type="email"
                state={errors.email ? "invalid" : "default"}
                errorMessage={errors.email?.message}
                {...register("email")}
                disabled={isLoading}
              />

              <Input
                placeholder="Password"
                type="password"
                state={errors.password ? "invalid" : "default"}
                errorMessage={errors.password?.message}
                {...register("password")}
                disabled={isLoading}
              />
            </div>

            <Link
              href="/forgotPassword"
              className="ml-auto mt-1 font-medium text-royalBlue-4"
            >
              Forgot password
            </Link>

            <button
              className="mt-6 rounded bg-primary-4 px-40 py-3 font-medium text-black transition"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign In"}
            </button>
          </form>

          <EmailVerificationDialog
            email={verificationTo}
            isOpen={showVerification}
            setIsOpen={setShowVerification}
          />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
