import { Separator } from "@/components/ui/separator";
import Heading from "@/components/heading";
import UserNav from "./components/user-nav";

interface UserLayoutProps {
  children: React.ReactNode;
  params: {id: string}
}

const navItems = [
  {
    title: "Profile",
    href: "",
  },
  {
    title: "Orders",
    href: "/orders",
  },
  {
    title: "Donations",
    href: "/donations",
  },
];

export default function UserLayout({ children, params }: UserLayoutProps) {
    const {id} = params;
    
  return (
    <div className="space-y-6 py-10">
      <Heading
        title="User Area"
        subtitle="Manage profile and view orders from here."
      />
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <UserNav items={navItems} userId={id}/>
    
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
