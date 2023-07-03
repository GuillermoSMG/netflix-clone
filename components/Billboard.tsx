import useBillboard from '@/hooks/useBillboard';
import React from 'react';

import { AiOutlineInfoCircle } from 'react-icons/ai';
import PlayButton from './PlayButton';

const Billboard = () => {
  const { data } = useBillboard();
  return (
    <div className='relative h-[56.25dvw] m-0'>
      <video
        className='w-full h-[56.25dvw] object-cover brightness-[60%]'
        autoPlay
        muted
        loop
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}
      />
      <div className='absolute top-[30%] md:top-[40%] ml-4 md:ml-16'>
        <p className='text-white text-xl md:text-5xl h-full w-[50%] lb:text-6xl font-bold drop-shadow-xl'>
          {data?.title}
        </p>
        <p className='text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl'>
          {data?.description}
        </p>
        <div className='flex items-center mt-3 md:mt-4 gap-3'>
          <PlayButton movieId={data?.id} />
          <button className='bg-white/40 text-white rounded py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex items-center hover:bg-white/30 transition'>
            <AiOutlineInfoCircle className='mr-1' />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};
export default Billboard;
