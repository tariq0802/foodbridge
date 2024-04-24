"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useUser from "@/hooks/useUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string({ required_error: "please provide your name" }),
  email: z.string({ required_error: "please provide your email" }),
  message: z.string({ required_error: "please provide message" }),
});

const ContactPage = () => {
  const { user, loading, error } = useUser();

  const defaultValues = {
    name: user?.name || "",
    email: user?.email || "",
    message: "",
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      message: "",
    },
  });

  const onSubmit = async (data: any) => {
    toast("Your message is submitted", { description: data.message });
  };
  console.log("default values:", defaultValues);

  return (
    <div>
      <Card className="max-w-[425px] mx-auto my-8">
        <CardContent>
          <CardHeader className="px-0">
            <CardTitle className="text-xl">Contact Us</CardTitle>
            <CardDescription>Contact us for any query </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Write your name"
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Write your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your message here..."
                        className="resize-none h-44"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter className="flex items-end justify-end p-0 mt-4">
                <Button type="submit">Submit</Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactPage;
