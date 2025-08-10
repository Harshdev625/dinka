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
import { OptionIcon } from "lucide-react"
export function DialogDemo({btnClick}:any) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <div ><OptionIcon height={15}/></div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] rounded-4xl">
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Are you sure want to delete the post
            </DialogDescription>
          </DialogHeader>
         
          <DialogFooter >
            <DialogClose  asChild>
              <Button variant="outline" className="rounded-full">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={btnClick} className="rounded-full bg-red-600">Delete Post</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
