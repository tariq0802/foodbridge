import { Separator } from "@/components/ui/separator";
import AdminNav from "./component/admin-nav";
import Heading from "@/components/heading";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    title: "Users",
    href: "/admin",
  },
  {
    title: "Listings",
    href: "/admin/listings",
  },
  {
    title: "Orders",
    href: "/admin/orders",
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="space-y-6 py-10">
      <Heading
        title="Admin Zone"
        subtitle="Manage users, listings and orders from here."
      />
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <AdminNav items={navItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
