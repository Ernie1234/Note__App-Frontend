import { RegisterForm } from "@/components/auths/register-form";
import { createFileRoute } from "@tanstack/react-router";
import { GalleryVerticalEnd } from "lucide-react";

export const Route = createFileRoute("/auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid min-h-svh max-h-dvh overflow-hidden lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Note
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="https://www.shutterstock.com/shutterstock/photos/1451975483/display_1500/stock-vector-cute-girl-reading-a-book-in-garden-1451975483.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover  brightness-[0.8] grayscale object-top"
        />
        {/* <img
          src="https://www.shutterstock.com/shutterstock/photos/1017385147/display_1500/stock-vector-cute-girl-reads-a-book-1017385147.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover  brightness-[0.8] grayscale object-top dark:brightness-[0.2] dark:grayscale"
        /> */}
      </div>
    </div>
  );
}
