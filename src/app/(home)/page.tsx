import { trpc } from "@/trpc/server";

const Page = async () => {
  const data = await trpc.hello({ text: "Antonio" });
  return <div>I will load videos in the future {data?.greeting}</div>;
};
export default Page;
