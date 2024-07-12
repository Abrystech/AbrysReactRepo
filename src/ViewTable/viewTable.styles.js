import { makeStyles } from '@material-ui/core/styles';

export const useViewTableStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // padding: theme.spacing(3),
    '& .MuiTableHead-root': {
      // backgroundColor: 'none'
    },
    '& .MuiTableRow-root': {
      '&:last-child': {
        '& .MuiTableCell-root': {
          borderBottom: 'none'
        }
      }
    }
  },
  paper: {
    width: '100%',
    padding: theme.spacing(3),
    marginBottom: theme.spacing(1),
    paddingTop: `${theme.spacing(3)}px !important`,
    '& .MuiFormControl-root': {
      minWidth: 'auto'
    },
    overflow: 'hidden'
  },
  tableContainer: {
    maxHeight: '76vh',
    borderRadius: '4px 4px 0px 0px'
  },
  cellDate: { minWidth: '14vw' },
  table: {
    background: 'white',
    // minWidth: 750,
    '& .MuiTableBody-root': {
      '& .MuiTableCell-root': {
        paddingTop: '0 !important',
        paddingBottom: '0 !important',
        fontFamily: 'Montserrat'
      },
      '& .MuiTableRow-root': {
        '&:hover': {
          background: `${theme.palette.primary.main} !important`,
          '& .MuiTableCell-root': {
            color: 'white'
          },
          '& .MuiIconButton-label': {
            color: 'white !important'
          },
          '& .MuiSvgIcon-root': {
            color: 'white !important'
          },
          '& .MuiSwitch-colorPrimary.Mui-checked + .MuiSwitch-track': {
            backgroundColor: theme.palette.primary.light
          }
        },
        '&:nth-child(odd)': {
          backgroundColor: theme.palette.primary.lightest
        }
      }
    },
    '& .MuiTableCell-root': {
      borderBottom: 'none',
      padding: theme.spacing(2),
      fontSize: '12px',
      color: theme.palette.primary.dark
    },
    '& .MuiTableCell-stickyHeader': {
      backgroundColor: 'white'
    },
    '& .MuiTableRow-root.MuiTableRow-hover:hover': {
      backgroundColor: 'transparent'
    },
    '& .MuiIconButton-label': {
      color: theme.palette.primary.main
    },
    '& .MuiRating-decimal': {
      '& .MuiSvgIcon-root': {
        color: 'inherit !important'
      }
    },
    '& .Mui-disabled': {
      '& .MuiSvgIcon-root': {
        opacity: 0.3
      }
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main,
      cursor: 'pointer'
    },
    '& .MuiFormControlLabel-root': {
      margin: 0,
      '& .MuiSwitch-root': {}
    }
  },
  numeric: {
    whiteSpace: 'nowrap'
  },
  isAccordionHeader: {
    fontWeight: 'bold'
  },
  ellipsis: {
    maxWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '& span': {
      display: 'block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  },
  tooltip: {
    fontSize: theme.font.size.m
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  summary: {
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(2),
    alignItems: 'center',
    '& .MuiSnackbar-root': {
      zIndex: '2200'
    }
  },
  empty: {
    backgroundColor: 'white',
    '&.MuiTableRow-root.MuiTableRow-hover:hover': {
      backgroundColor: 'white'
    }
  },
  highlight: {
    color: theme.palette.primary.main
  },
  selected: {
    flex: 1,
    marginLeft: '1rem'
  },
  footerWrapper: {
    maxHeight: '10vh',
    borderRadius: '0px 0px 4px 4px',
    background: 'white',
    display: 'flex',
    flexGrow: 1,
    alignItems: 'end',
    borderTop: `1px solid ${theme.palette.primary.light}`,
    marginTop: '5px',
    '& .MuiTablePagination-toolbar': {
      alignItems: 'center !important'
    },
    '& .MuiToolbar-root': {
      padding: 0,
      color: theme.palette.primary.main,
      '& .MuiTablePagination-caption': {
        fontWeight: 'bold',
        fontSize: '13px'
      },
      '& .MuiTablePagination-input': {
        fontWeight: 'bold'
      },
      '& .MuiButtonBase-root': {
        '&:not(.Mui-disabled)': {
          color: theme.palette.primary.main
        }
      }
    }
  },
  wrapper: {
    display: 'flex',
    flexGrow: 1,
    borderTop: `1px solid ${theme.palette.primary.light}`
  },
  headCell: {
    color: theme.palette.primary.main,
    fontWeight: theme.font.weight.black,
    fontSize: '13px'
  },
  filterRow: {
    position: 'sticky',
    '& th': {
      '&.MuiTableCell-root': {
        paddingTop: 0
      }
    },
    '& td': {
      '&.MuiTableCell-root': {
        paddingTop: 0
      }
    },
    '& .MuiTableCell-root': {
      borderBottom: `1px solid ${theme.palette.primary.light}`
    },
    '& .MuiInputBase-root': {
      fontSize: '13px'
    },
    '& .MuiInput-underline': {
      color: theme.palette.primary.main,
      '&:hover': {
        '&::before': {
          borderBottom: `2px solid ${theme.palette.primary.main}`
        }
      },
      '&::before': {
        borderBottom: `1px solid ${theme.palette.primary.main}`
      }
    }
  },
  filterCell: {
    textAlign: 'center'
  },
  summaryRow: {
    backgroundColor: theme.palette.table.summary,
    height: '53px'
  },
  summaryCell: {
    fontWeight: theme.font.weight.semibold
  },
  verticalAlign: {
    display: 'inline-block'
  },
  disabled: {
    opacity: 0.5
  },
  flexReverse: {
    flexDirection: 'column-reverse'
  },
  actionCell: {
    width: 0,
    paddingTop: '0 !important',
    paddingBottom: '0 !important'
  }
}));
