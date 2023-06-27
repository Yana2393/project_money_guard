import { useFormik } from 'formik';
import * as yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import uk from 'date-fns/locale/uk';
import { SwitchExample } from '../Switch/Switch';
import { updateTransaction } from 'redux/Transaction/transactionOperation';
import css from './ModalEditTransaction.module.css';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { SelectCategory } from 'components/SelectorModal/SelectorModal';
import { toggleEditOpen } from 'redux/ModalEditTransaction/ModalEditTransactionSlice';
import { selectEditTransaction } from 'redux/Transaction/transactionSelectors';
// import { useLocation } from 'react-router-dom';

const ModalEditTransaction = typeOfTransaction => {
  const currentTransaction = useSelector(selectEditTransaction);

  // const [newTransaction, setNewTransaction] = useState();

  const [type, setType] = useState('EXPENSE');
  const [categoryId, setCategoryId] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  registerLocale('uk', uk);
  setDefaultLocale('uk');
  const getCategoryId = id => {
    setCategoryId(id);
  };
  // console.log('CURRENT__Transaction', currentTransaction);

  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    amount: yup
      .number()
      .positive('The number must be positive')
      .required('Required'),
  });
  const formik = useFormik({
    initialValues: {
      // amount:
      //   currentTransaction?.type === 'EXPENSE'
      //     ? -currentTransaction?.amount
      //     : currentTransaction?.amount,
      // comment: currentTransaction?.comment,
    },
    validationSchema: validationSchema,

    onSubmit: (values, { resetForm }) => {
      const { amount, transactionDate, comment } = values;

      const transaction = {
        amount: type === 'EXPENSE' ? -amount : amount,
        transactionDate,
        comment,
        categoryId,
        type,
      };
      dispatch(updateTransaction(transaction));

      resetForm();
      closeModal();
    },
  });

  const getStatusType = value => {
    setType(value ? 'INCOME' : 'EXPENSE');
  };

  const closeModal = () => {
    dispatch(toggleEditOpen());
  };

  return (
    <div className={css.modalBody}>
      <span onClick={closeModal}>
        <AiOutlineClose className={css.closeIcon} />
      </span>
      <h1 className={css.editModalTitle}>Edit transaction</h1>
      <div className={css.switchWrapper}>
        <SwitchExample
          checked={currentTransaction.type === 'INCOME' ? false : true}
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
            <span className={css.tittle}>SAVE</span>
          </button>
          <button
            className={css.buttonCancel}
            type="submit"
            onClick={closeModal}
          >
            <span className={css.tittle}>CANCEL</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalEditTransaction;
