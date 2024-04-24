import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader, LogIn } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loginOpen, setloginOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { push } = useRouter();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:8000/api/users/", data);
      router.push("/");
      setOpen(false);
      setloginOpen(true);
      window.location.reload();
    } catch (error: any) {
      toast("An error occurred", {description: error.message})
    }
    setLoading(false);
    push("/");
  };

  const onLogin = async (data: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/token/",
        data
      );
      router.push("/");
      setloginOpen(false);
      const { access, refresh } = response.data;
      localStorage.clear();
      localStorage.setItem("token", access);
      window.location.reload();
    } catch (error: any) {
      toast("Email & Password Mismatch", { description: error });
    }
    setLoading(false);
    push("/");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Register to Food Bridge</DialogTitle>
              <DialogDescription>
                Already have Food Bridge account?{" "}
                <span
                  onClick={() => {
                    setOpen(false);
                    setloginOpen(true);
                  }}
                  className="text-rose-500 cursor-pointer"
                >
                  Login
                </span>
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  className="col-span-3"
                  placeholder="Enter your name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  {...register("email")}
                  className="col-span-3"
                  placeholder="Enter email"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  {...register("password")}
                  className="col-span-3"
                  placeholder="Enter password"
                  disabled={loading}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="submit">Register</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={loginOpen} onOpenChange={setloginOpen}>
        <DialogTrigger asChild>
          <Button className="gap-1" variant={"ghost"} >
            <LogIn size={15} className="text-sky-600"/>Login
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit(onLogin)}>
            <DialogHeader>
              <DialogTitle>Login to Food Bridge</DialogTitle>
              <DialogDescription>
                Dont have Food Bridge account?{" "}
                <span
                  onClick={() => {
                    setOpen(true);
                    setloginOpen(false);
                  }}
                  className="text-rose-500 cursor-pointer"
                >
                  Register
                </span>
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  {...register("email")}
                  className="col-span-3"
                  placeholder="Enter email"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  {...register("password")}
                  className="col-span-3"
                  placeholder="Enter password"
                  disabled={loading}
                />
              </div>
            </div>
            {loading && (
              <div className="absolute top-[50%] left-[50%]">
                <Loader />
              </div>
            )}
            <DialogFooter>
              <Button type="submit">Login</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Login;
