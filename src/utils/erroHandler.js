import { notification, message } from 'antd';
import { formatMessage } from 'umi/locale';

export const errorHanlderNotif = (error) => {
  const errorMessage = {
    message: error.code,
    description: error.message,
  };
  notification.error(errorMessage);
};

export const responseNotification = (action, response, showError) => {
  const msg = formatMessage({ id: `success.${action}` });

  if (response.success) {
    message.success(msg);
  } else if (!response.success && showError) {
    errorHanlderNotif(response.error);
  }
};
