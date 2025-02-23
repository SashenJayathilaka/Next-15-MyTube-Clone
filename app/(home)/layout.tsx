import { HomeLayout } from "@/modules/home/ui/layouts/home-layout";

export const dynamic = "force-dynamic";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return <HomeLayout>{children}</HomeLayout>;
}

export default Layout;
