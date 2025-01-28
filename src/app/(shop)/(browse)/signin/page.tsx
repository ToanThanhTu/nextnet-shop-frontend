"use client";

import Error from "@/app/components/error/error";
import MembershipAds from "@/app/components/index/membership-ads";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { loginUser } from "@/lib/features/auth/authActions";
import { useSyncCartServerMutation } from "@/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { LoaderPinwheel } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

function SignIn() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, loading, success, error } = useAppSelector((state) => state.auth);
  const { cart } = useAppSelector((state) => state.cart);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [syncCartServer, { isLoading: isSyncCartLoading }] = useSyncCartServerMutation();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [router, user]);

  useEffect(() => {
    const syncUserCart = async () => {
      if (success && user) {
        await syncCartServer({ userId: user.id, localCart: cart });
        router.push("/");
      }
    };

    syncUserCart();
  }, [router, user, success]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    data.email = data.email.toLowerCase();
    dispatch(loginUser(data));
  };  

  return (
    <div>
      <MembershipAds />
      <h1 className="text-center my-4 uppercase">Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-96 m-auto space-y-8">
        {error && <Error error={error} />}

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

        <Button
          type="submit"
          className="hover:cursor-pointer uppercase w-full"
          disabled={loading || isSyncCartLoading}
        >
          {loading || isSyncCartLoading ? <LoaderPinwheel className="animate-spin" /> : "Sign In"}
        </Button>
      </form>
    </div>
  );
}

export default SignIn;
