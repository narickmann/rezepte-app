import styles from './Toast.module.css';
import React from 'react';

const Toast = ({ message, type, onClose }) => {

  const toastClass = type === 'success' ? styles.toast_success : styles.toast_error;

  return (
      <div className={[styles.toast, toastClass].join(' ')} onClick={onClose}>
        <p>{message}</p>
    </div>
  );
};

export default Toast;