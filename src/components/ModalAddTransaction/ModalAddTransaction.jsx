import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { SwitchExample } from '../Switch/Switch';
import { addTransaction } from 'redux/Transaction/transactionOperation';
import { useState } from 'react';
import { modalAddOpen } from 'redux/ModalAddOpen/ModalAddOpenSelector';
import { toggleOpenAdd } from 'redux/ModalAddOpen/ModalAddOpenSlice';
import { selectTransactionCategories } from 'redux/TransactionCategories/TransactionCategoriesSelectors';
import css from './ModalAddTransaction.module.css';

const ModalAddTransaction = typeOfTransaction => {
  const [type, setType] = useState(false);

  // const transCategory = useSelector(selectTransactionCategories);
  // const [type, setType] = useState('INCOME');
  // const [categoryId, setCategoryId] = useState(
  const categoryId = '3acd0ecd-5295-4d54-8e7c-d3908f4d0402';
  // );

  // setType(typeOfTransaction ? 'INCOME' : 'EXPENSE');

  const dispatch = useDispatch();
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
      transactionDate: 'Date()',
      comment: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const { amount, transactionDate, comment } = values;
      const transaction = {
        amount,
        transactionDate,
        comment,
        categoryId,
        type,
      };
      dispatch(addTransaction(transaction));
      resetForm();
    },
  });

  const getStatusType = value => {
    setType(value);
    console.log('type', value);
  };

  const closeModal = () => {
    dispatch(toggleOpenAdd());
  };
  const statusModal = useSelector(modalAddOpen);

  return (
    statusModal && (
      <div className={css.modalBody}>
        <button className={css.closeBtn} type="button" onClick={closeModal}>
          X
        </button>
        <h1 className={css.addModalTitle}>Add transaction</h1>
        <SwitchExample
          getStatusType={getStatusType}
          typeOfTransaction={typeOfTransaction}
        />

        <form className={css.form} onSubmit={formik.handleSubmit}>
          {!type && <div>{/* <withFormik /> */}</div>}
          <div>
            <input
              className={css.input}
              placeholder=""
              name="amount"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.amount}
            />
            {formik.touched.amount && formik.errors.amount ? (
              <div>{formik.errors.amoount}</div>
            ) : null}
          </div>

          <div>
            <input
              className={css.input}
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
          <div>
            <input
              className={css.input}
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
            <button className={css.button} type="submit">
              <span className={css.tittle}>CANCEL</span>
            </button>
          </div>
        </form>
      </div>
    )
  );
};
export default ModalAddTransaction;
