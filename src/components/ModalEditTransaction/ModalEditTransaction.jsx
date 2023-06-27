import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { SwitchExample } from '../Switch/Switch';
import { updateTransaction } from 'redux/Transaction/transactionOperation';
import css from './ModalEditTransaction.module.css';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { SelectCategory } from 'components/SelectorModal/SelectorModal';
import { toggleEditOpen } from 'redux/ModalEditTransaction/ModalEditTransactionSlice';
import { useParams } from 'react-router-dom';
import { selectTransaction } from 'redux/Transaction/transactionSelectors';
import { useEffect } from 'react';
import { currentTransaction } from 'redux/Transaction/transactionSlice';

// import { useLocation } from 'react-router-dom';

const ModalEditTransaction = typeOfTransaction => {
  const transactionId = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currentTransaction(transactionId));
  }, [dispatch, transactionId]);

  const [type, setType] = useState('EXPENSE');
  const [categoryId, setCategoryId] = useState('');

  const getCategoryId = id => {
    setCategoryId(id);
  };

  // const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    amount: yup
      .string()
      // .min(2, 'Too Short!')
      // .max(50, 'Too Long!')
      .required('Required'),
    transactionDate: yup
      .date()
      // .transactionDate('Invalid date')
      .required('Required'),
  });
  const formik = useFormik({
    initialValues: {
      sum: '0.00',
      transactionDate: new Date(),
      comment: '',
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
  // const statusModal = useSelector(modalEditOpen);

  return (
    <div className={css.modalBody}>
      <span onClick={closeModal}>
        <AiOutlineClose className={css.closeIcon} />
      </span>
      <h1 className={css.editModalTitle}>Edit transaction</h1>
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
              placeholder=""
              name="amount"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.amount}
              // onClick=" setSelectionRange(0,0)"
            />
            {formik.touched.amount && formik.errors.amount ? (
              <div>{formik.errors.amount}</div>
            ) : null}
          </div>

          <div>
            <input
              className={css.dateInput}
              placeholder=""
              name="transactionDate"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.transactionDate}
            />
            {formik.touched.transactionDate && formik.errors.transactionDate ? (
              <div>{formik.errors.transactionDate}</div>
            ) : null}
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
