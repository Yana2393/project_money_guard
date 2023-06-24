import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTransaction,
  updateTransaction,
} from 'redux/Transaction/transactionOperation';
import { selectTransaction } from 'redux/Transaction/transactionSelectors';
import { selectTransactionCategories } from 'redux/TransactionCategories/TransactionCategoriesSelectors';
import css from './HomeTab.module.css';
import { useMediaQuery } from 'react-responsive';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const HomeTab = () => {
  const transactionData = useSelector(selectTransaction);
  const categories = useSelector(selectTransactionCategories);
  const dispatch = useDispatch();

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const handleDeleteClick = id => {
    dispatch(deleteTransaction(id));
  };
  const handleEditClick = (id, body) => {
    dispatch(updateTransaction(id, body));
  };

  return (
    <div className={css.HomeTabPage}>
      {isMobile ? (
        <ul className={css.HomeTabMobileList}>
          {transactionData.map(transaction => {
            return (
              <>
                <li key={transaction.id} className={css.HomeTabMobileItem}>
                  <span className={css.HomeTabMobileSideLine}></span>
                  <ul className={css.HomeTabMobileTableList}>
                    <li className={css.HomeTabMobileTableItem}>
                      <p className={css.HomeTabMobileTableHeader}>Date</p>
                      <p className={css.HomeTabMobileTableValue}>
                        {transaction.transactionDate}
                      </p>
                      <span className={css.HomeTabMobileTableBottomLine}></span>
                    </li>
                    <li className={css.HomeTabMobileTableItem}>
                      <p className={css.HomeTabMobileTableHeader}>Type</p>
                      <p className={css.HomeTabMobileTableValue}>
                        {transaction.type === 'INCOME' ? '+' : '-'}
                      </p>
                      <span className={css.HomeTabMobileTableBottomLine}></span>
                    </li>
                    <li className={css.HomeTabMobileTableItem}>
                      <p className={css.HomeTabMobileTableHeader}>Category</p>
                      <p className={css.HomeTabMobileTableValue}>
                        {categories.map(category =>
                          category.id === transaction.categoryId ? (
                            category.name
                          ) : (
                            <></>
                          )
                        )}
                      </p>
                      <span className={css.HomeTabMobileTableBottomLine}></span>
                    </li>
                    <li className={css.HomeTabMobileTableItem}>
                      <p className={css.HomeTabMobileTableHeader}>Comment</p>
                      <p className={css.HomeTabMobileTableValue}>
                        {transaction.comment}
                      </p>
                      <span className={css.HomeTabMobileTableBottomLine}></span>
                    </li>
                    <li className={css.HomeTabMobileTableItem}>
                      <p className={css.HomeTabMobileTableHeader}>Sum</p>
                      <p
                        className={
                          transaction.type === 'INCOME'
                            ? `${css.HomeTabMobileTableValue} ${css.income}`
                            : `${css.HomeTabMobileTableValue} ${css.outcome}`
                        }
                      >
                        {transaction.amount}
                      </p>
                      <span className={css.HomeTabMobileTableBottomLine}></span>
                    </li>
                    <li className={css.HomeTabMobileTableItem}>
                      <button
                        onClick={() => handleDeleteClick(transaction.id)}
                        className={css.HomeTabMobileDeleteBtn}
                      >
                        <p className={css.HomeTabMobileDeleteBtnText}>Delete</p>
                      </button>
                      <button
                        onClick={() =>
                          handleEditClick(transaction.id, transaction)
                        }
                        className={css.HomeTabMobileEditBtn}
                      >
                        <EditOutlinedIcon
                          color="info"
                          className={css.HomeTabMobileEditIcon}
                        />
                        <p className={css.HomeTabMobileEdit}>Edit</p>
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            );
          })}
        </ul>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Comment</th>
              <th>Sum</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transactionData.map(transaction => {
              return (
                <tr key={transaction.id}>
                  <td>{transaction.transactionDate}</td>
                  <td>{transaction.type === 'INCOME' ? '+' : '-'}</td>
                  <td>
                    {categories.map(category =>
                      category.id === transaction.categoryId ? (
                        category.name
                      ) : (
                        <></>
                      )
                    )}
                  </td>
                  <td>{transaction.comment}</td>
                  <td>{transaction.amount}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleEditClick(transaction.id, transaction)
                      }
                    >
                      <EditOutlinedIcon color="info" />
                    </button>
                    <button onClick={() => handleDeleteClick(transaction.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HomeTab;
