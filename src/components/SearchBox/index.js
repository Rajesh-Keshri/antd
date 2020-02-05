import React from 'react';
import { Button, Input } from 'antd';
import { SearchBoxType } from '@/types/common.proptypes';

const {Search} = Input;

const SearchBox = props => {
    
  const { buttonText, placeHolderText, handleSearch } = props; 

  const handleChange = (e) => {
    const { value } = e.target
    if (value === '') {
      handleSearch(value);
    }
  }

  return (
    <div style={{ marginBottom:'25px', width:'25%' }}>
      <Search
        placeholder={placeHolderText}
        onSearch={value => {console.log(value); handleChange(value);}}        
        enterButton={
          <Button
            data-test="Search-btn"
            style={{ minWidth: '53px', height: '32px' }} 
            type="primary"
            icon="search"
          >
            {buttonText}
          </Button>}
      /> 
    </div>
  );
}

SearchBox.propTypes = SearchBoxType;

export default SearchBox;