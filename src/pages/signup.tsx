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
import { signUpSchema, type SignUpSchema } from "~/utils/validators/auth";
import { useState } from "react";
import { EmailVerificationDialog } from "~/components/EmailVerificationDialog";
import { LogoBanner } from "~/assets/MobileLogo";

const SignUpPage = () => {
  const router = useRouter();

  const [verificationTo, setVerificationTo] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpSchema>({
    reValidateMode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

  const { mutateAsync: signUp, isLoading } = api.auth.signUp.useMutation({
    onSuccess: () => {
      router.push("/");
    },
    onError(error, data) {
      if (error.message === "email_invalid") {
        setError("email", {
          message: "Sorry! This email is already registered.",
        });
      } else if (error.message === "email_verification_required") {
        setVerificationTo(data.email);
        setShowVerification(true);
      }
    },
  });

  const onSubmit = handleSubmit((data) => {
    signUp(data);
  });

  return (
    <div className="flex h-screen flex-1 flex-col overflow-hidden sm:flex-row">
      <div className="hidden w-1/2 max-w-[526px] items-end bg-gray text-white sm:flex">
        <div>
          <Image src={turtlePic} alt="turtle" className="min-w-[165px]" />
        </div>

        <div className="flex h-full flex-col p-6 pl-0">
          <SideLogo className="my-auto w-[150px]" />

          <h2 className="text-2xl font-bold">Welcome aboard!</h2>

          <p className="mt-3">
            Sign Up to find opportunities that match your interests. We have
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

      <form
        className="flex flex-1 flex-col items-center justify-center px-5 py-8"
        onSubmit={onSubmit}
      >
        <div className="flex w-full max-w-sm flex-col">
          <div className="mx-auto my-10 block md:hidden">
            <LogoBanner className="h-[42px]" />
          </div>

          <h1 className="text-xl font-bold md:text-2xl">
            Sign Up for WisdomCircle
          </h1>

          <p className="mb-1 text-sm font-medium text-gray md:text-base">
            {"Already have an account? "}
            <Link href="/signin" className="text-royalBlue-4">
              Sign In
            </Link>
          </p>

          <div className="mt-6 flex flex-col">
            <div className="flex flex-col space-y-4">
              <Input
                placeholder="Your Name"
                type="name"
                state={errors.name ? "invalid" : "default"}
                errorMessage={errors.name?.message}
                {...register("name")}
                disabled={isLoading}
              />

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
              className="ml-auto mt-1 text-xs font-medium text-royalBlue-4 md:text-sm"
            >
              Forgot password
            </Link>
          </div>
        </div>

        <button
          className="mt-auto w-full max-w-sm rounded bg-primary-4 py-3 text-base font-medium text-black transition md:mt-6 md:text-lg"
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
  );
};

export default SignUpPage;
