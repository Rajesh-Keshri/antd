/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import Prompt from 'umi/prompt';
import { bool, string } from 'prop-types';
import mssgeFactory from './mssgeFactory';

const UnsavedChangesAlert = ({unsavedChanges, page}) =>{

  const  handleLeavePage =(e)=> {
    const confirmationMessage = 'you have unsaved changes';
    e.returnValue = confirmationMessage;   
    return e;              // Gecko, WebKit, Chrome <34
  }

  const handleOnReloadConfirmation = (e) =>{
    const arr = []; // Array to hold the keys
    // Iterate over localStorage and insert the keys that meet the condition into arr
    for (let i = 0; i < localStorage.length; i++){
      if (localStorage.key(i).substring(0,11) === 'translation') {
        arr.push(localStorage.key(i));
      }
    }
    
    // Iterate over arr and remove the items by key
    for (let i = 0; i < arr.length; i++) {
      localStorage.removeItem(arr[i]);
    }
  }

  useEffect(()=>{
    if(unsavedChanges){
      window.addEventListener('beforeunload', handleLeavePage);
      window.addEventListener('unload', handleOnReloadConfirmation)
    }
    return () =>{
      window.removeEventListener('beforeunload', handleLeavePage);
      window.removeEventListener('unload', handleOnReloadConfirmation);
    }
  },[unsavedChanges])
 
 
  
  return(
    <Prompt
      when={unsavedChanges}
      message={location =>{const r = window.confirm(mssgeFactory[page] || 'you have unsaved changes'); 
        if(r){
          handleOnReloadConfirmation()
        }
        return r
      }
      }
    />
  )};


UnsavedChangesAlert.propTypes ={
  unsavedChanges: bool.isRequired,
  page: string.isRequired
}

export default  UnsavedChangesAlert


