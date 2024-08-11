import Spinner from '@/components/Spinner';

const Skeleton = () => {
  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {new Array(2).fill().map((_, i) => (
        <div key={i} className="flex flex-row gap-2">
          <div className="w-[9rem] h-[12rem] sm:w-[11rem] sm:h-[13rem] md:w-52 md:h-60 shrink-0 shadow-md bg-slate-50 rounded-lg animate-pulse flex justify-center items-center">
            <Spinner />
          </div>
          <div className="w-20 md:w-32 shirnk-0 bg-slate-50 shadow-md rounded-lg animate-pulse flex justify-center items-center">
            <Spinner />
          </div>
        </div>
      ))}
      <div className="w-32 -space-x-px h-8 bg-slate-50 shadow-md rounded-lg animate-pulse">
        &nbsp;
      </div>
    </div>
  );
};

export default Skeleton;
