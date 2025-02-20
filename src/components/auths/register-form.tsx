import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router"; // Import useNavigate
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import axiosInstance from "@/services/axiosInstance";

// Define the validation schema
const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate(); // Initialize the navigate function

  const mutation = useMutation({
    mutationFn: async (data: RegisterFormInputs) => {
      const { firstName, lastName, ...rest } = data;
      const response = await axiosInstance.post("/auth/register", {
        name: `${firstName} ${lastName}`,
        ...rest,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Successfully", {
        description: data.message,
        position: "top-right",
        duration: 5000,
        richColors: true,
      });
      navigate({ to: "/auth/login", replace: true });
    },
    onError: (error) => {
      toast.error("An error occurred", {
        description: error.message,
        position: "top-right",
        duration: 5000,
        richColors: true,
      });
    },
  });

  const onSubmit = (data: RegisterFormInputs) => {
    mutation.mutate(data);
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Welcome, Register to continue</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your credentials below to register an account
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Enter your first name"
            required
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Enter your last name"
            required
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/auth/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <Button
          className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-sm hover:from-purple-600 hover:to-purple-700 disabled:bg-purple-500/30 transition-all duration-500"
          variant="primary"
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? <Loader2 className="animate-spin" /> : null}
          {mutation.isPending ? "Loading..." : "Register"}
        </Button>
      </div>
      <Link to="/auth/login">
        <div className="text-center text-sm">
          Already have an account?{" "}
          <span className="underline underline-offset-4 text-purple-700 font-medium">
            Sign in
          </span>
        </div>
      </Link>
    </form>
  );
}
