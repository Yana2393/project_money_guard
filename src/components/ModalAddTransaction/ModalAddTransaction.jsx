import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import uk from 'date-fns/locale/uk';
import { SwitchExample } from '../Switch/Switch';
import { addTransaction } from 'redux/Transaction/transactionOperation';
import { useState } from 'react';
import { toggleOpenAdd } from 'redux/ModalAddOpen/ModalAddOpenSlice';
import css from './ModalAddTransaction.module.css';
import { AiOutlineClose } from 'react-icons/ai';
import { SelectCategory } from 'components/SelectorModal/SelectorModal';

const ModalAddTransaction = ({ typeOfTransaction }) => {
  const [type, setType] = useState('EXPENSE');
  const [categoryId, setCategoryId] = useState('');
  const [startDate, setStartDate] = useState(new Date() - 1);
  registerLocale('uk', uk);
  setDefaultLocale('uk');
  const getCategoryId = id => {
    setCategoryId(id);
  };
  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    amount: yup
      .number()
      .positive('The number must be positive')
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      amount: '',
      comment: '',
    },
    validationSchema: validationSchema,

    onSubmit: (values, { resetForm }) => {
      const { amount, comment } = values;

      const transaction = {
        amount: type === 'EXPENSE' ? Number(-amount) : Number(amount),
        transactionDate: startDate,
        comment,
        categoryId:
          type === 'EXPENSE'
            ? categoryId
            : '063f1132-ba5d-42b4-951d-44011ca46262',
        type,
      };
      dispatch(addTransaction(transaction));

      resetForm();
      closeModal();
    },
  });

  const getStatusType = value => {
    setType(value ? 'INCOME' : 'EXPENSE');
  };

  const closeModal = () => {
    dispatch(toggleOpenAdd());
  };

  return (
    <div className={css.modalBody}>
      <span onClick={closeModal}>
        <AiOutlineClose className={css.closeIcon} />
      </span>
      <h1 className={css.addModalTitle}>Add transaction</h1>
      <div className={css.switchWrapper}>
        <SwitchExample
          getStatusType={getStatusType}
          typeOfTransaction={typeOfTransaction}
        />
      </div>
      <form className={css.formModal} onSubmit={formik.handleSubmit}>
        {type === 'EXPENSE' && (
          <div className={css.selectCategory}>
            <SelectCategory getCategoryId={getCategoryId} />
          </div>
        )}
        <div className={css.inputLine}>
          <div>
            <input
              className={css.amountInput}
              placeholder="0"
              name="amount"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.amount}
              onclick=" setSelectionRange(0,0)"
            />
            {formik.touched.amount && formik.errors.amount ? (
              <div className={css.error_message}>{formik.errors.amount}</div>
            ) : null}
          </div>
          <div>
            <DatePicker
              className={css.dateInput}
              selected={startDate}
              onChange={date => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>
        <div>
          <input
            className={css.commentInput}
            placeholder="Comment"
            name="comment"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.comment}
          />
          {formik.touched.comment && formik.errors.comment ? (
            <div>{formik.errors.comment}</div>
          ) : null}
        </div>
        <div className={css.navig}>
          <button className={css.button} type="submit">
            <span className={css.tittle}>ADD</span>
          </button>
          <button
            className={css.buttonCancel}
            type="button"
            onClick={closeModal}
          >
            <span className={css.tittle}>CANCEL</span>
          </button>
        </div>
      </form>
    </div>
  );
};
export default ModalAddTransaction;
