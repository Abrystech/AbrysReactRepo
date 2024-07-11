import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { errorToaster } from '../../execToaster';

const TABLE_CONFIGURATIONS_STORAGE = 'TABLE_CONFIGURATIONS';

export function useManageColumns({
  tableName,
  headCells = [],
  defaultColumns = [],
  minColumns = 1,
  minColumnsErrorLabel = `At least ${minColumns} column/s must be visible.`
}) {
  const [customColumns, setCustomColumns] = useState(headCells);

  if (!tableName) {
    throw new Error('Field tableName is required');
  }

  useEffect(() => {
    const savedData = localStorage.getItem(`${tableName}_${TABLE_CONFIGURATIONS_STORAGE}`);

    if (savedData) {
      const parsedData = savedData.split(',');
      setCustomColumns(headCells.filter(hc => parsedData.includes(hc.id) || hc.action));
    } else {
      setCustomColumns(headCells.filter(hc => defaultColumns.includes(hc.id) || hc.action));
    }
  }, []);

  const saveTableConfig = headNames => {
    localStorage.setItem(`${tableName}_${TABLE_CONFIGURATIONS_STORAGE}`, headNames);
  };

  const handleColumnVisiblity = column => {
    if (
      customColumns?.find(c => c.id === column.id) &&
      customColumns?.filter(col => !col.action).length - 1 < minColumns
    ) {
      errorToaster(minColumnsErrorLabel);
    } else {
      setCustomColumns(prevCustomColumns =>
        headCells.reduce((result, cell) => {
          const prevColumn = prevCustomColumns?.find(c => c.id === cell.id);
          if (cell.id === column.id) {
            if (!customColumns?.find(c => c.id === column.id)) {
              result.push(column);
            }
          } else {
            if (prevColumn) {
              result.push(cell);
            }
          }
          return result;
        }, [])
      );
    }
  };

  const columnMapperForButton = useMemo(() => {
    return headCells.reduce((result, cell) => {
      if (!cell.action) {
        result.push({
          text: `${customColumns?.find(dc => dc.id === cell.id) ? '✓ ' : '〤 '}${cell.label}`,
          action: () => handleColumnVisiblity(cell)
        });
      }
      return result;
    }, []);
  }, [customColumns, headCells]);

  return { customColumns, columnMapperForButton, saveTableConfig };
}

useManageColumns.propTypes = {
  tableName: PropTypes.string.isRequired,
  headCells: PropTypes.array.isRequired,
  defaultColumns: PropTypes.array.isRequired,
  minColums: PropTypes.number
};
