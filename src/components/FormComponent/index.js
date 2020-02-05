import React,{ useState, useEffect} from 'react';
import { Form, Row, Col } from 'antd';
import { func, bool, any, string } from 'prop-types';
import styles from './index.less';
import FormFactory from './FormFactory';
import { formType } from '@/types/common.proptypes';
import UnsavedChangesAlert from '../UnsavedChangesAlert';

const FormComponent = (props) =>{
  const { triggerOnTouchedAlert, formItems, isPaxChanged } = props;
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [formDetail, setFormDetail] = useState({})

  useEffect(() => {
    setUnsavedChanges(false);
  }, [triggerOnTouchedAlert]);

  useEffect(() => {
    setFormDetail(formItems);
  }, [formItems, isPaxChanged]);

  const onTouchedField = ()=>{
    if(!unsavedChanges){
      setUnsavedChanges(true);
    }
  };


  const renderForm = () => {
    const { item, readOnly, form, onChangeEventRef, onTouchChange } = props;
    const { getFieldDecorator } = form;
    let formElementArray = [];


    if (Array.isArray(formDetail)) {
      formElementArray = formDetail.map(items => {
        const formArray = Object.keys(items).map(e => items[e]);
        return <FormFactory
          formArray={formArray}
          getFieldDecorator={getFieldDecorator}
          editValue={item}
          readOnly={readOnly}
          onChangeEventRef={onChangeEventRef}
          triggerTouchedField={onTouchedField}
          onTouchChange={onTouchChange}
        />
      });
    } else if (Object.keys(formDetail).length === 1) {
      const formArray = Object.keys(formDetail).map(e => formDetail[e]);

      formElementArray = [<FormFactory
        formArray={formArray}
        getFieldDecorator={getFieldDecorator}
        editValue={item}
        readOnly={readOnly}
        onChangeEventRef={onChangeEventRef}
        triggerTouchedField={onTouchedField}
        onTouchChange={onTouchChange}
      />];
    } else if (Object.keys(formDetail).length > 1) {
      const formArray = [formDetail];
      formElementArray = [<FormFactory
        formArray={formArray}
        getFieldDecorator={getFieldDecorator}
        editValue={item}
        readOnly={readOnly}
        onChangeEventRef={onChangeEventRef}
        triggerTouchedField={onTouchedField}
        onTouchChange={onTouchChange}
      />];
    }
    return formElementArray;
  };

  const formElements = renderForm();
  const colSpan = formElements.length > 0 ? 24 / formElements.length : 24;
  const { triggerOnTouchedMssg, headers, formName, paddingBottom  } = props;

  return (
    <React.Fragment>
      <Form layout="vertical" name={`${formName}_form`}>
        {headers !== undefined && headers.length > 0 ? (
          <Row key="header1">
            {headers.map((heading, index) => {
              const key = `${'h'}${index}`;
              const styleClass = index % 2 !== 0
                ? `${styles.FormComponent__header} ${styles.FormComponent__pdL} ${paddingBottom || ''}`
                : `${styles.FormComponent__header} ${paddingBottom || ''}`;
              return (
                <Col
                  span={colSpan}
                  className={styleClass}
                  key={key}
                >
                  {heading}
                </Col>
              );
            })}
          </Row>
        ) : (
          ''
        )}
        <Row key="form1" layout="vertical" gutter={24}>
          {formElements.map((item, index) => {
            const key = `${'c'}${index}`;
            return (
              <Col span={colSpan} key={key}>
                {item}
              </Col>
            );
          })}
        </Row>
      </Form>
      {triggerOnTouchedAlert ?
        <UnsavedChangesAlert unsavedChanges={unsavedChanges} page={triggerOnTouchedMssg} /> : null
      }


    </React.Fragment>

  );
};


FormComponent.defaultProps={
  form: {},
  headers: undefined,
  paddingBottom: undefined,
  formName: undefined,
  item: undefined,
  formItems: undefined,
  readOnly: undefined,
  triggerOnTouchedMssg:'you have unsaved changes',
  triggerOnTouchedAlert: false,
  onChangeEventRef: ()=>{},
  isPaxChanged:false,
  onTouchChange: ()=>{}
};

FormComponent.propTypes = {
  headers: any,
  formName: string,
  paddingBottom: any,
  form: formType,
  item: any,
  formItems: any,
  readOnly:bool,
  onChangeEventRef: func,
  triggerOnTouchedAlert: bool,
  triggerOnTouchedMssg: string,
  isPaxChanged:bool,
  onTouchChange: func

};

export default FormComponent;
