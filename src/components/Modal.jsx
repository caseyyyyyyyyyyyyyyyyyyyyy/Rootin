import styles from './Modal.module.css';

export default function Modal({ message, isVisible }) {
  if (!isVisible) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {message}
      </div>
    </div>
  );
} 