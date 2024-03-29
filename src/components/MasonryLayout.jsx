import React from 'react';
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = () => (
  <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointColumnsObj}>
    
  </Masonry>
);

export default MasonryLayout;