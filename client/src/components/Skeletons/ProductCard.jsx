import Spinner from '@/components/Spinner';

function ProductCard() {
  return (
    <div className="flex flex-col sm:flex-row w-full gap-4 h-52">
      <div className="flex md:flex-row gap-x-2 gap-y-4 h-auto w-full sm:w-2/3 p-4 bg-slate-50 shadow-md drop-shadow-md rounded-lg justify-center items-center">
        <Spinner />
      </div>
      <div className="flex w-full sm:w-1/3 p-4 justify-center bg-slate-50 shadow-md drop-shadow-md rounded-lg items-center">
        <Spinner />
      </div>
    </div>
  );
}

export default ProductCard;
