import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTransaction,
  // updateTransaction,
} from 'redux/Transaction/transactionOperation';
import { selectTransaction } from 'redux/Transaction/transactionSelectors';
import { selectTransactionCategories } from 'redux/TransactionCategories/TransactionCategoriesSelectors';
import css from './HomeTab.module.css';
import { useMediaQuery } from 'react-responsive';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
//import { refreshUser } from 'redux/Auth/authOperations';
import { updateBalance } from 'redux/Auth/authSlice';
import { Link } from 'react-router-dom';
import { toggleEditOpen } from 'redux/ModalEditTransaction/ModalEditTransactionSlice';
import ModalBackground from 'components/ModalBackground/ModalBackground';
import ModalEditTransaction from 'components/ModalEditTransaction/ModalEditTransaction';
import { modalEditOpen } from 'redux/ModalEditTransaction/ModalEditTransactionSelector';
import { useState } from 'react';
import { writeDownCurrentTransaction } from 'redux/Transaction/transactionSlice';
import styled from '@emotion/styled';
// import { modalEditOpen } from 'redux/ModalEditTransaction/ModalEditTransactionSelector';
// import ModalBackground from 'components/ModalBackground/ModalBackground';
// import ModalEditTransaction from 'components/ModalEditTransaction/ModalEditTransaction';

const HomeTab = () => {
  const transactionData = useSelector(selectTransaction);
  const categories = useSelector(selectTransactionCategories);
  const dispatch = useDispatch();
  const OpenModaiEdit = useSelector(modalEditOpen);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const [transaction, setTransaction] = useState(null);

  const StyledPencil = styled(EditOutlinedIcon)`
    fill: rgba(255, 255, 255, 0.6);
  `;

  const handleDeleteClick = transaction => {
    dispatch(deleteTransaction(transaction));
    dispatch(updateBalance(-Number(transaction.amount)));
  };
  const handleEditClick = transaction => {
    setTransaction(transaction);
    // dispatch(currentTransaction(transaction));
    dispatch(writeDownCurrentTransaction(transaction));
    dispatch(toggleEditOpen());
  };
  // if (!transaction) return;
  return (
    <>
      {OpenModaiEdit && (
        <ModalBackground title="edit">
          <ModalEditTransaction transaction={transaction} />
        </ModalBackground>
      )}
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
                          {new Date(
                            transaction.transactionDate
                          ).toLocaleDateString()}
                        </p>
                        <span
                          className={css.HomeTabMobileTableBottomLine}
                        ></span>
                      </li>
                      <li className={css.HomeTabMobileTableItem}>
                        <p className={css.HomeTabMobileTableHeader}>Type</p>
                        <p className={css.HomeTabMobileTableValue}>
                          {transaction.type === 'INCOME' ? '+' : '-'}
                        </p>
                        <span
                          className={css.HomeTabMobileTableBottomLine}
                        ></span>
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
                        <span
                          className={css.HomeTabMobileTableBottomLine}
                        ></span>
                      </li>
                      <li className={css.HomeTabMobileTableItem}>
                        <p className={css.HomeTabMobileTableHeader}>Comment</p>
                        <p className={css.HomeTabMobileTableValue}>
                          {transaction.comment}
                        </p>
                        <span
                          className={css.HomeTabMobileTableBottomLine}
                        ></span>
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
                        <span
                          className={css.HomeTabMobileTableBottomLine}
                        ></span>
                      </li>
                      <li className={css.HomeTabMobileTableItem}>
                        <button
                          onClick={() => handleDeleteClick(transaction)}
                          className={css.HomeTabMobileDeleteBtn}
                        >
                          <p className={css.HomeTabMobileDeleteBtnText}>
                            Delete
                          </p>
                        </button>

                        <button
                          onClick={() => handleEditClick(transaction)}
                          className={css.HomeTabMobileEditBtn}
                        >
                          <StyledPencil className={css.HomeTabMobileEditIcon} />
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
          <table className={css.HomeTabTable}>
            <thead className={css.HomeTabTableHead}>
              <tr>
                <th className={css.HomeTabTableHeadRow}>Date</th>
                <th className={css.HomeTabTableHeadRow}>Type</th>
                <th className={css.HomeTabTableHeadRow}>Category</th>
                <th className={css.HomeTabTableHeadRow}>Comment</th>
                <th className={css.HomeTabTableHeadRow}>Sum</th>
                <th className={css.HomeTabTableHeadRow}></th>
              </tr>
            </thead>
            <tbody>
              {transactionData.map(transaction => {
                return (
                  <tr key={transaction.id} className={css.HomeTabTableRow}>
                    <td className={css.HomeTabTableData}>
                      {new Date(
                        transaction.transactionDate
                      ).toLocaleDateString()}
                    </td>
                    <td className={css.HomeTabTableData}>
                      {transaction.type === 'INCOME' ? '+' : '-'}
                    </td>
                    <td className={css.HomeTabTableData}>
                      {categories.map(category =>
                        category.id === transaction.categoryId ? (
                          category.name
                        ) : (
                          <></>
                        )
                      )}
                    </td>
                    <td className={css.HomeTabTableData}>
                      {transaction.comment}
                    </td>
                    <td
                      className={
                        transaction.type === 'INCOME'
                          ? `${css.HomeTabTableData} ${css.income}`
                          : `${css.HomeTabTableData} ${css.outcome}`
                      }
                    >
                      {transaction.amount}
                    </td>
                    <td className={css.HomeTabTableData}>
                      <button
                        onClick={() => handleEditClick(transaction)}
                        className={css.HomeTabTableEditBtn}
                      >
                        <Link to={`/transaction/${transaction.id}`}>
                          <StyledPencil className={css.HomeTabTableEditIcon} />
                        </Link>
                      </button>

                      <button
                        onClick={() => handleDeleteClick(transaction)}
                        className={css.HomeTabTableDeleteBtn}
                      >
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
    </>
  );
};

export default HomeTab;
