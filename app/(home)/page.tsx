import { trpc } from "@/trpc/server";

export default async function Home() {
  void trpc.hello.prefetch({ text: "Sashen Hasindu" });

  return <div>Client Says: {}</div>;
}
