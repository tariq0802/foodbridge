"use client";

import useUser from "@/hooks/useUser";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Category } from "@/types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  food_name: z.string({ required_error: "please provide a name" }),
  category: z.string({ required_error: "please provide a valid category" }),
  description: z.string({ required_error: "please provide description" }),
  quantity: z.string({ required_error: "please provide the number of items" }),
  expired_at: z
    .date({ required_error: "please provide expiry date" })
    .refine((date) => date > new Date(), {
      message: "Expiration date must be in the future",
    }),
});

interface CreateListingProps {
  initialValues?: any;
  categories: Category[] | null;
  foodId?: number;
}

const CreateUpdateListing: React.FC<CreateListingProps> = ({
  categories,
  initialValues,
  foodId
}) => {
  const router = useRouter()
  const { user, token } = useUser();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialValues || {
      food_name: "",
      category: "",
      description: "",
      quantity: "",
      expired_at: undefined,
    },
  });

  const onSubmit = async (data: any) => {
    const parsedData = {
      ...data,
      category: parseInt(data?.category),
      quantity: parseInt(data?.quantity),
    };

    try {
      let response;
      if (initialValues) {
        response = await axios.patch(
          `http://127.0.0.1:8000/api/foods/${foodId}/`,
          parsedData,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
      } else {
        response = await axios.post(
          `http://127.0.0.1:8000/api/foods/`,
          parsedData,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
      }
      toast("Item created/updated successfully");
      window.location.reload()
    } catch (error: any) {
      toast("Error creating/updating item", { description: error });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="food_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Food Name</FormLabel>
              <FormControl>
                <Input placeholder="Write name of the food" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={initialValues?.category}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories &&
                    categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.category}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Quantity of items"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1 pt-1">
            <FormField
              control={form.control}
              name="expired_at"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="pb-1">Expiery Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell users a little bit about your food"
                  className="resize-none h-44"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-6">
          <Button type="submit" className="w-full bg-sky-700">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateUpdateListing;
