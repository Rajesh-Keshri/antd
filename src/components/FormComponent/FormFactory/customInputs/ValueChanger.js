import React,{ useState, useEffect, forwardRef}  from 'react';
import { Input, Icon } from 'antd';
import style from './index.less'
import { ValueChangerType } from '@/types/component.proptypes';


const ValueChanger = forwardRef(({currentValue, type, changeValue }) => {
  const [value, setValue] = useState(currentValue);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    changeValue(value, type) 
    setIsDisabled(value===0 || value==='0')
  }, [value])
  
  const increment= async()=>{
    await setValue(parseInt(value, 10)+1)
    setIsDisabled(false)
  }
  
  const decrement= ()=>{
    if(!isDisabled){

      setValue(parseInt(value, 10)-1)
    }
  }

  const changeCount= (input)=>{
    setValue(input);
  }

  return(
    <div className={style.valueChanger_main}>
      <Icon 
        id={`${type}-decrement`} 
        type="minus-circle" 
        className={isDisabled?style.valueChanger_button_disabled:style.valueChanger_button}
        onClick={decrement} 
      />
      <Input 
        className={style.valueChanger_input}
        id={`${type}-count`} 
        value={value} 
        onChange={(e)=>{changeCount(e.target.value)}}
      />
      <Icon 
        id={`${type}-increment`}
        type="plus-circle" 
        className={style.valueChanger_button}
        onClick={increment} 
      />
    </div>
  )
    
})

ValueChanger.propTypes= ValueChangerType;

export default ValueChanger;