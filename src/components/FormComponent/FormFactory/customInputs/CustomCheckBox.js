import React, {forwardRef} from 'react'
import {  Checkbox, Tooltip } from 'antd';
import { Icon } from '@material-ui/core';
import { CustomCheckboxType  } from '@/types/component.proptypes';
import style from '../index.less';



const CustomCheckbox = forwardRef(({details:{ defaultChecked, labelCheckbox,info}, value, ...restProps}) => 
  (
    <Checkbox 
      {...restProps}
      checked={value}
      data-test="CheckBox"
    > 
      <span
        id="checkbox-label"
        data-test="checkBox-label"
        defaultValue={defaultChecked}
        className={style.FormFactory_checkBox_check}
      >
        {labelCheckbox}
      </span>

      {info ?
        <Tooltip 
          id="toolTip"
          data-test="Tooltip"
          placement="topLeft" 
          title={info.text}
        >
          <span id="checkbox-icon" data-test="checkBox-icon" className={style.FormFactory_checkBox_alert}>
            <Icon className={style.FormFactory_checkBox_alert__custom}>{info.icon}</Icon>
          </span>
        </Tooltip>
        :null}

    </Checkbox>
  )
)

CustomCheckbox.propTypes = CustomCheckboxType;

export default CustomCheckbox;