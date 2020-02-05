import React, { PureComponent } from 'react';
import Link from 'umi/link';
import Debounce from 'lodash-decorators/debounce';
import Icon from '@material-ui/core/Icon';
import { any } from 'prop-types';
import styles from './index.less';



class GlobalHeader extends PureComponent {
  componentDidMount() {
    const { onCollapse } = this.props;
    onCollapse(false);
  }

  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };

  
  render() {
    const { collapsed, isMobile, logo } = this.props;
    return (
      <div className={styles.GlobalHeader}>
        {isMobile && (
          <Link to="/" className={styles.GlobalHeader_logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>
        )}
        <span className={styles.GlobalHeader_trigger} onClick={this.toggle}>
          <Icon className={styles.GlobalHeader_trigger_menuLogo} >
                menu
          </Icon>
          <span className={styles.GlobalHeader_trigger_menuText}>
             Menu
          </span>
         
        </span>
        
      </div>
    );
  }
};

GlobalHeader.propTypes = {
  onCollapse: any
};

export default GlobalHeader;
