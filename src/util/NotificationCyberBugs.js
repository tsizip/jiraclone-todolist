import { Button, notification, Space } from 'antd';

export const notificationFunc = (type, mess,) => {
     notification[type]({
          message: mess,
          // description:desc,
     })
}