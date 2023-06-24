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

  const isMobile = useMediaQuery({ query: '(min-width: 375px)' });

  const handleDeleteClick = id => {
    dispatch(deleteTransaction(id));
  };
  const handleEditClick = (id, body) => {
    dispatch(updateTransaction(id, body));
  };

  return (
    <div className={css.HomeTabPage}>
      {!isMobile ? (
        <ul>
          {transactionData.map(transaction => {
            return (
              <li key={transaction.id}>
                <ul>
                  <li>
                    <p>Date</p>
                    <p>{transaction.transactionDate}</p>
                  </li>
                  <li>
                    <p>Type</p>
                    <p>{transaction.type === 'INCOME' ? '+' : '-'}</p>
                  </li>
                  <li>
                    <p>Category</p>
                    <p>
                      {categories.map(category =>
                        category.id === transaction.categoryId ? (
                          category.name
                        ) : (
                          <></>
                        )
                      )}
                    </p>
                  </li>
                  <li>
                    <p>Comment</p>
                    <p>{transaction.comment}</p>
                  </li>
                  <li>
                    <p>Sum</p>
                    <p>{transaction.amount}</p>
                  </li>
                  <li>
                    <button>Delete</button>
                    <button
                      onClick={() =>
                        handleEditClick(transaction.id, transaction)
                      }
                    >
                      <EditOutlinedIcon color="info" />
                      <p>Edit</p>
                    </button>
                  </li>
                </ul>
              </li>
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
