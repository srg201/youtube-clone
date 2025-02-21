import TrendingVideosSection from "../sections/trending-videos-section";

const TrendingView = () => {
  return (
    <div className="max-w-[150rem] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
      <div>
        <h1 className="text-2xl font-bold">Trending 📈</h1>
        <p className="text-xs text-muted-foreground mt-2">
          Most popular videos at the moment
        </p>
      </div>
      <TrendingVideosSection />
    </div>
  );
};
export default TrendingView;
