import React from 'react'
import { Empty } from 'antd';
import PageLoading from '../index';
import { LoaderDataHandlerType } from '@/types/component.proptypes';

function LoaderDataHandler({loading}) {
  return (loading ?  <PageLoading /> : <div data-test="empty-component"><Empty /></div> )
}

LoaderDataHandler.defaultProps = {
  loading: true
};

LoaderDataHandler.propTypes = LoaderDataHandlerType;

export default LoaderDataHandler;
