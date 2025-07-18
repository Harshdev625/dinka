import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/signup-page"

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium bg-white w-16 h-16 justify-center rounded-3xl border">
          <div className=" logo text-center w-min mt-1">
            dinka
          </div>
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
