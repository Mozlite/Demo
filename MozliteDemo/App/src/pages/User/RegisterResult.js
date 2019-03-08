import React from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Button } from 'antd';
import Link from 'umi/link';
import Result from '@/components/Result';
import styles from './RegisterResult.less';

const actions = (email) => (
  <div className={styles.actions}>
    <EmailLink email={email} />
    <Link to="/">
      <Button size="large">
        <FormattedMessage id="app.register-result.back-home" />
      </Button>
    </Link>
  </div>
);

function EmailLink({ email }) {
  if (!email) return null;
  const index = email.indexOf('@');
  if (index == -1) return null;
  email = email.substr(index + 1);
  email = `http://${email}`;
  return (<a href={email} target="_blank">
    <Button size="large" type="primary">
      <FormattedMessage id="app.register-result.view-mailbox" />
    </Button>
  </a>);
}

const RegisterResult = ({ location }) => (
  <Result
    className={styles.registerResult}
    type="success"
    title={
      <div className={styles.title}>
        <FormattedMessage
          id="app.register-result.msg"
          values={{ username: location.state.account }}
        />
      </div>
    }
    description={formatMessage({ id: 'app.register-result.activation-email' })}
    actions={actions(location.state.email)}
    style={{ marginTop: 56 }}
  />
);

export default RegisterResult;
