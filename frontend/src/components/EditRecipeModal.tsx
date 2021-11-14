import React, { useState } from 'react';
import { Modal, Button, Form, Input} from 'antd';
import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { IPostNewRecipeResponse } from '../apis/model';
import RecipeForm, { getExistingImage} from '../components/RecipeForm';
import { useUpdateRecipe } from '../apis/hooks';
import QUERY_KEYS from '../apis/keys';

interface EditRecipeModalProps {
  visible: boolean;
  onSubmitAction: () => void;
  onCancelAction: () => void;
  recipeData: IPostNewRecipeResponse
}

const EditRecipeModal = ({visible, onSubmitAction, onCancelAction, recipeData}: EditRecipeModalProps) => {
    const queryClient = useQueryClient();
    const [form] = Form.useForm();
    const { id: recipeId }:any = useParams();
    const [fileList, setFileList] = useState(getExistingImage(recipeData?.images));
    const updateRecipe = useUpdateRecipe(recipeId, 
      () => {
        queryClient.invalidateQueries([QUERY_KEYS.GET_RECIPE, recipeId])
      }
      
    );
    recipeData && form.setFieldsValue({...recipeData});

    const submitForm = () => {
      console.log('getvalues',form.getFieldsValue())
      
      const formValues = {
        ...form.getFieldsValue(),
        images: {
          publicId: fileList[0].uid,
          publicUrl: fileList[0].url,
        }
      }
      console.log('sendtoapi', formValues)
      fileList && fileList[0].uid && fileList[0].url && updateRecipe.mutate(formValues)
    }

    return (
      <>
        <Modal
          visible={visible}
          title="Title"
          onOk={onSubmitAction}
          onCancel={onCancelAction}
          width={800}
          footer={[
            <Button key="back" onClick={onCancelAction}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={updateRecipe.isLoading} onClick={() => submitForm()}>
              Submit
            </Button>
          ]}
        >
          {
            
            recipeData && <RecipeForm form={form} recipeData={recipeData} fileListStateHandling={{fileList, setFileList}} isEdit={true}/>
          }
        </Modal>
      </>
    );
}

export default EditRecipeModal;