import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registrationUser } from 'redux/Auth/authOperations';
import css from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
    password: yup
      .string()
      .min(6, 'Too Short!')
      .max(12, 'Too Long!')
      .required('Required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const { username, email, password } = values;
      const user = {
        username,
        email,
        password,
      };
      dispatch(registrationUser(user));
      console.log(values);
      resetForm();
    },
  });

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <div>
        <input
          // id="username"
          className={css.input}
          placeholder="Name"
          name="username"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null}
      </div>
      <div>
        <input
          // id="email"
          className={css.input}
          placeholder="Email"
          name="email"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      </div>

      <div>
        <input
          // id="password"
          className={css.input}
          placeholder="Password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </div>

      <div>
        <input
          // id="confirmPassword"
          className={css.input}
          placeholder="Confirm password"
          name="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div>{formik.errors.confirmPassword}</div>
        ) : null}
      </div>
      <div>Status</div>
      <div className={css.navig}>
        <button className={css.button} type="submit">
          <span className={css.tittle}>REGISTER</span>
        </button>
        <Link className={css.link} to="/login">
          LOG IN
        </Link>
      </div>
    </form>
  );
};

export default RegistrationForm;
