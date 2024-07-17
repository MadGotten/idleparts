import React from 'react';
import Categories from '../../components/Categories';
import ImgSlider from '../../components/ImgSlider';
import HomeProducts from '../../components/Product';

const ProfilePage = () => {
  return (
    <div>
      <div className='flex flex-row w-full gap-4'>
        <Categories />
        <ImgSlider />
      </div>
      <HomeProducts />
      <HomeProducts />
    </div>
  );
};

export default ProfilePage;
