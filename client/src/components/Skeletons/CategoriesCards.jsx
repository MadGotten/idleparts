import Spinner from '@/components/Spinner';

const Skeleton = () => {
  return (
    <>
      {new Array(2).fill().map((_, i) => (
        <div key={i} className="flex flex-row gap-2">
          <div className="w-[11rem] h-[13rem] md:w-52 md:h-60 shrink-0 shadow-md bg-slate-50 rounded-lg animate-pulse flex justify-center items-center">
            <Spinner />
          </div>
          <div className="w-20 md:w-32 shirnk-0 bg-slate-50 shadow-md rounded-lg animate-pulse flex justify-center items-center">
            <Spinner />
          </div>
        </div>
      ))}
    </>
  );
};

export default Skeleton;
