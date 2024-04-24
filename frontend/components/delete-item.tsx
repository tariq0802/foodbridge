'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

interface DeleteItemProps {
    // token: string;
    foodId: number;
}

const DeleteItem: React.FC<DeleteItemProps> = ({ foodId}) => {
    const router = useRouter()
    const pathname = usePathname()
    const {token} = useUser()
    
    const handleDelete = async () => {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/foods/${foodId}/`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        toast("Items deleted successfully")
        if (pathname.startsWith("/listings")) {
          router.push("/listings");
        } else {
          router.refresh();
        }
      } catch (error: any) {
        toast("Error deleting item:", {description: error});
      }
    };

    return (
      <div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-rose-600">
                This action cannot be undone. This will permanently delete item data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-rose-500">
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
}

export default DeleteItem;