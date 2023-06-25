import { Formik } from 'formik';
import { selectTransactionCategories } from 'redux/TransactionCategories/TransactionCategoriesSelectors';
import Yup from 'yup';

export const withFormik = Formik=>{
   const transCategory = useSelector(selectTransactionCategories);
  console.log('transCategory', transCategory);


  validationSchema: Yup.object().shape({
    colorcategory: Yup.string().required('Choose category, please!'),
  }),
  handleSubmit= values => {
    const category = values;
    dispatchEvent(getCategore(category));
  },
};

const MyForm = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    // handleReset,
  } = props;
  withFormik(MyForm);
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="category" style={{ display: 'block' }}>
        Select a category
      </label>
      <select
        name="category"
        value={values.category}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{ display: 'block' }}
      >
        <option value="Health" label="Select a color" />
        <option value="Child care" label="Child care" />
        <option value="Self care" label="Self care" />
        <option value="Car" label="Car" />
      </select>
      {errors.category && touched.category && (
        <div className="input-feedback">{errors.category}</div>
      )}
    </form>
  );
};
