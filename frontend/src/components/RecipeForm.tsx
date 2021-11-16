import React, { Dispatch, SetStateAction } from 'react';
import { Form, Input, Button, Space, Upload, FormInstance } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { IPostNewRecipeResponse, IImageAssets  } from '../apis/model';
import { isEmpty } from '../../src/utils/conditionalCheck';
import { removeImage } from '../apis/api';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

interface IFileListStateHandling {
  fileList: IFileList[];
  setFileList: Dispatch<SetStateAction<any[]>>;
}

interface RecipeFormProps {
  recipeData?: IPostNewRecipeResponse;
  isEdit: boolean;
  form: FormInstance<any>;
  fileListStateHandling: IFileListStateHandling
}

export const imageEmptyState: IFileList []= [];

interface IFileList {
  uid: string,
  name: string,
  status: string,
  url: string,
  response?: {
    publicId: string,
    publicUrl: string
  }
}

export const getExistingImage = (imageAssets?:  IImageAssets) => {
  if(imageAssets){
    const { publicId, publicUrl} = imageAssets;
    return [{
        uid: publicId,
        name: '',
        status: 'done',
        url: publicUrl,
      }
    ]
  } else {
    return imageEmptyState
  }
}

const removeImageHandler = (fileList: IFileList[], removeImageApiHandler:any, setImageStateHandler: (arg: IFileList[]) => void) =>
  !isEmpty(fileList) && fileList[0].response && removeImageApiHandler(fileList[0].response.publicId) && setImageStateHandler([...imageEmptyState]);

const RecipeForm = ({recipeData, isEdit, form, fileListStateHandling}: RecipeFormProps) => {
  
  const { fileList, setFileList} = fileListStateHandling;
  const recipeClone = recipeData;
  //@ts-ignore
  const onChangeImage = ({ fileList: newFileList }) => {
    removeImageHandler(fileList,removeImage,setFileList);
    setFileList(newFileList);
  };

    // @ts-ignore
  const onPreviewImage = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow && imgWindow.document.write(image.outerHTML);
  };

  return (

      <Form form={form} name="dynamic_form_item" 
        className={isEdit ? 'edit-recipe-form' : 'new-recipe-form'}
        initialValues={recipeClone}
      >
        <Form.Item
            name="title"
            label="Recipe Name"
            rules={[
              { required: true },
              { type: 'string', min: 10 },
            ]}
          >
            <Input placeholder="Please type the question here" />
        </Form.Item>
        
        <Form.List
          name="ingredients"
          rules={[
            {
              validator: async (_, ingredients) => {
                if (!ingredients || ingredients.length < 2) {
                  return Promise.reject(new Error('At least 2 ingredients'));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Form.Item
                  {...(key === 0 ? formItemLayout : formItemLayoutWithOutLabel) }
                  label={key === 0 ? 'Ingredients' : ''}
                  required={true}
                  style={{ marginBottom: 0 }}
                  key={fieldKey}
                >
                   <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                   <Form.Item
                      {...restField}
                      name={[name, 'amount']}
                      fieldKey={[fieldKey, 'amount']}
                      rules={[{ required: true, message: 'Missing ingredient amount' }]}
                      style={{ marginBottom: 0 }}
                    >
                      <Input placeholder="Ingredient Amount" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'ingredient']}
                      fieldKey={[fieldKey, 'ingredient']}
                      rules={[{ required: true, message: 'Missing ingredient name' }]}
                      style={{ marginBottom: 0 }}
                    >
                      <Input placeholder="Ingredient Name" />
                    </Form.Item>
                  
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>                
                </Form.Item>
              ))}
              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: '60%' }}
                  icon={<PlusOutlined />}
                >
                  Add Ingredients
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.List
          name="instructions"
          rules={[
            {
              validator: async (_, instructions) => {
                if (!instructions || instructions.length < 2) {
                  return Promise.reject(new Error('At least 2 instructions'));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Instructions' : ''}
                  required={true}
                  key={field.key}
                  className='instruction-field'
                >
                  <Space key={index} style={{ display: 'flex', marginBottom: 8}} align="baseline">

                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Please input option or delete this field.",
                        },
                      ]}
                      style={{ marginBottom: 0}}

                    >
                      <Input.TextArea
                        placeholder={`What is step ${index + 1} ?`}
                        autoSize={{ minRows: 3, maxRows: 5 }}
                      />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Space>
                </Form.Item>
              ))}
              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: '60%' }}
                  icon={<PlusOutlined />}
                >
                  Add instruction
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
     
        <Form.Item 
          label="Recipe Image"
          name="images" 
          valuePropName="fileList"
          rules={[
            {
              required: true,
              message: 'Please upload a recipe image',
              type: 'array',
            },
          ]}
        >

          <ImgCrop rotate>
            
            <Upload
              action='/image'
              listType="picture-card"
              onChange={onChangeImage}
              onPreview={onPreviewImage}
              accept={'image/*'}
              //@ts-ignore
              fileList={fileList}
              maxCount={1}
            > 
              + Upload
            </Upload>
          </ImgCrop>
        </Form.Item>
      </Form>
  )
 }

 export default RecipeForm;