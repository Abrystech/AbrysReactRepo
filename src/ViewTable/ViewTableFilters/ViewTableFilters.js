import { IconButton, TableCell, TextField, Tooltip } from '@material-ui/core';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import clsx from 'clsx';
import ChipInput from 'material-ui-chip-input';
import * as moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import shortid from 'shortid';

import { LocaleDatePicker } from '../../LocaleDatePicker';
import { Select } from '../../Select';
// import { FILTER_SUFFIX, FILTER_TYPE } from '../../LocaleDatePicker';
import { FILTER_SUFFIX, FILTER_TYPE } from './viewTableFilters.const';
import { useViewTableFiltersStyles } from './viewTableFilters.styles';

function FilterSwitch({
  cell,
  onChange,
  dateFromText,
  dateUntilText,
  todayDatePickerLabel,
  clearDatePickerLabel,
  cancelDatePickerLabel,
  okDatePickerLabel,
  dateFormat
}) {
  const [inputs, setInputs] = useState({});
  const classes = useViewTableFiltersStyles();

  const handleEnterKey = e => {
    if (e.key === 'Enter') {
      const pickerName = cell.id + FILTER_SUFFIX.START;
      const value = e.target.value ? moment(e?.target?.value, dateFormat) : null;
      setInputs(prev => ({ ...prev, [pickerName]: value }));
      onChange(pickerName, value);
    }
  };
  useEffect(() => {
    if (cell?.filterValue) {
      setInputs(prev => ({ ...prev, [cell.id]: cell?.filterValue }));
    }
  }, [cell?.filterValue, cell.id]);

  switch (cell.filterType) {
    case FILTER_TYPE.NONE:
      return null;
    case FILTER_TYPE.DATE:
      return (
        <div className={clsx(classes.dateWrapper, cell.className)}>
          <LocaleDatePicker
            todayDatePickerLabel={todayDatePickerLabel}
            clearDatePickerLabel={clearDatePickerLabel}
            cancelDatePickerLabel={cancelDatePickerLabel}
            okDatePickerLabel={okDatePickerLabel}
            clearable
            onKeyDown={handleEnterKey}
            name={cell.id}
            className={`${classes.date} ${classes.dateLeft}`}
            value={inputs[cell.id + FILTER_SUFFIX.START]}
            format={dateFormat}
            onChange={e => {
              const pickerName = cell.id + FILTER_SUFFIX.START;
              const value = e.target.value ? moment(e?.target?.value, dateFormat) : null;
              setInputs(prev => ({ ...prev, [pickerName]: value }));
              onChange(pickerName, value);
            }}
            error={false}
            helperText={null}
            inputVariant="standard"
            TextFieldComponent={params => <TextField placeholder={dateFromText} {...params} />}
          />
          <div className={classes.dateSlash}></div>
          <LocaleDatePicker
            todayDatePickerLabel={todayDatePickerLabel}
            clearDatePickerLabel={clearDatePickerLabel}
            cancelDatePickerLabel={cancelDatePickerLabel}
            okDatePickerLabel={okDatePickerLabel}
            clearable
            onKeyDown={handleEnterKey}
            name={cell.id}
            className={`${classes.date} ${classes.dateRight}`}
            value={inputs[cell.id + FILTER_SUFFIX.END]}
            format={dateFormat}
            onChange={e => {
              const pickerName = cell.id + FILTER_SUFFIX.END;
              const value = e.target.value ? moment(e?.target?.value, dateFormat) : null;
              setInputs(prev => ({ ...prev, [pickerName]: value }));
              onChange(pickerName, value);
            }}
            error={false}
            helperText={null}
            inputVariant="standard"
            TextFieldComponent={params => <TextField placeholder={dateUntilText} {...params} />}
          />
        </div>
      );
    case FILTER_TYPE.COMBO:
      return (
        <Select
          elements={cell.filterValues}
          title={''}
          displayEmpty
          variant={'standard'}
          style={{ margin: 0 }}
          value={inputs[cell.filterBy || cell.id] || cell.filterValues[0]?.value}
          onChange={e => {
            setInputs(prev => ({
              ...prev,
              [cell.filterBy || cell.id]: e.target.value
            }));
            onChange(cell.filterBy || cell.id, e.target.value);
          }}
        />
      );
    case FILTER_TYPE.CHIP:
      return (
        <ChipInput
          defaultValue={inputs[cell.filterBy || cell.id] || []}
          onChange={value => {
            setInputs(prev => ({
              ...prev,
              [cell.filterBy || cell.id]: value
            }));
            onChange(cell.filterBy || cell.id, value);
          }}
          fullWidth
        />
      );

    default:
      return (
        <TextField
          fullWidth
          defaultValue={inputs[cell.filterBy || cell.id]}
          value={inputs[cell.id]}
          onChange={e => {
            setInputs(prev => ({
              ...prev,
              [cell.id]: e.target.value
            }));
            onChange(cell.id, e.target.value);
          }}
        />
      );
  }
}

