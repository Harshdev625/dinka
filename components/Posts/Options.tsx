import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { OptionIcon } from "lucide-react"
export function DialogDemo() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <div ><OptionIcon height={15}/></div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] rounded-4xl">
          <DialogHeader>
            <DialogTitle>Options</DialogTitle>
            <DialogDescription>
              Make changes to the post here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
         
          <DialogFooter >
            <DialogClose  asChild>
              <Button variant="outline" className="rounded-full">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="rounded-full">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
