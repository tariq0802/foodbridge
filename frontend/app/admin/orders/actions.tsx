"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { FileCog, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import axios from "axios";

const FormSchema = z.object({
  status: z.string({
    required_error: "Please select an option to display.",
  }),
});

export function OrderAction({ id }: { id: number }) {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  if (typeof window === "undefined") {
    return;
  }
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/orders/${id}/`,
        data,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setOpen(false);
      window.location.reload();
    } catch (error: any) {
      toast("Something went wrong", {
        description: error.toString(),
      });
    }
  }

  async function onDelete() {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/orders/${id}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setDeleteOpen(false);
      window.location.reload();
    } catch (error: any) {
        console.log(error);
        
      toast("Something went wrong", {
        description: error.toString(),
      });
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full hover:bg-slate-100">
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="flex gap-2 items-center p-2 w-full"
          >
            <FileCog size={15} />
            Update
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update this order status</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="S">Success</SelectItem>
                        <SelectItem value="P">Pending</SelectItem>
                        <SelectItem value="C">Cancel</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      U can only update the status of booking
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogTrigger className="w-full hover:bg-slate-100 text-rose-600">
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="flex gap-2 items-center p-2"
          >
            <Trash2 size={15} />
            Delete
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>are you sure to delete?</DialogTitle>
          <DialogDescription>This couldnt be undone again</DialogDescription>
          <div onClick={() => setDeleteOpen(false)} className="flex w-[60%] gap-2 ml-auto">
            <Button className="flex-1" variant={"outline"}>Cancel</Button>
            <Button className="flex-1" variant={"destructive"} onClick={() => onDelete()}>Confirm</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
