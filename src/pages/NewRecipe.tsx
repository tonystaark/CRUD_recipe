import React, {useState } from 'react';
import { useNavigate } from "react-router-dom";
import CustomPageHeader from "../components/CustomPageHeader";
import { Form, Button } from 'antd';
import RecipeForm, { imageEmptyState} from '../components/RecipeForm';
import { useCreateRecipe } from '../apis/hooks';
import OpenNotificationWithIcon from '../components/Notification';


const NewRecipe = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const createRecipeMutation = useCreateRecipe(
    (res) => {
      navigate('/recipes')
      //@ts-ignore
      OpenNotificationWithIcon('success', res.data.title, 'has been created')
    },
    () => {
      //@ts-ignore
      OpenNotificationWithIcon('error', '', 'failed to be created')
    },
  );
  const [fileList, setFileList] = useState(imageEmptyState);

  const clearForm = () => {
    form.resetFields()
  }
  
  const submitForm = () => {

     if (fileList  && fileList.length > 0 && fileList[0].status === 'done'){
        const formValues = {
          ...form.getFieldsValue(),
          images: {
            publicId: fileList[0].response?.publicId,
            publicUrl: fileList[0].response?.publicUrl,
          }
        }
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