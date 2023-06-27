import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { toggleOpenAdd } from 'redux/ModalAddOpen/ModalAddOpenSlice';
import { toggleEditOpen } from 'redux/ModalEditTransaction/ModalEditTransactionSlice';
import css from './ModalBackground.module.css';

const ModalBackground = ({ children, title }) => {
  const dispatch = useDispatch();
  const modalRoot = document.getElementById('modal-root');
  const closeModal = () => {
    if (title === 'add') {
      dispatch(toggleOpenAdd());
      return;
    }
    dispatch(toggleEditOpen());
  };
  useEffect(() => {
    const handleKeydown = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeydown);

    const clearProcesses = () => {
      window.removeEventListener('keydown', handleKeydown);
    };

    return clearProcesses;
  });

  const handleBackdrop = e => {
    const { target, currentTarget } = e;
    if (target === currentTarget) {
      closeModal();
    }
  };
  return createPortal(
    <>
      <div className={css.modalBack} onClick={handleBackdrop}>
        {children}
      </div>
    </>,
    modalRoot
  );
};
export default ModalBackground;
