export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    query: string;
    categoryId: string | undefined;
  }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const { categoryId, query } = await searchParams;
  return (
    <div>
      Searching for {query} {categoryId && `in category ${categoryId}`}
    </div>
  );
};

export default Page;
