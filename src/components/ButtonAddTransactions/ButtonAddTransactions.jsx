import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
import css from './ButtonAddTransactions.module.css';
import { useDispatch } from 'react-redux';
import { toggleOpenAdd } from 'redux/ModalAddOpen/ModalAddOpenSlice';

const ButtonAddTransactions = () => {
  const dispatch = useDispatch();
  const OpenModalAdd = () => {
    dispatch(toggleOpenAdd());
  };
  return (
    <div className={css.button} onClick={OpenModalAdd}>
      <AddIcon sx={{ fontSize: 40, color: 'white' }} color="success" />
    </div>
  );
};

export default ButtonAddTransactions;
