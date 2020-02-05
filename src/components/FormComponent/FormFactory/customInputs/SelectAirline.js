import React, { useState, useEffect, forwardRef } from 'react';
import { Col, Dropdown, Icon, Checkbox } from 'antd';
// Components
import { SelectAirlineComponentType } from '@/types/component.proptypes';
import style from './index.less'

const CheckboxGroup = Checkbox.Group;

const SelectAirlineComponent = forwardRef(({airlines, onChange}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const [checkedList, setCheckedList] = useState([]);
  const [selectedValues, setSelectedValues] = useState(['Air Arabia Group']);
  const [airlinePlainValues, setAirlinePlainValues] = useState();

  useEffect(() => {
    const airlinePlainItems = airlines.map(item => ({label: `${item.iataCode} ${item.name}`, value: item.iataCode}));
    setAirlinePlainValues(airlinePlainItems);
    if (airlines.length > 0) {      
      setCheckAll(true);
      setIndeterminate(false)
      setCheckedList(airlinePlainItems.map(item => (item.value)));
      if (checkedList.length > 0) onChange(checkedList);
    }
  }, [airlines]);

  const showHideDropdown = () => {
    setIsClicked(!isClicked);
  }

  const updateAirlineSelectedValues = (values) => {
    const selectedValuesName = [];
    if (!values.length) {
      airlines.forEach(originalItem => {
        checkedList.forEach(selectedItem => {
          if (originalItem.iataCode === selectedItem) {
            if (selectedValuesName.length) {
              selectedValuesName.push(`, ${originalItem.iataCode}`);
            } else {
              selectedValuesName.push(`${originalItem.iataCode}`);
            }
          }
        })
      })
    } else {
      airlines.forEach(originalItem => {
        values.forEach(selectedItem => {
          if (originalItem.iataCode === selectedItem) {
            if (selectedValuesName.length) {
              selectedValuesName.push(`, ${originalItem.iataCode}`);
            } else {
              selectedValuesName.push(`${originalItem.iataCode}`);
            }
          }
        })
      })
    }
    setSelectedValues(selectedValuesName)
  }

  const onAirlineChange = values => {
    setCheckedList(values.length ? values : checkedList);
    setIndeterminate(values.length < airlines.length);
    setCheckAll(values.length === airlines.length);
    onChange(values);

    if (values.length === airlines.length) {
      setSelectedValues('Air Arabia Group')
    } else {
      updateAirlineSelectedValues(values)
    }
  };

  const onCheckAllChange = () => {
    setCheckedList(airlinePlainValues.map(item => (item.value)));
    setIndeterminate(false);
    setCheckAll(true);
    setSelectedValues('Air Arabia Group');
    onChange(checkedList);
  };

  const menu = (
    <Col className={style.selectAirlineComponent_list}>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
        id='check_all_airline_class'
      >
          Air Arabia Group
      </Checkbox>
      <CheckboxGroup
        options={airlinePlainValues}
        value={checkedList}
        onChange={onAirlineChange}
        className={style.selectAirlineComponent_list_inner}
        id='checkbox_group_airline_class'
      />
    </Col>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={['click']}
      placement="bottomLeft"
      className={style.selectAirlineComponent_bg}
      onVisibleChange={showHideDropdown}
      visible={isClicked}
    >
      <a
        className={isClicked ?
          style.selectAirlineComponent_selectedState : 
          style.selectAirlineComponent_selected_values} 
        href="#"
        id='select_airline_button'
      >
        {selectedValues}
        <Icon type={isClicked ? 'up' : 'down'} style={{width: '35px', fontSize: isClicked ? '12px' : '14px'}} />
      </a>
    </Dropdown>
  )
})


SelectAirlineComponent.propTypes = SelectAirlineComponentType;

export default SelectAirlineComponent;