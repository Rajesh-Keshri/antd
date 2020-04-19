import React, { Component } from 'react';
import { Col, Row } from 'antd';
import { connect } from 'dva';
import * as actions from '@/actions/sample.actions';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { SamplePageType } from '@/types/component.proptypes';

const mapStateToProps = ({ sampleModel }) => {
  const {listing} = sampleModel;
  return {listing}
};

@connect(mapStateToProps, actions)
class SamplePage extends Component{

  state = {
    responseListing: []
  }

  componentDidMount= () => {
    this.initializeCall();
  }

  initializeCall = async () => {
    const { fetchSampleData } = this.props;

    const response = await fetchSampleData();

    if (response) {
      this.setState({responseListing: this.props.listing})
    }
  };

  render() {
    const { responseListing } = this.state;
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
              {responseListing}
            </Col>         
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}

SamplePage.propTypes = SamplePageType;  

export default SamplePage;