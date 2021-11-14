import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, List, Table, Divider, Image, Space } from 'antd';
import CustomPageHeader from "../components/CustomPageHeader";
import { useGetRecipe } from '../apis/hooks';
import EditRecipeModal from '../components/EditRecipeModal';

const RecipeDetails = () => {

  const { id: recipeId, isEdit }:any = useParams();
  const navigate = useNavigate();
  const location = useLocation()
  const { data }  = useGetRecipe(recipeId);
  const [ isEditModalOpen, setIsEditModalOpen] =  useState(location.state?.isEdit || false)
  const columns = [
    {
      title: 'Ingredient',
      dataIndex: 'ingredient',
      key: 'ingredient',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];
  console.log('iSedut', isEdit)


  return (
    <>
      <CustomPageHeader
        title="Recipe Detail"
        subtitle="this is the page for the recipe detail"
        onClickAction={() => navigate(-1)}
      />
      <div className='page-content'>
        {
          data &&
          <>
            <h1>
              Recipe Name: {data.title}
            </h1>
            <Space size={12}>
              <Image
                width={'100%'}
                src={data.images? data.images.publicUrl:''} 
                placeholder={data.title}
              />
            </Space>
            <Table 
              dataSource={data.ingredients} 
              columns={columns} 
              pagination={false}
            />
            <Divider orientation="left"  style={{ paddingTop: 32 }}>Instructions</Divider>
            {
              data.instructions && 
              <List
                size="large"
                bordered={false}
                dataSource={data.instructions}
                renderItem={(item: string, index:number) => <List.Item>{index + 1}. {item}</List.Item>}
              />
            }

            <EditRecipeModal recipeData={data} visible={isEditModalOpen} onSubmitAction={() => {}} onCancelAction={() => setIsEditModalOpen(false)}/>
          </>
        }
      </div>
    </>
  )
}

export default RecipeDetails;