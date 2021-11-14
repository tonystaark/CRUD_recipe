import React from 'react';
import { useNavigate } from "react-router-dom";
import CustomPageHeader from "../components/CustomPageHeader";
import { Card } from "antd";
import { RightOutlined } from '@ant-design/icons';
const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <CustomPageHeader
        title="Home"
        subtitle="this is the home page"
      />
      <div className='page-content home-page-content'>
        <Card hoverable onClick={() => navigate('/recipes')} style={{ width: 300 }}>
          View Recipes
          <RightOutlined />
        </Card>
        <Card hoverable onClick={() => navigate('/create-recipe')} style={{ width: 300 }}>
          Create New Recipe
          <RightOutlined />
        </Card>

      </div>
    
    </>
  )
}

export default Home;