import React, { Component } from 'react';
import Switch from 'react-switch';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import css from './Switch.module.css';

export class SwitchExample extends Component {
  constructor() {
    super();
    this.state = { checked: true };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
    const typeOfTransaction = this.state.checked;
    this.props.getStatusType(typeOfTransaction);
  }

  render() {
    const handleIconContainerStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    };

    const handleIconStyles = {
      color: 'white',
      width: '80%',
      height: '80%',
    };

    return (
      <div className={css.switchContainer}>
        <label className={css.radioBtnLabel}>
          <span
            className={
              !this.state.checked
                ? `${css.radioBtnSpan} ${css.activeTitleIncome}`
                : `${css.radioBtnSpan}`
            }
          >
            {' '}
            Income
          </span>
          <Switch
            onChange={this.handleChange}
            checked={this.state.checked}
            offColor="#FBFBFB"
            onColor="#FBFBFB"
            offHandleColor="#FFB627"
            onHandleColor="#FF868D"
            checkedIcon={false}
            uncheckedIcon={false}
            width={80}
            height={40}
            boxShadow={
              this.state.checked
                ? '1px 4px 15px -6px #FFB627'
                : '1px 4px 15px -6px #FF868D'
            }
            activeBoxShadow={'none'}
            handleDiameter={44}
            checkedHandleIcon={
              <div style={handleIconContainerStyles}>
                <RemoveIcon style={handleIconStyles} />
              </div>
            }
            uncheckedHandleIcon={
              <div style={handleIconContainerStyles}>
                <AddIcon style={handleIconStyles} />
              </div>
            }
          />
          <span
            className={
              this.state.checked
                ? `${css.radioBtnSpan} ${css.activeTitleExpense}`
                : `${css.radioBtnSpan}`
            }
          >
            {' '}
            Expense
          </span>
        </label>
      </div>
    );
  }
}
