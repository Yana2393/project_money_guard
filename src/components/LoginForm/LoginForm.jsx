import css from './LoginForm.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { loginUser } from 'redux/Auth/authOperations';
import { useDispatch } from 'react-redux';
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai';

const LoginForm = () => {
  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email')
      .required('You forgot to enter your email address'),
    password: yup
      .string()
      .min(6, 'Too Short!')
      .max(12, 'Too Long!')
      .required('You forgot to enter your password'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(loginUser(values));
      console.log(values.email, values.password);
      resetForm();
    },
  });

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <div>
        <span>
          <AiOutlineMail className={css.icons_email} />
        </span>
        <input
          className={css.input_email}
          placeholder="E-mail"
          name="email"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className={css.error_message}>{formik.errors.email}</div>
        ) : null}
      </div>

      <div>
        <span>
          <AiOutlineLock className={css.icons_password} />
        </span>
        <input
          className={css.input}
          placeholder="Password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className={css.error_message}>{formik.errors.password}</div>
        ) : null}
      </div>
      <div className={css.navig}>
        <button className={css.button} type="submit">
          <span className={css.tittle}>LOG IN</span>
        </button>
        <Link className={css.link} to="/registration">
          REGISTER
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
