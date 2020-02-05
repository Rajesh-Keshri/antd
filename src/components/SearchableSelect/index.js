import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { any, func, string, arrayOf } from 'prop-types';

const { Option } = Select;

function SearchableSelect({ selectList, selectOnChange, selectedValue, searchKeys, placeholder }) {
  const [itemList, setItemList] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setItemList(selectList);
  }, [selectList]);

  const renderOptionInput = (value) => 
    (value.toLowerCase().startsWith(searchValue.toLowerCase()) ? 
      (<span><b>{value.slice(0, searchValue.length)}</b>{value.slice(searchValue.length)}</span>) : value)

  const renderSelectOptions = () => (
    itemList.map(item => (
      <Option
        key={item.code}
        data-test={`selectBox-option-${item.code}`} 
        value={item.code}
        label={item.code}
      >
        <span>
          {renderOptionInput(item.code)}{' - '}{renderOptionInput(item.name)}{', '}{renderOptionInput(item.country)}
        </span>
      </Option>)
    )
  );

  const onSearch = (value) => {
    let items = [];
    if (value !== '') {
      const list = [...selectList];
      searchKeys.forEach(key => {
        for (let i = 0; i < list.length; i++) {
          const item = list[i];
          if (item[key] && item[key].toLowerCase().startsWith(value.toLowerCase())) {
            items.push(item);
            list.splice(i, 1);
            i -=1;
          }
        }
      });
    } else {
      items = selectList;
    }
    selectOnChange('');
    setItemList(items);
    setSearchValue(value);
  }

  const onSelectChange = (value) => {
    if (value !== '') {
      setItemList(prev => prev.filter(p => p.code === value));
    } else {
      setItemList(selectList);
    }
    
    selectOnChange(value);
  }

  return (
    <Select 
      showSearch
      value={selectedValue === '' ? undefined : selectedValue}
      onChange={onSelectChange}
      size='default' 
      style={{ width:'90%' }}
      optionLabelProp="label"
      placeholder={placeholder}
      showArrow
      onSearch={onSearch}
      dropdownMatchSelectWidth={false}
      data-test='searchable-select'
      filterOption={false}
    >
      { renderSelectOptions() }
    </Select>
  )
}

SearchableSelect.propTypes = {
  selectList: arrayOf(any).isRequired, 
  selectOnChange: func.isRequired, 
  selectedValue: string.isRequired,
  searchKeys: arrayOf(string).isRequired,
  placeholder: string.isRequired
}

export default SearchableSelect;