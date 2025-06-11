import { makeStyles } from '@material-ui/core/styles';

export const useViewTableFiltersStyles = makeStyles(theme => ({
  dateSlash: {
    height: '32px',
    width: '1px',
    marginLeft: '50%',
    background: 'black',
    display: 'flex',
    alignSelf: 'flex-end'
  },
  date: {
    position: 'absolute',
    width: '49.5%',
    bottom: '0',
    '& .MuiInputBase-input': {
      textAlign: 'center'
    }
  },
  dateLeft: {
    left: 0
  },
  dateRight: {
    right: 0
  },
  dateWrapper: {
    display: 'flex',
    position: 'relative'
  },
  clearFilters: {
    marginTop: '-5px',
    position: 'absolute',
    marginLeft: '-55px',
    zIndex: '2',
  },
  clearFiltersNewCol: {
    marginLeft: '-10px',
    zIndex: '2',
  },
  newTableCell: {
    paddingLeft: '0px !important',
    paddingRight: '0px !important'
  }
}));
