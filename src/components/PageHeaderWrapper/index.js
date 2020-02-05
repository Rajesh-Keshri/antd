import React, { Component } from 'react';
import { FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import { connect } from 'dva';
import Icon from '@material-ui/core/Icon';
// Ant Design Components
import { PageHeader, Row } from 'antd';
import styles from './index.less';
// Components
import GridContent from './GridContent/GridContent';
import HeaderAddButton from '@/components/HeaderAddButton';

// Context
import MenuContext from '@/layouts/MenuContext';
// Prop-Type
import { pageHeaderWrapperType } from '@/types/component.proptypes';
import PageLoading from '../PageLoading';

const mapStateToProps = ({ setting }) => ({ contentWidth: setting.contentWidth })
@connect(mapStateToProps)
class PageHeaderWrapper extends Component {

  state = {
    showStepsBg: true,
    showSteps: true
  }

  renderExtraComponent=()=>{
    const { extraCustom, breadCrumbBtnTitle, breadCrumbBtnAction  } = this.props;

    if(extraCustom) return extraCustom

    return <HeaderAddButton
      title={breadCrumbBtnTitle}
      onClick={breadCrumbBtnAction}
    />
  }

  showHideSteps = () => {
    this.setState(prevState => ({showStepsBg: !prevState.showStepsBg}))
    setTimeout(() => {
      this.setState(prevState => ({showSteps: !prevState.showSteps}))
    }, 100)
  }

  render() {
    const {
      children,
      contentWidth,
      wrapperClassName,
      top,
      status,
      breadCrumbBtn,
      breadCrumbTitle,
      content,
      loading,
      showProcessSteps,
      processCurrentStep,
      ...restProps} = this.props;
    return (
      <div
        data-test="wrapper-component"
        style={{ margin: '-24px -24px 0' }}
        className={`headerwrapper_container ${wrapperClassName}`}
      >
        {top}
        <MenuContext.Consumer>
          {value => (
            <Row>
              {showProcessSteps &&
                <Row className={styles.process_steps_bg} style={{height: this.state.showStepsBg ? '75px' : '0'}}>
                  <span
                    className={styles.process_steps_show_hide_btn} 
                    onClick={this.showHideSteps}
                  >
                    <Icon>{this.state.showSteps ? 'expand_less' : 'expand_more'}</Icon>
                  </span>
                </Row>
              }

              <PageHeader
                data-test="header-component"
                wide={contentWidth === 'Fixed'}
                home={<FormattedMessage id="menu.home" defaultMessage="aeroBoilerplate " />}
                {...value}
                key="pageheader"
                {...restProps}
                linkElement={Link}
                title={<div data-test="breadcrumb-title" id="breadCrumb-title">{breadCrumbTitle}</div>}
                extra={breadCrumbBtn ?
                  this.renderExtraComponent(): null}
              >
                {content ? (
                  <div className="content">{content}</div>
                ) : null}
              </PageHeader>
            </Row>
          )}
        </MenuContext.Consumer>
        {children ? (
          <div className={styles.content}>
            { loading  ?
              <PageLoading loading />:
              <GridContent>{children}</GridContent>
            }
          </div>
        ) : null}
      </div>
    );
  }
}

PageHeaderWrapper.defaultProps= {
  breadCrumbBtn: false,
  status: false,
  loading: false,
  showProcessSteps: false
}

PageHeaderWrapper.propTypes =  pageHeaderWrapperType;

export default PageHeaderWrapper;
