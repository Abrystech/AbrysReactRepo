import { useCallback, useEffect, useMemo, useState } from 'react';

import { FILTER_TYPE } from '../ViewTable/ViewTableFilters';
import { rowFilterHelper } from '../helper/rowFilter.helper';

export const useReceivedInvoiceLineBuildTableChapter = inputs => {
  const [rows, setRows] = useState([]);
  const [initialRows, setInitialRows] = useState([]);
  useEffect(() => {
    setInitialRows(inputs);
    setRows(inputs);
  }, []);

  const headCells = useMemo(() => {
    return [
      {
        id: 'itemDescription',
        numeric: false,
        ellipsis: true,
        disablePadding: false,
        label: 'budgetItems.properties.itemDescription'
      },
      {
        id: 'quantity',
        numeric: true,
        disablePadding: false,
        label: 'budgetItems.properties.quantity',
        filterType: FILTER_TYPE.NONE
      },
      {
        id: 'unitSellingPrice',
        numeric: true,
        disablePadding: false,
        label: 'budgetItems.properties.unitSellingPrice',
        filterType: FILTER_TYPE.NONE
      },
      {
        id: 'totalSellingPrice',
        numeric: true,
        disablePadding: false,
        label: 'budgetItems.properties.totalSellingPrice',
        filterType: FILTER_TYPE.NONE
      }
    ];
  }, [inputs]);

  const getReceivedInvoiceLines = useCallback(
    ({ paging, sorting, filteredCells }) => {
      setRows(rowFilterHelper.getFilteredRows(initialRows, filteredCells));
    },
    [initialRows]
  );

  return { headCells, rows, getReceivedInvoiceLines };
};
