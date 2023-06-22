// import { useDispatch } from 'react-redux';
import css from './LoginForm.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
// const LoginForm = () => {
//   return (
//     <div className={css.loginForm}>LoginForm</div>
//   )
// }

// export default LoginForm
const LoginForm = () => {
  // const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Required'),
    password: yup
      .string()
      .min(6, 'Too Short!')
      .max(12, 'Too Long!')
      .required('Required'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      // dispatch(
      //   registrationUser(values.username, values.email, values.password)
      // );
      console.log(values.email, values.password);
      resetForm();
    },
  });

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <div>
        <input
          className={css.input}
          // id="email"
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
          className={css.input}
          // id="password"
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
      <div className={css.navig}>
        <button className={css.button} type="submit">
          LOG IN
        </button>
        <Link className={css.link} to="/registration">
          REGISTER
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
