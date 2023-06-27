import { useFormik } from 'formik';
import * as yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import uk from 'date-fns/locale/uk';

import { updateTransaction } from 'redux/Transaction/transactionOperation';
import css from './ModalEditTransaction.module.css';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { SelectCategory } from 'components/SelectorModal/SelectorModal';
import { toggleEditOpen } from 'redux/ModalEditTransaction/ModalEditTransactionSlice';
import { selectEditTransaction } from 'redux/Transaction/transactionSelectors';
import { clearCurrentTransaction } from 'redux/Transaction/transactionSlice';
import AntiSwitch from 'components/AntiSwitch/AntiSwitch';
import { updateBalance } from 'redux/Auth/authSlice';

const ModalEditTransaction = typeOfTransaction => {
  const currentTransaction = useSelector(selectEditTransaction);
  const [typeEdit, setTypeEdit] = useState(currentTransaction.type);

  const dataFormat = value => {
    const my_data = value.slice(0, 10);
    const [year, month, day] = my_data.split('-');
    const convertedDate = new Date(year, month - 1, day);
    return convertedDate;
  };

  const [categoryId, setCategoryId] = useState('');
  const [startDate, setStartDate] = useState(
    dataFormat(currentTransaction.transactionDate)
  );

  registerLocale('uk', uk);
  setDefaultLocale('uk');

  const getCategoryId = id => {
    setCategoryId(id);
  };

  useEffect(() => {
    if (currentTransaction) {
      getCategoryId(currentTransaction.categoryId);
    }
  }, [currentTransaction]);

  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    amount: yup
      .number()
      .positive('The number must be positive')
      .required('Required'),
  });
  const formik = useFormik({
    initialValues: {
      amount:
        currentTransaction?.type === 'EXPENSE'
          ? -currentTransaction?.amount
          : currentTransaction?.amount,
      comment: currentTransaction?.comment,
    },
    validationSchema: validationSchema,

    onSubmit: (values, { resetForm }) => {
      const { amount, comment } = values;

      const transaction = {
        amount: typeEdit === 'EXPENSE' ? Number(-amount) : Number(amount),
        transactionDate: startDate,
        comment,
        categoryId:
          typeEdit === 'INCOME'
            ? '063f1132-ba5d-42b4-951d-44011ca46262'
            : categoryId,
        type: typeEdit,
      };
      dispatch(
        updateTransaction({
          transactionId: currentTransaction.id,
          body: transaction,
        })
      );
      dispatch(
        updateBalance(
          Number(typeEdit === 'EXPENSE' ? Number(-amount) : Number(amount))
        )
      );

      dispatch(clearCurrentTransaction());
      resetForm();

      closeModal();
    },
  });

  const getStatusType = value => {
    setTypeEdit(value ? 'INCOME' : 'EXPENSE');
  };

  const closeModal = () => {
    dispatch(toggleEditOpen());
    dispatch(clearCurrentTransaction());
  };

  const onTypeSelected = value => {
    setTypeEdit(value);
  };

  return (
    currentTransaction && (
      <div className={css.modalBody}>
        <span onClick={closeModal}>
          <AiOutlineClose className={css.closeIcon} />
        </span>
        <h1 className={css.editModalTitle}>Edit transaction</h1>
        <div className={css.switchWrapper}>
          <AntiSwitch
            getStatusType={getStatusType}
            typeOfTransaction={typeOfTransaction}
            checked={currentTransaction?.type === 'INCOME' ? false : true}
            onTypeSelected={onTypeSelected}
            type={currentTransaction.type}
          />

          {/* <SwitchExample
            checked={currentTransaction?.type === 'INCOME' ? false : true}
            getStatusType={getStatusType}
            typeOfTransaction={typeOfTransaction}
          /> */}
        </div>
        <form className={css.formModal} onSubmit={formik.handleSubmit}>
          {typeEdit === 'EXPENSE' && (
            <div className={css.selectCategory}>
              <SelectCategory
                getCategoryId={getCategoryId}
                currentCategoryId={currentTransaction.categoryId}
              />
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
    )
  );
};

export default ModalEditTransaction;
