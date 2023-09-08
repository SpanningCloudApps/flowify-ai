/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved
 */
import { notification, Space, Typography } from 'antd';
import { intl } from '../../intl';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { getErrorMessage, isJsonString } from '../../utils/helper';
import './styles.scss';

const { Text, Link } = Typography;

const defaultNotificationProps = {
  className: 'custom-notification'
};

const SUCCESS_NOTIFICATION_DURATION = 5; // seconds
const ERROR_NOTIFICATION_DURATION = 30; // seconds

const CopyNotificationBtn = <Space direction="horizontal" size="small" style={{ margin: 0 }}>
  <Link>{intl.formatMessage({ id: 'NOTIFICATION_COPY_MESSAGE' })}</Link>
  <CopyOutlined />
</Space>;

const CopiedNotificationBtn = <Space direction="horizontal" size="small">
  <Link>{intl.formatMessage({ id: 'NOTIFICATION_COPY_MESSAGE' })}</Link>
  <CheckOutlined />
</Space>;

const getNotificationDescription = (desc: string, isJson: boolean) => {
  return desc ? (<div>
    <Text
      style={{ marginLeft: -4 }}
      copyable={{
        text: desc,
        icon: [CopyNotificationBtn, CopiedNotificationBtn]
      }} />
    <div className="custom-notification-description">
      {isJson ? <pre>
      <code>
        {JSON.stringify(JSON.parse(desc), null, 4)}
      </code>
    </pre> : desc}
    </div>
  </div>) : '';
};

export const showErrorNotification = ({
                                        error,
                                        title = 'ERROR',
                                        subject
                                      }: any): void => {
  if (error.response?.status === 401 || error.message === 'canceled') return;

  let errorMsg = getErrorMessage(error);
  let errorTitle = intl.formatMessage({ id: title });

  if (error.response) {
    errorMsg = getErrorMessage(error.response.data);
    errorTitle = [intl.formatMessage({ id: title }), error.response.status, error.response.statusText].filter(x => !!x).join(' - ');
  }

  const subjectErrorMsg = subject ? `${subject} - ${errorMsg}` : errorMsg;

  notification.error({
    ...defaultNotificationProps,
    duration: ERROR_NOTIFICATION_DURATION,
    message: errorTitle,
    description: getNotificationDescription(subjectErrorMsg, isJsonString(subjectErrorMsg))
  });
};

export const showSuccessNotification = (successMsg: string, successTitle = 'SUCCESS'): void => {
  notification.success({
    ...defaultNotificationProps,
    duration: SUCCESS_NOTIFICATION_DURATION,
    message: intl.formatMessage({ id: successTitle }),
    description: getNotificationDescription(successMsg, isJsonString(successMsg))
  });
};
