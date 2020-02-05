import React, { forwardRef, useState, useEffect } from 'react';
import { Select } from 'antd';
import { Icon } from '@material-ui/core';
import style from './index.less';
import { CustomSelectBoxType } from '@/types/component.proptypes';

const { Option } = Select;

const CustomSelectBox = forwardRef(({ options, onChange, value, searchKeys, placeholder, ...restProps }, ref) => {
  const [itemList, setItemList] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setItemList(options);
  }, [options]);

  const renderOptionInput = (val) => 
    (val.toLowerCase().startsWith(searchValue.toLowerCase()) ? 
      (<span><b>{val.slice(0, searchValue.length)}</b>{val.slice(searchValue.length)}</span>) : val)

  const renderSelectOptions = () => (
    itemList.map(item => (
      <Option
        key={item.code}
        data-test={`selectBox-option-${item.code}`} 
        value={item.code}
        label={`${item.code} - ${item.name}`}
        title={`${item.code} ${item.name}, ${item.country}`}
      >
        <span>
          {renderOptionInput(item.code)}&nbsp;
          {renderOptionInput(item.name)}{', '}{renderOptionInput(item.country)}
          {(item.type === 'BUS STATION') && 
          (<Icon data-test='direction_bus' className={style.CustomSelect_icon}>directions_bus</Icon>)}
        </span>
      </Option>)
    )
  );

  const onSearch = (val) => {
    let items = [];
    if (val !== '') {
      const list = [...options];
      searchKeys.forEach(key => {
        for (let i = 0; i < list.length; i++) {
          const item = list[i];
          if (item[key] && item[key].toLowerCase().startsWith(val.toLowerCase())) {
            items.push(item);
            list.splice(i, 1);
            i -=1;
          }
        }
      });
    } else {
      items = options;
    }

    if (value !== '') onChange('');
    setItemList(items);
    setSearchValue(val);
  }

  return (
    <Select 
      {...restProps}
      showSearch
      value={value === null || value === '' ? undefined : value}
      onChange={onChange}
      size='default' 
      optionLabelProp="label"
      placeholder={placeholder}
      onSearch={onSearch}
      data-test={`${placeholder.replace(' ','')}-searchable-select`}
      filterOption={(searchKeys.length === 0)}
      ref={ref}
      className={style.CustomSelect}
    >
      { renderSelectOptions() }
    </Select>
  )
});

CustomSelectBox.propTypes = CustomSelectBoxType;

export default CustomSelectBox;