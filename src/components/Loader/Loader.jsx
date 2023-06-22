import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.spinner_container}>
      <div className={css.loading_spinner}></div>
    </div>
  );
};
