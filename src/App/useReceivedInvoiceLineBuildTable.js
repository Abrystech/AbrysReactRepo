import VisibilityIcon from '@material-ui/icons/Visibility';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { skeletonHelper } from '../helper/skeleton.helper';
import { rowFilterHelper } from '../helper/rowFilter.helper';
import { FILTER_TYPE } from '../ViewTable/ViewTableFilters';
import { Tooltip } from '@material-ui/core';
import { WarningRounded } from '@material-ui/icons';
import { color } from './styles/color.styles';

export const useReceivedInvoiceLineBuildTable = (inputs, handleSelect, chapterMode) => {
  const [rows, setRows] = useState([]);
  const [initialRows, setInitialRows] = useState([]);

  const taxExemptElements = useMemo(() => {
    const taxExemptOptions = {
      true: 'receivedInvoiceLine.taxExemptOptions.isTaxExempt',
      false: 'receivedInvoiceLine.taxExemptOptions.isNotTaxExempt'
    };

    var taxExemptOptionsMapped = Object.keys(taxExemptOptions).map(key => {
      return {
        value: key,
        name: taxExemptOptions[key]
      };
    });

    return [{ value: null, name: 'common:selectFirstOptionComboFilter' }, ...taxExemptOptionsMapped];
  }, []);

  const headCells = useMemo(() => {
    return [
      {
        id: 'description',
        numeric: false,
        disablePadding: true,
        label: 'Description'
      },
      {
        id: 'elipsis',
        label: 'Elipsis',
        ellipsis: true,
        numeric: false,
        disablePadding: true
      },
      {
        id: 'quantity',
        numeric: false,
        disablePadding: true,
        label: 'Quantity'
      },
      {
        id: 'amount',
        numeric: false,
        disablePadding: true,
        label: 'Amount'
      },
      {
        id: 'total',
        numeric: false,
        disablePadding: true,
        label: 'Total'
      },
      {
        id: 'isTaxExempt',
        numeric: false,
        disablePadding: false,
        label: 'IsTaxExempt',
        filterType: FILTER_TYPE.COMBO,
        filterValues: taxExemptElements,
        tooltip: {
          trueText: 'receivedInvoiceLine.taxExemptOptions.isTaxExempt',
          falseText: 'receivedInvoiceLine.taxExemptOptions.isNotTaxExempt'
        },
        additionalProperty: {
          value: element =>
            element?.additional && (
              <Tooltip title={'suppliers:homologation.workersHomologation'} placement="top">
                <WarningRounded style={{ color: color.icons.warn, fontSize: 25, width: '1.4em' }} />
              </Tooltip>
            ),
          afterParent: true
        }
      },
      {
        id: 'anyDate',
        numeric: false,
        disablePadding: false,
        label: 'Date',
        filterType: FILTER_TYPE.DATE
      },
      {
        id: 'otro',
        numeric: false,
        disablePadding: false,
        label: 'Otro',
        filterType: FILTER_TYPE.COMBO,
        filterValues: taxExemptElements,
        tooltip: {
          trueText: 'receivedInvoiceLine.taxExemptOptions.isTaxExempt',
          falseText: 'receivedInvoiceLine.taxExemptOptions.isNotTaxExempt'
        },
        additionalProperty: {
          value: element =>
            element?.additional && (
              <Tooltip title={'suppliers:homologation.workersHomologation'} placement="top">
                <WarningRounded style={{ color: color.icons.warn, fontSize: 25, width: '1.4em' }} />
              </Tooltip>
            ),
          afterParent: true
        }
      },
      {
        id: 'edit',
        action: true
      }
    ];
  }, [taxExemptElements]);

  const getRowsWithChapters = rows => {
    const rowsSortedByWorkOrder = rows
      .map(line => {
        return { ...line, workOrder: line.description.substr(0, line.description.indexOf('|')).trim() };
      })
      .sort((a, b) => a.workOrder.localeCompare(b.workOrder));

    const workOrders = [
      ...new Set(rowsSortedByWorkOrder.map(row => row.workOrder).filter(wo => !skeletonHelper.isSkeletonLoading(wo)))
    ];

    let rowsWithChapters = [];

    rowsSortedByWorkOrder.forEach(receivedInvoiceLine => {
      if (workOrders.some(wo => wo === receivedInvoiceLine.workOrder)) {
        rowsWithChapters.push({
          id: receivedInvoiceLine.id + 'chapter',
          externalReference: receivedInvoiceLine.externalReference,
          description: receivedInvoiceLine.workOrder,
          elipsis: receivedInvoiceLine.workOrder,
          workOrder: receivedInvoiceLine.workOrder,
          total: 12,
          isAccordionHeader: true,
          anyDate: receivedInvoiceLine?.anyDate ?? '-',
          bool: receivedInvoiceLine.bool,
          additional: receivedInvoiceLine.additional,
          otro: receivedInvoiceLine.otro,
          edit: {
            title: 'actions.edit'
            // cb: () => handleSelect(receivedInvoiceLine),
          }
        });
        workOrders.shift();
      }
      rowsWithChapters.push(receivedInvoiceLine);
    });
    return rowsWithChapters;
  };

  useEffect(() => {
    const rowsMapped = !inputs?.length
      ? []
      : inputs
      ? inputs.map(receivedInvoiceLine => ({
          id: receivedInvoiceLine.id,
          externalReference: receivedInvoiceLine.externalReference,
          quantity: receivedInvoiceLine.quantity,
          description: receivedInvoiceLine.description,
          elipsis: receivedInvoiceLine.description,
          amountUnformatted: receivedInvoiceLine.amount,
          amount: skeletonHelper.isSkeletonLoading(receivedInvoiceLine.amount)
            ? receivedInvoiceLine.amount
            : receivedInvoiceLine.amount,
          totalUnformatted: receivedInvoiceLine.amount * receivedInvoiceLine.quantity,
          total: skeletonHelper.isSkeletonLoading(receivedInvoiceLine.amount)
            ? receivedInvoiceLine.amount
            : receivedInvoiceLine.amount,
          isTaxExempt: receivedInvoiceLine.isTaxExempt,
          anyDate: receivedInvoiceLine?.anyDate ?? '-',
          bool: receivedInvoiceLine.bool,
          additional: receivedInvoiceLine.additional,
          otro: receivedInvoiceLine.otro,
          edit: {
            title: 'actions.view',
            cb: () => handleSelect(receivedInvoiceLine),
            icon: <VisibilityIcon />
          }
        }))
      : [];
    setInitialRows(chapterMode ? getRowsWithChapters(rowsMapped) : rowsMapped);
    setRows(chapterMode ? getRowsWithChapters(rowsMapped) : rowsMapped);
  }, [chapterMode, inputs, inputs?.length]);

  const getReceivedInvoiceLines = useCallback(
    ({ paging, sorting, filteredCells }) => {
      setRows(rowFilterHelper.getFilteredRows(initialRows, filteredCells));
    },
    [initialRows]
  );

  return { headCells, rows, getReceivedInvoiceLines };
};
