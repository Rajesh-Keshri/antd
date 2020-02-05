import React,{ forwardRef, useState, useEffect } from 'react'
import Dragger from 'antd/lib/upload/Dragger';
import { Icon } from '@material-ui/core';
import { Button, Upload } from 'antd';
import { string, func } from 'prop-types';
import style from './index.less';


const CustomUploadFile =  forwardRef(({type, urlImg, onChange,...restProps}, ref) =>{
 
  const ON_REMOVE= 'onRemoveFile';
  const ON_CHANGE= 'onChangeFile';
  const ON_BASE64= 'onBase64File';

  const [urlImage, setUrlImage] = useState(urlImg);
  
  useEffect(() => {
    if(urlImage !== urlImg){
      setUrlImage(urlImg)
    }
  })

  const getBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })

  const transformFileAndSend= async (file)=>{
    const data64 = await getBase64(file);
    onChange(data64,ON_BASE64); 
    setUrlImage(data64)
    return false;
  }
  
  const onRemoveFile = (info)=>{
    onChange(info, ON_REMOVE);
    setUrlImage('')
  }

  return (type === 'dragger'? (
    <Dragger 
      className={style.UploadFile}
      {...restProps} 
      multiple={false}
      beforeUpload={(file)=>{transformFileAndSend(file); return false}}
      onChange={(info)=>onChange(info, ON_CHANGE)}
      onRemove={onRemoveFile} 
      action={transformFileAndSend} 
      ref={ref}
    >
      <p className="ant-upload-drag-icon">
        <Icon className={style.UploadFile_icon} fontSize='large'>
                  cloud_upload
        </Icon>
      </p>
      <p className={`ant-upload-text ${style.UploadFile_text}`}>
                   Browse or Drag n Drop File to this area to Upload
      </p>
    </Dragger>)
    :(
      <Upload
        beforeUpload={(file)=>{transformFileAndSend(file); return false}}
        onChange={(info)=>onChange(info, ON_CHANGE)}
        onRemove={onRemoveFile} 
        action={transformFileAndSend}
        {...restProps}
      >
        <div>
          <img alt="logo" src={urlImage} className={style.UploadFile_img} />
        </div>
        <Button className={style.UploadFile_button}>
          Change Airline Logo
        </Button>
      </Upload>))
    
});
CustomUploadFile.defaultProps={
  type: '',
  urlImg: ''
}

CustomUploadFile.propTypes = {
  type:string,
  urlImg: string,
  onChange:func.isRequired
}

export default CustomUploadFile;
