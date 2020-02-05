import React from 'react'
import { Button } from 'antd';
import { headerAddButtonType } from '@/types/component.proptypes';

const HeaderAddButton = ({title, onClick, className}) => {
  const titleClass= title.replace(/\s/g,'');
  return (
    <div className="header_add_button_wrapper">
      <Button
        className={className}
        data-test={`btn-${titleClass}`}
        id='header_add_button' 
        type="primary" 
        style={{background: '#1976D2', minWidth: '120px' }}
        onClick={onClick}
      >
        {title}
      </Button>
    </div>
  )
}
  


HeaderAddButton.propTypes = headerAddButtonType;

export default HeaderAddButton;