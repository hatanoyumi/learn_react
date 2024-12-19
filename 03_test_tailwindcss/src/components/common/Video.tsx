import { tw } from '@src/utils';
import { isNil } from 'lodash';
import type { DetailedHTMLProps, VideoHTMLAttributes } from 'react';
import { useState } from 'react';

const Video = ({ placeholder, ...rest }: Props) => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <>
      {!isNil(placeholder) && (
        <img
          fetchPriority='high'
          className={tw(rest.className, videoLoaded && 'hidden')}
          alt='placeholder'
          src={placeholder}
        />
      )}
      <video
        className='h-full w-full object-cover object-center'
        autoPlay
        muted
        loop
        onLoadedData={() => setVideoLoaded(true)}
        playsInline
        {...rest}
      />
    </>
  );
};

export default Video;

export type Props = DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement> & {
  placeholder?: string;
};
