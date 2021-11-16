import React from 'react';
import { notification} from "antd";
import { NotificationInstance } from 'antd/lib/notification';

const OpenNotificationWithIcon = (type: NotificationInstance, label: string, message: string) => {
  // @ts-ignore
  notification[type]({
    message: `${label} ${message}.`
  });
};


export default OpenNotificationWithIcon;