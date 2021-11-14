import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import CustomPageHeader from "../components/CustomPageHeader";
import { Form, Input, Button, message, Space, Upload } from 'antd';
import RecipeForm, { getExistingImage, imageEmptyState} from '../components/RecipeForm';
import { useCreateRecipe } from '../apis/hooks';
import OpenNotificationWithIcon from '../components/Notification';


const NewRecipe = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const createRecipeMutation = useCreateRecipe(
    () => {
      //@ts-ignore
      OpenNotificationWithIcon('success', createRecipeMutation.data?.data.title, 'has been created')
    },
    () => {
      //@ts-ignore
      OpenNotificationWithIcon('error', createRecipeMutation.data?.data.title, 'failed to be created')
    },
  );
  const [fileList, setFileList] = useState(imageEmptyState);

  const clearForm = () => {
    form.resetFields()
  }
  
  const submitForm = () => {
    console.log('getvalues',form.getFieldsValue())

     if (fileList.length > 0 && fileList[0].uid && fileList[0].url){
        const formValues = {
          ...form.getFieldsValue(),
          images: {
            publicId: fileList[0].uid,
            publicUrl: fileList[0].url,
          }
        }
        console.log('sendtoapi', formValues)
        createRecipeMutation.mutate(formValues)
      } else {
        //@ts-ignore
        OpenNotificationWithIcon('error', '', 'please upload a recipe image')
      }
  }
  return (
    <>
      <CustomPageHeader
        title="New Recipe"
        subtitle="this is the page to create new recipe"
        onClickAction={() => navigate('/')}
      />
      {
          <RecipeForm form={form} fileListStateHandling={{fileList, setFileList}} isEdit={true}/>
      }
      <Form.Item className='button-row'>
        <Button type="primary" loading={createRecipeMutation.isLoading} onClick={submitForm} htmlType="submit">
          Submit
        </Button>
        <Button type="primary" onClick={clearForm} htmlType="reset">
          Clear
        </Button>
      </Form.Item>
  </>
  );
}

export default NewRecipe;