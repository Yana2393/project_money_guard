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
import { AiOutlineClose } from 'react-icons/ai';

const ModalAddTransaction = typeOfTransaction => {
  const [type, setType] = useState('EXPENSE');
  // const [category, setCategory] = useState([]);

  const transCategory = useSelector(selectTransactionCategories);
  const categoryList = transCategory.map(e => e.name);

  // `<label for="size"></label>
  // <select id="size" name="size">
  //   <option value=${e.id}>${e.name}</option>
  // </select>
  //   })

  // const [categoryId, setCategoryId] = useState(
  const categoryId = '3acd0ecd-5295-4d54-8e7c-d3908f4d0402';
  // );
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
      amount: '0.00',
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
    setType(value ? 'INCOME' : 'EXPENSE');
  };
  const closeModal = () => {
    dispatch(toggleOpenAdd());
  };
  const statusModal = useSelector(modalAddOpen);

  return (
    statusModal && (
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
          {type === 'EXPENSE' && <div>{categoryList}</div>}
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
                onclick=" setSelectionRange(0,0)"
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
              {formik.touched.transactionDate &&
              formik.errors.transactionDate ? (
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
              <span className={css.tittle}>ADD</span>
            </button>
            <button className={css.buttonCancel} type="button">
              <span className={css.tittle}>CANCEL</span>
            </button>
          </div>
        </form>
      </div>
    )
  );
};
export default ModalAddTransaction;
