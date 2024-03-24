import React from 'react';

const Skeleton = () => {
  return (
    <>
      {new Array(6).fill().map((_, i) => (
        <div
          key={i}
          className='w-[11rem] h-[13rem] md:w-52 md:h-60 shrink-0 shadow-md bg-slate-50 rounded-lg animate-pulse'
        ></div>
      ))}
    </>
  );
};

export default Skeleton;
