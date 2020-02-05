import React from 'react'
import { formatMessage } from 'umi/locale';
import { Modal } from 'antd'
import style from './index.less'

export const statusModal= (item, handleSubmit)=>{
  const itemToChange = {...item};
  if (itemToChange.isActive) {
    Modal.confirm({
      title: formatMessage({ id: 'alert.deactivate.title' }),
      content: `${item.name} ${formatMessage({
        id: 'alert.deactivate.content',
      })}`,
      okText:<div className={style.StatusModal__okBtn}>{formatMessage({ id: 'btn.deactivate' })}</div>,
      cancelText: formatMessage({ id: 'btn.cancel' }),
      icon: 'exclamation-circle',
      onOk: () => {
        itemToChange.isActive = !item.isActive;

        handleSubmit(itemToChange);
      },
    });
  } else {
    itemToChange.isActive = !item.isActive;

    handleSubmit(itemToChange);
  }
}