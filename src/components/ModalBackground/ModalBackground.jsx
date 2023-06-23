import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './ModalBackground.module.css';

const ModalBackground = ({ children }, onCloseModal) => {
  const modalRoot = document.getElementById('modal-root');
  useEffect(() => {
    const handleKeydown = e => {
      if (e.key === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeydown);

    const clearProcesses = () => {
      window.removeEventListener('keydown', handleKeydown);
    };

    return clearProcesses;
  }, [onCloseModal]);

  const handleBackdrop = e => {
    const { target, currentTarget } = e;
    if (target === currentTarget) {
      onCloseModal();
    }
  };
  return createPortal(
    <>
      <div className={css.modalBackdrop} />
      <div className={css.modalContent} onClick={handleBackdrop}>
        <button type="button" onClick={onCloseModal} aria-label="close" />

        <div className={css.modalBody}>{children}</div>
      </div>
    </>,
    modalRoot
  );
};
export default ModalBackground;
