import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
import css from './ButtonAddTransactions.module.css';

const ButtonAddTransactions = () => {
  return (
    <div className={css.button}>
      <AddIcon sx={{ fontSize: 40, color: 'white' }} color="success" />
    </div>
  );
};

export default ButtonAddTransactions;
