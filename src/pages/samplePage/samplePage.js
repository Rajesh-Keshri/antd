import React, { Component } from 'react';
import { Col, Row } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { SamplePageType } from '@/types/component.proptypes';

class SamplePage extends Component{

  state ={}
    
  componentDidMount= () =>{}

  render() {
    return (
      <PageHeaderWrapper
        data-test="page-wrapper"
        title="Sample Page"
        breadCrumbTitle="Sample Page"
      >
        <div style={{ margin: '25px' }}>
          <Row>
            <Col span={24} style={{ padding: '50px 0' }}>
              <h2>Sample Page</h2>
            </Col>         
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}

SamplePage.propTypes = SamplePageType;  

export default SamplePage;