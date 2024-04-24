"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Edit2, FileCog, Trash2 } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const FormSchema = z.object({
  is_published: z.boolean({})
});

export function ListingActions({ id, isPublished }: { id: number, isPublished: boolean }) {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { is_published: isPublished },
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
        `http://127.0.0.1:8000/api/foods/${id}/`,
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
      toast("Something went wrong", {
        description: error.toString(),
      });
    }
  }

  return (
    <>
      <Link href={`/listings/${id}/update`}
        className="flex gap-2 items-center p-2 w-full text-sm"
      >
        <Edit2 size={15} />
        Update Item
      </Link>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full hover:bg-slate-100">
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="flex gap-2 items-center p-2 w-full"
          >
            <FileCog size={15} />
            Update Status
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Item status</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="is_published"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>update the status of this item</FormLabel>
                      <FormDescription>
                        Set publish for publishing the post. U can unchecked it
                        if you dont want to publish it
                      </FormDescription>
                    </div>
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
          <div
            onClick={() => setDeleteOpen(false)}
            className="flex w-[60%] gap-2 ml-auto"
          >
            <Button className="flex-1" variant={"outline"}>
              Cancel
            </Button>
            <Button
              className="flex-1"
              variant={"destructive"}
              onClick={() => onDelete()}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
