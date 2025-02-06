import { HomeLayout } from "@/modules/home/ui/layouts/home-layout";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return <HomeLayout>{children}</HomeLayout>;
}

export default Layout;