FilterSwitch.propTypes = {
  cell: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  selectFirstOptionComboFilterText: PropTypes.string,
  dateFromText: PropTypes.string,
  dateUntilText: PropTypes.string,
  todayDatePickerLabel: PropTypes.string,
  clearDatePickerLabel: PropTypes.string,
  cancelDatePickerLabel: PropTypes.string,
  okDatePickerLabel: PropTypes.string,
  dateFormat: PropTypes.string
};

function _viewTableFilters({
  cells,
  onFilterCellChange,
  onFilterClear,
  clearFiltersText,
  dateFromText,
  dateUntilText,
  todayDatePickerLabel,
  clearDatePickerLabel,
  cancelDatePickerLabel,
  okDatePickerLabel,
  dateFormat
}) {
  const classes = useViewTableFiltersStyles();

  const [reset, setReset] = useState(false);
  function resetFilter() {
    onFilterClear && onFilterClear();
    setReset(!reset);
  }
  return (
    <>
      {cells && cells.length && (
        <>
          {cells.map(cell => {
            return (
              <TableCell key={shortid.generate()} component="th">
                {cell.label && (
                  <FilterSwitch
                    cell={cell}
                    onChange={onFilterCellChange}
                    shouldClear={reset}
                    dateFromText={dateFromText}
                    dateUntilText={dateUntilText}
                    todayDatePickerLabel={todayDatePickerLabel}
                    clearDatePickerLabel={clearDatePickerLabel}
                    cancelDatePickerLabel={cancelDatePickerLabel}
                    okDatePickerLabel={okDatePickerLabel}
                    dateFormat={dateFormat}
                  />
                )}
              </TableCell>
            );
          })}
          {cells.some(cell => cell.action) ? (
            onFilterClear && (
              <Tooltip title={clearFiltersText}>
                <td className={classes.clearFilters}>
                  <IconButton onClick={resetFilter}>
                    <DeleteSweepIcon />
                  </IconButton>
                </td>
              </Tooltip>
            )
          ) : (
            <TableCell className={classes.newTableCell} key={shortid.generate()} component="th">
              <Tooltip title={clearFiltersText}>
                <IconButton className={classes.clearFiltersNewCol} onClick={resetFilter}>
                  <DeleteSweepIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          )}
        </>
      )}
    </>
  );
}

export const ViewTableFilters = React.memo(_viewTableFilters);

_viewTableFilters.propTypes = {
  cells: PropTypes.array.isRequired,
  onFilterCellChange: PropTypes.func.isRequired,
  onFilterClear: PropTypes.func,
  clearFiltersText: PropTypes.string,
  dateFromText: PropTypes.string,
  dateUntilText: PropTypes.string,
  todayDatePickerLabel: PropTypes.string,
  clearDatePickerLabel: PropTypes.string,
  cancelDatePickerLabel: PropTypes.string,
  okDatePickerLabel: PropTypes.string,
  dateFormat: PropTypes.string
};
