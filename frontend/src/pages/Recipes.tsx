import React, { useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useQueryClient } from 'react-query';
import CustomPageHeader from "../components/CustomPageHeader";
import { Card, Row, Col, notification} from "antd";
import { IPostNewRecipeResponse } from '../apis/model';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useGetAllRecipes, useDeleteRecipe } from '../apis/hooks';
import QUERY_KEYS from '../apis/keys';
import OpenNotificationWithIcon from '../components/Notification';

const { Meta } = Card

const Recipes = () => {
  const navigate =  useNavigate();
  const queryClient = useQueryClient();
  const { data: allRecipes }  = useGetAllRecipes();
  const [ recipeTitleDeleted, setRecipeTitleDeleted] = useState('')
  const deleteRecipe = useDeleteRecipe(
    () => {
      //@ts-ignore
      OpenNotificationWithIcon('success', recipeTitleDeleted, 'has been deleted')
      queryClient.invalidateQueries(QUERY_KEYS.GET_ALL_RECIPES)
    }, 
    () => {
      //@ts-ignore
      openNotificationWithIcon('error', recipeTitleDeleted, 'failed to be deleted')
    },
    () => {
      setRecipeTitleDeleted('');
    }
  );

  const deleteRecipeHandler = (recipeId: string, recipeTitle: string) => {
      setRecipeTitleDeleted(recipeTitle);
    deleteRecipe.mutate(recipeId);
  }
  return (
    <>
      <CustomPageHeader
        title="Vegan Recipes"
        subtitle="this is the page for a list of vegan recipes"
        onClickAction={() => navigate('/')}
      />
      <Row gutter={[16, 16]}>

        {
          allRecipes && allRecipes.length > 0 && allRecipes.map( (recipe:IPostNewRecipeResponse, idx: number) =>  
            <>
              <Col 
              key={idx}
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 6 }}
              lg={{ span: 6 }}
              xl={{ span: 6 }}   
              >
                <Card hoverable 
                  className='recipe-card' 
                  cover={<img alt="example" src={recipe.images?.publicUrl} onClick={() => navigate(`${recipe._id}`)}/>}
                  actions={[
                  <EditOutlined key="edit" onClick={() => navigate(`${recipe._id}`, { state: {isEdit: true}})} />,
                  <DeleteOutlined key="delete" onClick={() => deleteRecipeHandler(recipe._id, recipe.title)}/>,
                ]}>
                  <Meta title={recipe.title}/>
                
                </Card>
              </Col>
            </>              
          )
        }
      </Row>
    </>
  )
}

export default Recipes;