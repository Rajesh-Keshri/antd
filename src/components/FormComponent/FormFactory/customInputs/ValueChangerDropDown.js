import React, { useState, useEffect, forwardRef, useRef } from 'react';
import {  Icon, List, Input} from 'antd';
import { func, any, string } from 'prop-types';
import style from './index.less'
import ValueChanger from './ValueChanger';
import { capitalize } from '@/utils/utils'


const ValueChangerDropDown = forwardRef(({listItems, refreshItems, max, min, onChange, ...restProps}) => {

  const [isClicked, setIsClicked] = useState(false);
  const [value, setValue] = useState(' ');
  const [list, setList] = useState([]);
  const node = useRef();

  const isNumeric=(num) =>/^\d+$/.test(num)

  const constructListItems = (items) =>{
    const arr =[];
    let i = 0;
    const adultCount = parseInt(listItems[0][1], 10);
    const childCount = parseInt(listItems[1][1], 10);
    const infantCount = parseInt(listItems[2][1], 10);

    for(i=0;i<items.length;i++){
      const val = parseInt(items[i][1], 10);
      // eslint-disable-next-line no-restricted-globals
      if(!isNumeric(items[i][1])){
        arr.push({'name':items[i][0], 'count':items[i][1], 'error':'Invalid Input'});
      }else if(adultCount===0 && childCount===0 && infantCount===0 && (capitalize(items[i][0])==='Adults')){
        arr.push({'name':items[i][0], 'count':items[i][1], 'error':'At least 1 traveler is required'});
      }else if( val<0 || val>999 ) {
        arr.push({'name':items[i][0], 'count':items[i][1], 'error':'Count should be less than 1000'});
      }else if ((capitalize(items[i][0])==='Infant' && adultCount<infantCount)){
        arr.push({'name':items[i][0], 'count':items[i][1], 'error':'Infant should be lesser than Adult'});
      }else{
        arr.push({'name':items[i][0], 'count':items[i][1], 'error':''});
      }
    }
    return arr;
  }

  const setMessage =(items)=>{
    let message=''
    items.forEach((item)=>{
      if(message.length>0){
        message +=', '
      }
      const num = `${item[1]}`.replace(/^0+/,'')
      message=`${message}${num===''?0:num} ${(item[0].charAt(0).toUpperCase())}`
    })
    return message
  }

  const handleClick=(e)=>{
    if(!node.current.contains(e.target)){
      setIsClicked(false)
      return
    }
    console.log('outside')
  }

  const validateList= (listValues)=>{
    let i=0;
    const adultCount = parseInt(listItems[0][1], 10);
    const childCount = parseInt(listItems[1][1], 10);
    const infantCount = parseInt(listItems[2][1], 10);

    if(adultCount===0 && childCount===0 && infantCount===0){
      return false
    }
    for(i=0;i<listValues.length;i++){
      const val = parseInt(listValues[i][1], 10) 
      // eslint-disable-next-line no-restricted-globals
      if(!isNumeric(listValues[i][1]) || val<0 || val>999 || adultCount<infantCount){
        return false
      }
    }
    return true
  }

  useEffect(()=>{
    document.addEventListener('mousedown', handleClick);
    setValue(setMessage(listItems))
    setList(constructListItems(listItems))
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };

  },[])
  
  useEffect(()=>{
    setValue(setMessage(listItems))
    setList(constructListItems(listItems))
    onChange(listItems)
  },[value])

  useEffect(() => {
    setValue(setMessage(listItems))
    setList(constructListItems(listItems))
    onChange(listItems)
  }, [listItems])

  const reconstructList=()=>{
    const tempArr = value.split(', ')
    const reconstruction=[]
    let i=0;
    for(i=0;i<tempArr.length;i++){
      const count = tempArr[i].split(' ')[0]
      reconstruction.push([listItems[i][0],count])
    }
    return reconstruction
  }

  useEffect(()=>{
    setList(constructListItems(reconstructList()))
    refreshItems(isClicked)
  },[isClicked])

  const handleChange=async ()=>{
    const clicked =isClicked
    setIsClicked(!clicked)
  }

  const changeValue = async (total, type) => {
    const tempMap =listItems
    let i=0;
    for(i=0;i<tempMap.length;i++){
      if(type===capitalize(tempMap[i][0])){
        tempMap[i][1]=total
        break
      }
    }
    if(validateList(tempMap)){
      setValue(setMessage(tempMap))
    }
    setList(constructListItems(tempMap))
  }
  
  return(
    <div style={{position: 'relative'}} ref={node} id='travelers'>
      <div onClick={handleChange} className={style.buttons_parent}>
        <Input 
          className={style.buttons_value} 
          value={value} 
          suffix={<Icon type={isClicked?'up':'down'} />}
        />
      </div>
      { isClicked&&( 
        <List 
          {...restProps}
          className={style.list}          
          size="small"
          bordered
          dataSource={list}
          renderItem={item =>
            <List.Item className={style.listItem_main} id={item.name}>
              <p className={style.listItem_value}>{capitalize(item.name)}</p>
              <ValueChanger 
                changeValue={changeValue}
                currentValue={parseInt(item.count, 10)} 
                type={capitalize(item.name)} 
                max={max}
                min={min}
              />          
              {item.error!=='' && <p data-test="error-message" className={style.listItem_error}>{item.error}</p>}
            </List.Item>}
        />)}
    </div>
  )
  
});

ValueChangerDropDown.defaultProps={
  listItems:[{'name':'Adults','count': 1}],
  max:'adults',
  min:'infant'
}

ValueChangerDropDown.propTypes={
  listItems:any,
  refreshItems:func.isRequired,
  max: string,
  min: string,
  onChange:func.isRequired
}

export default ValueChangerDropDown;