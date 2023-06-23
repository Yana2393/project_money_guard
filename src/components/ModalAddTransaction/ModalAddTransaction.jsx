import { createPortal } from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import css from './ModalAddTransaction.module.css';

const ModalAddTransaction = () => {
  const modalRoot = document.getElementById('modal-root');
  const status = {
    Income: 'income',
    Expence: 'expence',
  };

  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    sum: yup
      .string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    date: yup.string().email('Invalid date').required('Required'),
  });
  const formik = useFormik({
    initialValues: {
      sum: '',
      date: 'Today',
      comment: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const { sum, date, comment } = values;
      const transaction = {
        sum,
        date,
        comment,
      };
      dispatch(transaction);
      resetForm();
    },
  });

  const handleChange = () => {};

  const jsx = (
    <>
      <h1>Add transaction</h1>
      <div>
        <label>
          Income
          <input
            type="radio"
            checked={status === status.Income}
            name="income"
            value={status.Income}
            onChange={handleChange}
          />
        </label>
        <label>
          Expence
          <input
            type="radio"
            checked={status === status.Expence}
            name="expence"
            value={status.Expence}
            onChange={handleChange}
          />
        </label>
      </div>
      <form>
        <div>
          <input
            className={css.input}
            placeholder="____________"
            name="sum"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.sum}
          />
          {formik.touched.sum && formik.errors.sum ? (
            <div>{formik.errors.sum}</div>
          ) : null}
        </div>

        <div>
          <input
            className={css.input}
            placeholder="__________"
            name="date"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date}
          />
          {formik.touched.date && formik.errors.date ? (
            <div>{formik.errors.date}</div>
          ) : null}
        </div>
        <div>
          <input
            // id="username"
            className={css.input}
            placeholder="____________"
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
    </>
  );

  return createPortal(jsx, modalRoot);
};
export default ModalAddTransaction;
