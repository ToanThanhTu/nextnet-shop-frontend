"use client";

import Error from "@/app/components/error/error";
import MembershipAds from "@/app/components/index/membership-ads";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { registerUser } from "@/lib/features/auth/authActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { LoaderPinwheel } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

function Register() {
  const { user, loading, error, success } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  useEffect(() => {
    if (success) {
      alert("Registration successful. Redirecting to Sign In page.");
      router.push("/login");
    }

    if (user) {
      router.push("/");
    }
  }, [router, user, success]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    data.email = data.email.toLowerCase();
    dispatch(registerUser(data));
  };

  return (
    <div>
      <MembershipAds />
      <h1 className="text-center my-4">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-96 m-auto space-y-8">
        {error && <Error error={error} />}
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            placeholder="Enter your name..."
            {...register("name", { required: true })}
          />
          {errors.name && <div className="text-red-500">Please enter your name</div>}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="Enter your email..."
            {...register("email", { required: true })}
          />
          {errors.email && <div className="text-red-500">Please enter your email</div>}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            placeholder="Enter your password..."
            {...register("password", { required: true })}
          />
          {errors.password && <div className="text-red-500">Please enter your password</div>}
        </div>

        <Button type="submit" className="hover:cursor-pointer w-full" disabled={loading}>
          {loading ? <LoaderPinwheel className="animate-spin" /> : "Register"}
        </Button>
      </form>
    </div>
  );
}

export default Register;
