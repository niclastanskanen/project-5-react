import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Navbar, ImageFeed, ImageDetail, UploadImage, Search } from '../components';
import ImageEdit from '../pages/images/ImageEdit';


const Feed = () => {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <div className='px-2 md:px-5'>
        <div className='bg-gray-50'>
          <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className='h-full'>
          <Routes>
            <Route path='/' element={<ImageFeed />} />
            <Route path='/image' element={<ImageFeed />} />
            <Route path='/image/:imageId' element={<ImageDetail />} />
            <Route path='/image/:imageId/edit' element={<ImageEdit />} />
            <Route path='/upload' element={<UploadImage />} />
            <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
          </Routes>
        </div>
    </div>
  )
}

export default Feed