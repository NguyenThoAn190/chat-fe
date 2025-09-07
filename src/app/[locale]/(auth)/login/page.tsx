import { Command } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import { ModeToggle } from "@/components/system/mode-toggle"
import bannerLogin from "@/assets/page/login/login-banner.png"
export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-md">
              <Command className="size-4" />
            </div>
            <div>
              <div className="">ENJOY SPORT</div>
              <div className="text-sm">Account</div>
            </div>
          </a>
          <ModeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block text-center">
        <img
          src={bannerLogin.src}
          alt="Image"
          className="absolute inset-0 h-full object-cover text-center dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
