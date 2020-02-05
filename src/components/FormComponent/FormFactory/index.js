import React from 'react'
import { Form,
  Input,
  Radio,
  Switch,
  Col,
  DatePicker,
  Select,
  TreeSelect,
  InputNumber,
  Row} from 'antd';
import moment from 'moment';
import { array, func, any } from 'prop-types';
import style from './index.less';
import { isEmpty } from '@/utils/utils';
import CustomCheckbox from './customInputs/CustomCheckBox';
import CustomUploadFile from './customInputs/CustomUploadFile';
import CustomSelectBox from './customInputs/CustomSelectBox';
import ValueChangerDropDown from './customInputs/ValueChangerDropDown';
import SelectAirlineComponent from './customInputs/SelectAirline';

const {RangePicker } = DatePicker;

const { TextArea } = Input;
const { Option } = Select;
const { SHOW_PARENT } = TreeSelect;

let startDate ='';

const FormFactory = ({
  formArray,
  getFieldDecorator,
  editValue,
  readOnly,
  onChangeEventRef,
  triggerTouchedField,
  onTouchChange}) => {


  /** ******************************
     *
     *          Select Box
     *
     * ******************************* */

  const renderSelectOption=(field)=>field.options.map(elem =>(
    <Option key={elem.value || elem} value={elem.value || elem}>
      {elem.name || elem}
    </Option>
  ));


  /** ******************************
     *
     *          Date Picker
     *
     * ******************************* */


  const timeChanged=(time, field)=>{
    if(field.startDate){
      startDate=time
    }
    if(onChangeEventRef) onChangeEventRef();
  };

  const disabledDate=(current, field) => {
    if(field.endDate){
      return current.valueOf() <= startDate.valueOf();
    }
    // Can not select days before today and today
    return current && current < moment().subtract(1,'days');
  };


  /** ******************************
     *
     *          RdioButton
     *
     * ******************************* */

  /**
   * This event is triggered everytime
   * a radio is clicked
   * @param {*} e
   * @param {*} field
   */
  const onChangeRadio= (e,field)=>{
    if(field.triggerChange){
      onChangeEventRef(e.target.value, field.name);
    }
  };

  /**
   * This is to render the options
   * from the RadioGroup
   * @param {*} field
   */
  const renderInputOptions =(field)=>{
    const spanRadio = 24 / field.options.length;

    return (field.options
      .map(option=> {
        const idName= `RadioBtn-btn-${option.name.replace(/\s/g,'')}`;
        return (
          <Col key={option.value} span={spanRadio}>
            <Radio
              className={`${style.FormFactory_radioGroup_radioBtn} ${option.className}`}
              disabled={option.disabled}
              data-test={idName}
              id={idName}
              onChange={(e)=>{onChangeRadio(e, field)}}
              value={option.value}
            >{option.name}
            </Radio>
          </Col>)
      })
    )
  };

  /** ******************************
     *
     *          Default Input
     *
     * ******************************* */

  /**
   * This event is triggered everytime
   * an input has changed
   * @param {*} e
   * @param {*} field
   */
  const onChangeInput= (e, field)=>{
    if(field.forceUpperCase){
      const inputElement = document.getElementById(field.name);
      inputElement.value = inputElement.value.toUpperCase()
    }
    if(onChangeEventRef) onChangeEventRef(e, field.name);
  };

  /**
   * Factory to create inputs depending of the type.
   *
   * @param {*} field
   * @returns
   */
  const inputFactory=(field)=>{
    switch(field.type){
    case 'checkbox' :
      return <CustomCheckbox details={field} />;
    case 'radio-button':
      return (
        <Radio.Group
          data-test="RadioBtn"
          onChange={triggerTouchedField}
          className={style.FormFactory_radioGroup}
        >
          {renderInputOptions(field)}
        </Radio.Group>);
    case 'textArea':
      return(<TextArea
        onChange={triggerTouchedField}
        placeholder={field.placeholder || field.label}
        rows={field.rowsArea}
        className={field.className}
        autosize={{minRows:field.minRows, maxRows:field.maxRows}}
      />);
    case 'datePicker':
      return(
        <DatePicker
          disabled={field.disable && readOnly}
          onChange={(time)=>{timeChanged(time,field); triggerTouchedField()}}
          disabledDate={!field.disabledDate?(current) => disabledDate(current, field):()=>{}}
          data-test={`${field.label.replace(/\s/g,'')}-date-picker`}
          style={{width:'100%'}}
          format={field.format}
          showTime={field.showTime}
          className={`${style.FormFactory_input} ${style.FormFactory_datePicker} ${field.className}`}
          placeholder={field.placeholder || field.label}
        />);
    case 'rangePicker':
      return(
        <RangePicker
          disabled={field.disable && readOnly}
          style={{width:'100%'}}
          showTime={field.showTime}
          disabledDate={(current)=>disabledDate(current, field)}
          data-test={`${field.label.replace(/\s/g,'')}-date-picker`}
          className={`${style.FormFactory_input} ${style.FormFactory_datePicker} ${field.className}`}
          format={field.format}
          placeholder={field.placeholder || field.label}
        />

      );
    case 'editView':
      return  (<Input
        className={`${style.FormFactory_input} ${field.className}`}
        data-test={field.dataTest || ''}
        onChange={(e)=> { onChangeInput(e, field); triggerTouchedField()}}
        placeholder={field.placeholder || field.label}
        disabled={field.disable && readOnly}
      />);
    case 'selectBox':
      return (
        <Select
          data-test={field.name || 'select'}
          disabled={field.disable && readOnly}
          showSearch={field.showSearch}
          className={`${style.FormFactory_select} ${field.className}`}
          intitalValue={field.defaultValue}
          onChange={(e) => {
            if(field.triggerChange) onChangeEventRef(e,field.name);
            triggerTouchedField();
          }}
          placeholder={field.placeholder || field.label}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          dropdownMatchSelectWidth={field.isExpand}
        >
          {renderSelectOption(field)}
        </Select>);
    case 'number':
      return (
        <InputNumber
          className={`${style.FormFactory_input} ${field.className}`}
          data-test={field.dataTest || ''}
          onChange={(e)=> { onChangeInput(e, field); triggerTouchedField(); }}
          placeholder={field.placeholder || field.label}
          disabled={field.disable && readOnly}
        />
      );
    case 'switch':
      return (
        <Switch
          className={field.className}
          checked={field.checked}
          size={field.size}
          onChange={(e)=>{onChangeEventRef(e, field.name); triggerTouchedField();}}
        />);
    case 'uploadFile':
      return (
        <CustomUploadFile
          urlImg={field.urlImg}
          type={field.typeOfUpload}
          multiple={field.multiple}
          accept={field.accept}
          className={field.className}
          fileList={field.fileList}
          onChange={onChangeEventRef}
        />);
    case 'treeSelect': 
      return (
        <div data-test={field.dataTest}> 
          <TreeSelect 
            className={field.className}
            treeData={field.options}
            treeDefaultExpandAll={field.defaultExpandAll}
            onChange={onChangeEventRef}
            treeCheckable={field.treeCheckable}
            showCheckedStrategy={SHOW_PARENT}
            searchPlaceholder={field.placeholder || field.label}
            disabled={field.disable && readOnly}
          />
        </div>
      );
    case 'customSelect':
      return (
        <CustomSelectBox
          className={field.className}
          options={field.options}
          onChange={(e) => onChangeEventRef(e, field.name)}
          searchKeys={field.searchKeys}
          placeholder={field.placeholder || field.label}
          disabled={field.disable && readOnly}
          showArrow
          dropdownMatchSelectWidth={false}
        />
      );
    case 'airlineSelect' :
      return  (
        <SelectAirlineComponent
          airlines={field.options}
          data-test={field.dataTest || ''}
          placeholder={field.placeholder || field.label}
          onChange={(val) => onChangeEventRef(val, field.name)}
        />
      )
    case 'valueChangerDropDown' :
      return(
        <ValueChangerDropDown
          listItems={field.options.listItems}
          refreshItems={()=>{onTouchChange()}}
          max={field.max}
          min={field.min}
          onChange={(e)=>{onChangeEventRef(e);}}
        />
      );

    default:
      return  (<Input
        className={`${style.FormFactory_input} ${field.className}`}
        data-test={field.dataTest || ''}
        onChange={(e)=> {onChangeInput(e, field);triggerTouchedField(e, field);}}
        placeholder={field.placeholder || field.label}
        disabled={field.disable && readOnly}
      />)
    }
  };

  return (
    <Row gutter={24}>
      {formArray.map(inputField => {
        let inputValue = isEmpty(inputField.defaultValue)? null : inputField.defaultValue;

        if (Object.keys(editValue).length > 0) {
          inputValue = inputField.name.includes('.') ?
            editValue[inputField.name.split('.')[0]][inputField.name.split('.')[1]]
            : editValue[inputField.name];
        }
        if(!inputValue && typeof editValue === 'string'){
          inputValue = editValue;
        }

        return (
          <Col 
            xs={inputField.colSpanXS ? inputField.colSpanXS : inputField.colSpan}
            sm={inputField.colSpanSM ? inputField.colSpanSM : inputField.colSpan}
            md={inputField.colSpanMD ? inputField.colSpanMD : inputField.colSpan}
            lg={inputField.colSpanLG ? inputField.colSpanLG : inputField.colSpan}
            xl={inputField.colSpanXL ? inputField.colSpanXL : inputField.colSpan}
            xxl={inputField.colSpanXXL ? inputField.colSpanXXL : inputField.colSpan}
            span={inputField.colSpan}
            key={inputField.name}
          >
            <Form.Item
              className={`${style.FormFactory_container} ${inputField.formClassName}`}
              data-test="form-item"
              label={inputField.label ?
                <span className={style.FormFactory_label_text}>{inputField.label}</span>:undefined}
            >
              {(
                inputField.rules.length > 0 &&
                (inputField.rules[0].required) &&
                !inputField.noStar
              ) ?
                <span className={`${style.FormFactory_label_starIcon} form-factory_label`}>*</span> :null}
              {
                getFieldDecorator(inputField.name,
                  {
                    rules: inputField.rules,
                    initialValue: inputValue,
                  })
                (inputFactory(inputField))
              }

            </Form.Item>
          </Col>)
      })}
    </Row>)
};

FormFactory.defaultProps={
  editValue:false,
  readOnly: false,
  onChangeEventRef: undefined,
  triggerTouchedField: ()=>{},
  onTouchChange: ()=>{}
};

FormFactory.propTypes= {
  formArray: array.isRequired,
  getFieldDecorator: func.isRequired,
  editValue: any,
  readOnly: any,
  onChangeEventRef:func,
  triggerTouchedField: func,
  onTouchChange: func
};

export default FormFactory;
