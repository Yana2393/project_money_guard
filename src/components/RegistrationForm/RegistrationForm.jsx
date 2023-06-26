import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registrationUser } from 'redux/Auth/authOperations';
import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import css from './RegistrationForm.module.css';
import { PasswordIndicator } from 'react-passcode-strength-bar';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('You forgot to enter your name'),
    email: yup
      .string()
      .email('Invalid email')
      .required('You forgot to enter your email'),
    password: yup
      .string()
      .min(6, 'Too Short!')
      .max(12, 'Too Long!')
      .required('You forgot to enter your password'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('You forgot confirm your password'),
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
        <span>
          <AiOutlineMail className={css.icons_email} />
        </span>
        <input
          className={css.input_name}
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
        </div>
        {formik.touched.password && formik.errors.password ? (
          <div className={css.error_message}>{formik.errors.password}</div>
        ) : null}
      </div>

      <div>
        <span>
          <AiOutlineLock className={css.icons_confirmpassword} />
        </span>
        <input
          className={css.input}
          placeholder="Confirm password"
          name="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className={css.error_message}>
            {formik.errors.confirmPassword}
          </div>
        ) : null}
      </div>
      <div className={css.strength_bar}>
        <PasswordIndicator
          password={formik.values.password}
          show={true}
          indicate={value => console.log(value)}
          colorConfig={{ strong: 'green', moderate: 'black', weak: 'yellow' }}
          containerStyle={{
            borderRadius: '10px',
            padding: '3px',
            width: '280px',
            height: '5px',
          }}
        />
      </div>
      <div>
        <span>
          <AiOutlineUser className={css.icons_name} />
        </span>
        <input
          className={css.input_last}
          placeholder="Name"
          name="username"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <div className={css.error_message}>{formik.errors.username}</div>
        ) : null}
      </div>
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
