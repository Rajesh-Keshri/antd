import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './GridContent.less';
import { gridContentType } from '@/types/component.proptypes';

const mapStateToProps = ({ setting }) => ({contentWidth: setting.contentWidth})

@connect(mapStateToProps)
class GridContent extends PureComponent {
  render() {
    const { contentWidth, children } = this.props;
    let className = `${styles.GridContent}`;
    if (contentWidth === 'Fixed') {
      className = `${styles.GridContent} ${styles.GridContent__wide}`;
    }
    return <div data-test="grid-content" className={className}>{children}</div>;
  }
}

GridContent.propTypes = gridContentType;

export default GridContent;
