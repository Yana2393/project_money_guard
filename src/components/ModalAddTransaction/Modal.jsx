import { useEffect } from 'react';
import css from './ ModalAddTransaction.module.css';

const Modal = ({ children }, onCloseModal) => {
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
  return (
    <>
      <div className={css.modalBackdrop} />
      <div className={css.modalContent} onClick={handleBackdrop}>
        <button type="button" onClick={onCloseModal} aria-label="close" />

        <div className={css.modaBody}>{children}</div>
      </div>
    </>
  );
};
export default Modal;
