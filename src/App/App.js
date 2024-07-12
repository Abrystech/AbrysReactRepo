import MomentUtils from '@date-io/moment';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';

import { Grid } from '@material-ui/core';
import {
  AlertIcon,
  AsyncInputAutocomplete,
  Avatar,
  BooleanIcon,
  Button,
  ButtonActivateDesactivateNotifications,
  ButtonAdd,
  ButtonDelete,
  ButtonGroup,
  ButtonMulti,
  ButtonSave,
  DialogModal,
  Dropzone,
  ErrorSummary,
  errorToaster,
  Form,
  InfoIcon,
  InfoSummary,
  infoToaster,
  Input,
  LocaleDatePicker,
  NotificationsButton,
  Select,
  SuccessSummary,
  successToaster,
  Tabs,
  ViewTable,
  WarningIcon,
  WarningSummary,
  warningToaster
} from '../';
import { execAwaitedModal } from '../execAwaitedModal';
import { CustomSwitch } from '../Switch/Switch';
import { useAppStyles } from './app.styles';
import { useManageColumns } from './useManageColumns/useManageColumns';
import { useReceivedInvoiceLineBuildTable } from './useReceivedInvoiceLineBuildTable';
import { useReceivedInvoiceLineBuildTableChapter } from './useReceivedInvoiceLineBuildTableChapter';
import { useTogglingElements } from './useTogglingElements';

require('babel-polyfill');

export function App() {
  const classes = useAppStyles();
  const [openModal, setOpenModal] = useState(false);
  const [openModalWithChildren, setOpenModalWithChildren] = useState(false);
  const [inputs, setInputs] = useState(null);
  const [submitted, setSubmitted] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectValue, setSelectValue] = useState(null);
  const [notificationsTurnedOn, setNotificationsTurnedOn] = useState(false);
  const formRef = useRef(null);
  const [chapterMode, setChapterMode] = useState(false);
  const onAction = e => {
    setSubmitted(true);
    // alert('lol');
  };

  function handleSelectFile(acceptedFile) {
    const file = acceptedFile[0];
    setInputs(prevInputs => ({
      ...prevInputs,
      documentName: file.name
    }));
    setSubmitted(false);
  }
  function handleDeleteFile() {
    setInputs(prevInputs => ({
      ...prevInputs,
      documentUrl: null,
      documentName: null
    }));
    setSubmitted(false);
  }

  function handleDateChange(e) {
    setInputs(prevInputs => ({
      ...prevInputs,
      date: e?.target?.value
    }));
  }

  const dataChapter = useRef([
    {
      id: '223a',
      isAccordionHeader: true,
      itemCategory: 'Adecuaciones',
      itemDescription: 'Adecuaciones',
      toogleProperty: 'Adecuaciones'
    },
    {
      id: '223a12',
      isAccordionHeader: 'itemCategorySubSpeciality',
      itemCategory: 'Adecuaciones',
      itemDescription: '3',
      toogleProperty: '3',
      parent: 'Adecuaciones',
      tabulationLevel: 1
    },
    {
      id: '12121ad',
      assetReference: '123123',
      itemCategory: 'Adecuaciones',
      itemCategoryId: '223a',
      itemCategorySubspeciality: '3',
      itemCategorySubspecialityId: '223a12',
      itemCategorySubspecialityParentId: null,
      itemCategorySubSpecialityPath: '3',
      itemDescription: 'descripció 123123',
      itemReference: 'referència 123423',
      parents: ['3'],
      quantity: 12,
      quantityAwarded: 12,
      tabulationLevel: 1
    }
  ]);

  const data = useRef([
    {
      id: '9eb5e5b5-abc9-4eb7-a5ec-579499ca8c42',
      externalReference: '965F327C-3064-4B6C-B84B-84B244CF4AAD',
      districtId: '727558c5-7999-4b76-946e-06b6d44af4f3',
      quantity: 1,
      amount: 289,
      description:
        'OK_AD-0001/2022 | CAS-1 | OKUANT_0001 | PACK 1:  Retirada de enseres, Limpieza, Desenganche de suministros, Fotos del antes y del después y  Descerraje y cambio de bombín.',
      isTaxExempt: true,
      additional: true,
      anyDate: '12/02/2023',
      otro: <BooleanIcon condition={true}></BooleanIcon>
    },
    {
      id: '80b96bde-57a7-44fd-a66f-604f5223bd54',
      externalReference: '860EDC2E-8EEC-4F6C-8682-D52C088C6AAE',
      districtId: '727558c5-7999-4b76-946e-06b6d44af4f3',
      quantity: 1,
      amount: 391,
      description: 'OK_AD-0001/2022 | CAS-1 | OKUANT_0025 | Pintura vivienda hasta 80 m2',
      isTaxExempt: false,
      anyDate: '12/12/2022'
    },
    {
      id: '9eb5e5b5a5ec-579499ca8c42',
      externalReference: '965F327C-3064-4B6C-B84B-84B244CF4AAD',
      districtId: '727558c5-7999-4b76-946e-06b6d44af4f3',
      quantity: 1,
      amount: 289,
      description:
        'OK_AD-0001/2022 | CAS-1 | OKUANT_0001 | PACK 1:  Retirada de enseres, Limpieza, Desenganche de suministros, Fotos del antes y del después y  Descerraje y cambio de bombín.',
      isTaxExempt: true,
      additional: true,
      anyDate: '12/02/2023',
      otro: <BooleanIcon condition={true}></BooleanIcon>
    },
    {
      id: '80b96bd4fd-a66f-604f5223bd54',
      externalReference: '860EDC2E-8EEC-4F6C-8682-D52C088C6AAE',
      districtId: '727558c5-7999-4b76-946e-06b6d44af4f3',
      quantity: 1,
      amount: 391,
      description: 'OK_AD-0001/2022 | CAS-1 | OKUANT_0025 | Pintura vivienda hasta 80 m2',
      isTaxExempt: false,
      anyDate: '12/12/2022'
    },
    {
      id: '9eb5e5b5-abc9-499ca8c42',
      externalReference: '965F327C-3064-4B6C-B84B-84B244CF4AAD',
      districtId: '727558c5-7999-4b76-946e-06b6d44af4f3',
      quantity: 1,
      amount: 289,
      description: 'OK_AD-0001/2022 | CAS-1 | OKUANT_0001 ',
      isTaxExempt: true,
      additional: true,
      anyDate: '12/02/2023',
      otro: <BooleanIcon condition={true}></BooleanIcon>
    },
    {
      id: '80b96bd7-44fd-a64f5223bd54',
      externalReference: '860EDC2E-8EEC-4F6C-8682-D52C088C6AAE',
      districtId: '727558c5-7999-4b76-946e-06b6d44af4f3',
      quantity: 1,
      amount: 391,
      description: 'OK_AD-0001/2022 | CAS-1 | OKUANT_0025 ',
      isTaxExempt: false,
      anyDate: '12/12/2022'
    },
    {
      id: '9eb5e5b5-abc9-4eb2',
      externalReference: '965F327C-3064-4B6C-B84B-84B244CF4AAD',
      districtId: '727558c5-7999-4b76-946e-06b6d44af4f3',
      quantity: 1,
      amount: 289,
      description: 'OK_AD-0001/2022 | CAS-1 | OKUANT_0001 ',
      isTaxExempt: true,
      additional: true,
      anyDate: '12/02/2023',
      otro: <BooleanIcon condition={true}></BooleanIcon>
    },
    {
      id: 'f-604f5223bd54',
      externalReference: '860EDC2E-8EEC-4F6C-8682-D52C088C6AAE',
      districtId: '727558c5-7999-4b76-946e-06b6d44af4f3',
      quantity: 1,
      amount: 391,
      description: 'OK_AD-0001/2022 | CAS-1 | OKUANT_0025 ',
      isTaxExempt: false,
      anyDate: '12/12/2022'
    },
    {
      id: '9eb5e5b5-abc9-4eb7-a5ec-579499ca8c42',
      externalReference: '965F327C-3064-4B6C-B84B-84B244CF4AAD',
      districtId: '727558c5-7999-4b76-946e-06b6d44af4f3',
      quantity: 1,
      amount: 289,
      description: 'OK_AD-0001/2022 | CAS-1 | OKUANT_0001 ',
      isTaxExempt: true,
      additional: true,
      anyDate: '12/02/2023',
      otro: <BooleanIcon condition={true}></BooleanIcon>
    },
    {
      id: '80b96bde-57a7-44fd-a66f-604f5223bd54',
      externalReference: '860EDC2E-8EEC-4F6C-8682-D52C088C6AAE',
      districtId: '727558c5-7999-4b76-946e-06b6d44af4f3',
      quantity: 1,
      amount: 391,
      description: 'OK_AD-0001/2022 | CAS-1 | OKUANT_0025 ',
      isTaxExempt: false,
      anyDate: '12/12/2022'
    },
    {
      id: '9eb5eeb7-a5ec-579499ca8c42',
      externalReference: '965F327C-3064-4B6C-B84B-84B244CF4AAD',
      districtId: '727558c5-7999-4b76-946e-06b6d44af4f3',
      quantity: 1,
      amount: 289,
      description: 'OK_AD-0001/2022 | CAS-1 | OKUANT_0001 ',
      isTaxExempt: true,
      additional: true,
      anyDate: '12/02/2023',
      otro: <BooleanIcon condition={true}></BooleanIcon>
    },
    {
      id: '80b96bde-57a7-23bd54',
      externalReference: '860EDC2E-8EEC-4F6C-8682-D52C088C6AAE',
      districtId: '727558c5-7999-4b76-946e-06b6d44af4f3',
      quantity: 1,
      amount: 391,
      description: 'OK_AD-0001/2022 | CAS-1 | OKUANT_0025 ',
      isTaxExempt: false,
      anyDate: '12/12/2022'
    },
    {
      id: '9eb5e5b5-abc9-4eb7-a5ec-579499ca8c42 asdas',
      externalReference: '965F327C-3064-4B6C-B84B-84B244CF4AAD',
      districtId: '727558c5-7999-4b76-946e-06b6d44af4f3',
      quantity: 1,
      amount: 289,
      description:
        'OK_AD-0001/2022 | CAS-1 | OKUANT_0001 | PACK 1:  Retirada de enseres, Limpieza, Desenganche de suministros, Fotos del antes y del después y  Descerraje y cambio de bombín.',
      isTaxExempt: true,
      additional: true,
      anyDate: '12/02/2023',
      otro: <BooleanIcon condition={true}></BooleanIcon>
    },
    {
      id: '80b96bde-57a7-44fd-a66f-604f5223bd54 sad',
      externalReference: '860EDC2E-8EEC-4F6C-8682-D52C088C6AAE',
      districtId: '727558c5-7999-4b76-946e-06b6d44af4f3',
      quantity: 1,
      amount: 391,
      description: 'OK_AD-0001/2022 | CAS-1 | OKUANT_0025 | Pintura vivienda hasta 80 m2',
      isTaxExempt: false,
      anyDate: '12/12/2022'
    },
    {
      id: '9eb5e5b5a5ec-579499ca8c42 asa',
      externalReference: '965F327C-3064-4B6C-B84B-84B244CF4AAD',
      districtId: '727558c5-7999-4b76-946e-06b6d44af4f3',
      quantity: 1,
      amount: 289,
      description:
        'OK_AD-0001/2022 | CAS-1 | OKUANT_0001 | PACK 1:  Retirada de enseres, Limpieza, Desenganche de suministros, Fotos del antes y del después y  Descerraje y cambio de bombín.',
      isTaxExempt: true,
      additional: true,
      anyDate: '12/02/2023',
      otro: <BooleanIcon condition={true}></BooleanIcon>
    },
    {
      id: '80b96bd4fd-a66f-604f5223bd54df',
      externalReference: '860EDC2E-8EEC-4F6C-8682-D52C088C6AAE',
      districtId: '727558c5-7999-4b76-946e-06b6d44af4f3',
      quantity: 1,
      amount: 391,
      description: 'OK_AD-0001/2022 | CAS-1 | OKUANT_0025 | Pintura vivienda hasta 80 m2',
      isTaxExempt: false,
      anyDate: '12/12/2022'
    },
    {
      id: '9eb5e5b5-abc9-499ca8c421c',
      externalReference: '965F327C-3064-4B6C-B84B-84B244CF4AAD',
      districtId: '727558c5-7999-4b76-946e-06b6d44af4f3',
      quantity: 1,
      amount: 289,
      description: 'OK_AD-0001/2022 | CAS-1 | OKUANT_0001 ',
      isTaxExempt: true,
      additional: true,
      anyDate: '12/02/2023',
      otro: <BooleanIcon condition={true}></BooleanIcon>
    },
    {
      id: '80b96bd7-44fd-a64f5223bd5451',
      externalReference: '860EDC2E-8EEC-4F6C-8682-D52C088C6AAE',
      districtId: '727558c5-7999-4b76-946e-06b6d44af4f3',
      quantity: 1,
      amount: 391,
      description: 'OK_AD-0001/2022 | CAS-1 | OKUANT_0025 ',
      isTaxExempt: false,
      anyDate: '12/12/2022'
    },
    {
      id: '9eb5e5b5-abc9-4eb211',
      externalReference: '965F327C-3064-4B6C-B84B-84B244CF4AAD',
      districtId: '727558c5-7999-4b76-946e-06b6d44af4f3',
      quantity: 1,
      amount: 289,
      description: 'OK_AD-0001/2022 | CAS-1 | OKUANT_0001 ',
      isTaxExempt: true,
      additional: true,
      anyDate: '12/02/2023',
      otro: <BooleanIcon condition={true}></BooleanIcon>
    },
    {
      id: 'f-604f5223bd54',
      externalReference: '860EDC2E-8EEC-4F6C-8682-D52C088C6AAE',
      districtId: '727558c5-7999-4b76-946e-06b6d44af4f3',
      quantity: 1,
      amount: 391,
      description: 'OK_AD-0001/2022 | CAS-1 | OKUANT_0025 ',
      isTaxExempt: false,
      anyDate: '12/12/2022'
    },
    {
      id: '9eb5e5b5-abc9-4eb7-a12c-579499ca8c42',
      externalReference: '965F327C-3064-4B6C-B84B-84B244CF4AAD',
      districtId: '727558c5-7999-4b76-946e-06b6d44af4f3',
      quantity: 1,
      amount: 2891,
      description: 'OK_AD-0001/2022 | CAS-1 | OKUANT_0001 ',
      isTaxExempt: true,
      additional: true,
      anyDate: '12/02/2023',
      otro: <BooleanIcon condition={true}></BooleanIcon>
    },
    {
      id: '80b96bde-57a7-44fd-a66f-604f5223bd84',
      externalReference: '860EDC2E-8EEC-4F6C-8682-D52C088C6AAE',
      districtId: '727558c5-7999-4b76-946e-06b6d44af4f3',
      quantity: 1,
      amount: 391,
      description: 'OK_AD-0001/2022 | CAS-1 | OKUANT_0025 ',
      isTaxExempt: false,
      anyDate: '12/12/2022'
    }
  ]);

  const {
    rows: rowsChapter,
    headCells: headCellsChapter,
    getReceivedInvoiceLines: getReceivedInvoiceLinesChapter
  } = useReceivedInvoiceLineBuildTableChapter(dataChapter?.current, () => console.log('lol'), false);

  const { rows, headCells, getReceivedInvoiceLines } = useReceivedInvoiceLineBuildTable(
    data?.current,
    () => console.log('lol'),
    false
  );

  const { customColumns, columnMapperForButton, saveTableConfig } = useManageColumns({
    tableName: 'ENGLOBITY_TABLE',
    headCells: chapterMode ? headCellsChapter : headCells,
    defaultColumns: (chapterMode ? headCellsChapter : headCells).filter(
      c => c.id === 'description' || c.id === 'anyDate'
    )
  });

  const { onToggleElement, isToggled, isVisible } = useTogglingElements(true);

  const filmsOptions = [
    {
      id: 1,
      name: 'The Shawshank Redemption'
    },
    {
      id: 2,
      name: 'The Godfather',
      coolerName: 'El Padrino'
    },
    {
      id: 3,
      name: 'The Godfather: Part II'
    }
  ];
  return (
    <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Form elementRef={formRef} onSubmit={onAction} autoComplete="off">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '2rem'
            }}
          >
            <AsyncInputAutocomplete
              // onChange={(e, element) => handleAddDocumentType(element)}
              style={{ width: '300px' }}
              onChange={(e, element) => null}
              label={'Select or type a film'}
              value={{ id: inputs?.documentTypeId, name: inputs?.documentType }}
              defaultInputValue={inputs?.documentType}
              // icon={<SearchIcon />}
              getOptionLabel={option => option.coolerName ?? option.name}
              getOptionSelected={(option, value) => option.id === value.id}
              requestAction={queryString =>
                queryString ? filmsOptions?.filter(fo => fo.name.includes(queryString)) : filmsOptions
              }
            />
            <AsyncInputAutocomplete
              // onChange={(e, element) => handleAddDocumentType(element)}
              style={{ width: '300px' }}
              onChange={(e, element) => null}
              label={'Composed Autocomplete'}
              value={{ id: inputs?.documentTypeId, name: inputs?.documentType }}
              defaultInputValue={inputs?.documentType}
              // icon={<SearchIcon />}
              getOptionLabel={option => (option.coolerName ? `${option.coolerName} - ${option.name}` : option.name)}
              getOptionSelected={(option, value) => option.id === value.id}
              requestAction={queryString =>
                queryString ? filmsOptions?.filter(fo => fo.name.includes(queryString)) : filmsOptions
              }
              composed
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '2rem'
            }}
          >
            {JSON.stringify(inputs?.date)}
            <span>
              <LocaleDatePicker value={inputs?.date} onChange={handleDateChange} withHours />
            </span>
            <span>
              <LocaleDatePicker
                name="required"
                value={inputs?.date}
                onChange={handleDateChange}
                validators={['required']}
                errorMessages={['validations.required']}
              />
            </span>
          </div>
          <hr />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '2rem'
            }}
          >
            <CustomSwitch label={'Change loading state'} onChange={() => setLoading(!loading)} />
            <Button onClick={onAction}>Submit</Button>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '2rem'
            }}
          >
            <Button loading={loading}>primary</Button>
            <Button loading={loading} type="secondary">
              secondary
            </Button>
            <Button loading={loading} disabled>
              look disabled
            </Button>
            <Button loading={loading} tooltip={{ title: 'with tooltip' }}>
              with tooltip
            </Button>
            <Button
              loading={loading}
              tooltip={{
                title: 'with tooltip diferent placement',
                placement: 'left'
              }}
            >
              with tooltip diferent placement
            </Button>
            <Button loading={true}>Loading</Button>
            <ButtonMulti
              loading={loading}
              text="Multi"
              actions={[
                {
                  text: 'Action 1',
                  action: () => alert(1)
                },
                {
                  text: 'Action 2',
                  action: () => alert(2)
                }
              ]}
            />
          </div>
          <hr />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '2rem'
            }}
          >
            <span>
              Normal
              <br />
              <ButtonAdd loading={loading} />
            </span>
            <span>
              With custom class
              <br />
              <ButtonAdd loading={loading} className={classes.blue} />
            </span>
            <span>
              Disabled
              <br />
              <ButtonAdd loading={loading} disabled={true} />
            </span>
            <span>
              Custom title and icon
              <br />
              <ButtonAdd loading={loading} text="Añadir elemento" icon={<AddIcon />} />
            </span>
            <span>
              With tooltip
              <br />
              <ButtonAdd loading={loading} tooltip={{ title: 'Add element!', placement: 'top' }} />
            </span>
            <span>
              With action
              <br />
              <ButtonAdd
                loading={loading}
                onClick={() => {
                  alert('clicked');
                }}
              />
            </span>
            <span>
              Turn on / off notif
              <br />
              <ButtonActivateDesactivateNotifications
                active={notificationsTurnedOn}
                onClick={() => setNotificationsTurnedOn(!notificationsTurnedOn)}
                loading={loading}
              />
            </span>
          </div>
          <hr />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '2rem'
            }}
          >
            <span>
              Normal
              <br />
              <ButtonSave loading={loading} />
            </span>
            <span>
              With custom class
              <br />
              <ButtonSave loading={loading} className={classes.blue} />
            </span>
            <span>
              Disabled
              <br />
              <ButtonSave loading={loading} disabled={true} />
            </span>
            <span>
              Custom title and icon
              <br />
              <ButtonSave loading={loading} text="Añadir elemento" icon={<AddIcon />} />
            </span>
            <span>
              With tooltip
              <br />
              <ButtonSave loading={loading} tooltip={{ title: 'Add element!', placement: 'top' }} />
            </span>
            <span>
              With action
              <br />
              <ButtonSave
                loading={loading}
                onClick={() => {
                  alert('clicked');
                }}
              />
            </span>
          </div>
          <hr />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '2rem'
            }}
          >
            <span>
              Normal
              <br />
              <ButtonDelete loading={loading} />
            </span>
            <span>
              With custom class
              <br />
              <ButtonDelete loading={loading} className={classes.blue} />
            </span>
            <span>
              Disabled
              <br />
              <ButtonDelete loading={loading} disabled={true} />
            </span>
            <span>
              Custom title and icon
              <br />
              <ButtonDelete text="Añadir elemento" loading={loading} icon={<AddIcon />} />
            </span>
            <span>
              With tooltip
              <br />
              <ButtonDelete loading={loading} tooltip={{ title: 'Add element!', placement: 'top' }} />
            </span>
            <span>
              With action
              <br />
              <ButtonDelete
                loading={loading}
                onClick={() => {
                  alert('clicked');
                }}
              />
            </span>
          </div>
          <hr />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '2rem'
            }}
          >
            <span>
              With notifications
              <NotificationsButton
                counter={1}
                onClick={() => alert('Notifications button clicked!')}
              ></NotificationsButton>
            </span>
            <span>
              With no new notifications
              <NotificationsButton
                counter={0}
                onClick={() => alert('Notifications button clicked!')}
              ></NotificationsButton>
            </span>
            <span>
              With custom class
              <NotificationsButton
                counter={2}
                className={clsx(classes.yellow, classes.greenBell)}
                onClick={() => alert('Notifications button clicked!')}
              ></NotificationsButton>
            </span>
          </div>
          <hr />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '2rem'
            }}
          >
            <ButtonGroup
              defaultOption={1}
              options={[
                { name: 'Action 1', icon: <AddIcon />, action: () => null },
                { name: 'Action 2', action: () => null }
              ]}
            ></ButtonGroup>
          </div>
          <hr />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '2rem'
            }}
          >
            <span>
              Normal
              <Select
                title={'Select'}
                value={selectValue}
                submitted={submitted}
                displayEmpty
                onChange={e => {
                  setSubmitted(false);
                  setSelectValue(e?.target?.value);
                }}
                elements={[
                  { value: 0, name: 'Empty' },
                  { value: 1, name: '1' },
                  { value: 2, name: '2' },
                  { value: 3, name: '3' }
                ]}
              />
            </span>
            <span>
              Required (check null)
              <Select
                title={'Select'}
                value={selectValue}
                displayEmpty
                required
                errorMessage={'Error Message'}
                onChange={e => {
                  setSubmitted(false);
                  setSelectValue(e.target?.value);
                }}
                elements={[
                  { value: 0, name: 'Empty' },
                  { value: 1, name: '1' },
                  { value: 2, name: '2' },
                  { value: 3, name: '3' }
                ]}
              />
            </span>
            <span>
              Required (with error)
              <Select
                title={'Select'}
                value={selectValue || 0}
                submitted={submitted}
                displayEmpty
                required
                error={selectValue < 1 && submitted}
                errorMessage={'Error Message'}
                onChange={e => {
                  setSubmitted(false);
                  setSelectValue(e.target?.value);
                }}
                elements={[
                  { value: 0, name: 'Empty' },
                  { value: 1, name: '1' },
                  { value: 2, name: '2' },
                  { value: 3, name: '3' }
                ]}
              />
            </span>
          </div>
          <hr />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '2rem'
            }}
          >
            <span>
              Common
              <Dropzone
                file={inputs?.documentName}
                onDrop={handleSelectFile}
                onDeleteFile={handleDeleteFile}
                labelDrop={'Drop here your document'}
              />
            </span>
            <span>
              Required
              <Dropzone
                required
                submitted={submitted}
                errorMessage={'Error message'}
                file={inputs?.documentName}
                onDrop={handleSelectFile}
                onDeleteFile={handleDeleteFile}
                labelDrop={'Drop here your document'}
              />
            </span>
          </div>
          <hr />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '2rem'
            }}
          >
            <span>
              Normal:
              <Avatar
                logOutText={'Logout'}
                onLogOut={() => alert('logout!')}
                userName={'Pepito'}
                userThumbnail={null}
                userEmail={'pepito@gmail.com'}
                myAccountText={'My account'}
                onMyAccountClick={() => alert('go to user profile!')}
              />
            </span>
            <span>
              With custom classes:
              <Avatar
                className={clsx(classes.border, classes.toolbar)}
                logOutText={'Logout'}
                onLogOut={() => alert('logout!')}
                userName={'Pepito'}
                userThumbnail={null}
                userEmail={'pepito@gmail.com'}
                myAccountText={'My account'}
                onMyAccountClick={() => alert('go to user profile!')}
              />
            </span>
            <span>
              On click avatar picture:
              <Avatar
                logOutText={'Logout'}
                onLogOut={() => alert('logout!')}
                userName={'Pepito'}
                userThumbnail={null}
                userEmail={'pepito@gmail.com'}
                myAccountText={'My account'}
                onMyAccountClick={() => alert('go to user profile!')}
                onClickAvatarPicture={() => alert('avatar picture clicked!')}
              />
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '2rem'
            }}
          >
            <Tabs
              classNameContent={classes.tabsMinHeight}
              tabs={[
                {
                  name: 'Tab1',
                  icon: <AddIcon />,
                  children: <div>Tab 1</div>
                },
                {
                  name: 'Tab2',
                  icon: <AddIcon />,
                  children: <div>Tab 2</div>
                },
                {
                  name: 'Tab3',
                  icon: <AddIcon />,
                  children: <div>Tab 3</div>
                }
              ]}
            />
          </div>
          <hr />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '2rem'
            }}
          >
            <BooleanIcon condition={true} />
            <BooleanIcon condition={false} />
            <BooleanIcon showOnlyCheck condition={false} />
            <AlertIcon />
            <WarningIcon />
            <InfoIcon />
            <div>
              <span>With tooltip positive:</span>
              <br />
              <BooleanIcon trueText={'Text to display when positive'} condition={true} />
            </div>

            <div>
              <span>With tooltip negative:</span>
              <br />
              <BooleanIcon falseText={'Text to display when negative'} condition={false} />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '2rem'
            }}
          >
            <Button onClick={() => errorToaster('Error!', 'This is an error toast')}>Error!</Button>
            <Button onClick={() => errorToaster('Multiline Error!', ['This is a', 'multi line', 'error toast.'])}>
              Multiline Error!
            </Button>
            <Button onClick={() => successToaster('Success!')}>Success!</Button>
            <Button onClick={() => successToaster('Success!', 'This is success toast with detail')}>
              Success with detail!
            </Button>
            <Button onClick={() => successToaster('Success!', null, null, classes.customInfoSummary)}>
              Success with className!
            </Button>
            <Button onClick={() => errorToaster('Error', null, null, classes.customInfoSummary)}>
              Error with className
            </Button>
            <Button onClick={() => infoToaster('Info')}>Info!</Button>
            <Button onClick={() => warningToaster('Warning!')}>Warning!</Button>
          </div>
          <div
            style={{
              margin: '2rem'
            }}
          >
            <br />
            <SuccessSummary text={'This is a success summary'} />
            <br />
            <ErrorSummary text={'This is a error summary'} />
            <br />
            <WarningSummary text={'This is a warning summary'} />
            <br />
            <InfoSummary text={'This is a info summary'} />
            <br />
            <InfoSummary className={classes.customInfoSummary} text={'This is a info summary with custom class'} />
            <br />
            <ErrorSummary
              text={'This is a error summary With detail'}
              detail={['This is a detail', 'This is another detail', 'And another one']}
            />
          </div>
          <hr />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '2rem'
            }}
          >
            <Button onClick={() => setOpenModal(true)}>This opens a dialog</Button>
            <Button
              onClick={async () => {
                await execAwaitedModal({
                  title: 'Title',
                  description: 'description',
                  buttonsFn: (reject, resolve) => [
                    {
                      children: <CloseIcon />,
                      type: 'secondary',
                      text: 'decline',
                      onClick: () => {
                        reject();
                      }
                    },
                    {
                      children: <DoneIcon />,
                      type: 'primary',
                      text: 'approve',
                      onClick: () => {
                        resolve();
                      }
                    }
                  ],
                  children: <>Random children text</>,
                  idGenerated: 'merengue'
                });
                alert('The modal has ben closed!');
              }}
            >
              This opens an awaited dialog
            </Button>

            <Button onClick={() => setOpenModalWithChildren(true)}>This opens a dialog with React.Node child</Button>

            <DialogModal
              maxWidth={'xl'}
              fullWidth
              title={'Modal'}
              buttons={[
                {
                  children: <CloseIcon />,
                  text: 'Close',
                  type: 'secondary',
                  onClick: () => setOpenModal(false)
                },
                {
                  children: <CloseIcon />,
                  text: 'Accept',
                  type: 'primary',
                  onClick: () => setOpenModal(false),
                  loading: loading
                }
              ]}
              isOpen={openModal}
              onClose={() => setOpenModal(false)}
            >
              <Button onClick={() => errorToaster('Error!')}>Throw error</Button>
            </DialogModal>
            <DialogModal
              maxWidth={'xl'}
              fullWidth
              title={'Modal With children'}
              isOpen={openModalWithChildren}
              onClose={() => setOpenModalWithChildren(false)}
              buttons={[
                {
                  children: <CloseIcon />,
                  text: 'Close',
                  type: 'secondary',
                  onClick: () => setOpenModalWithChildren(false)
                },
                {
                  children: <CloseIcon />,
                  text: 'Accept',
                  type: 'primary',
                  onClick: () => setOpenModalWithChildren(false),
                  loading: loading
                }
              ]}
            >
              <Form style={{ marginBottom: '1rem' }}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <AsyncInputAutocomplete label={'AsyncInput'} />
                  </Grid>
                  <Grid item xs={6}>
                    <Input />
                  </Grid>
                  <Grid item xs={6}>
                    <Select
                      title={'Mi select test es muy largo xD'}
                      value={selectValue}
                      elements={[
                        { value: 1, name: '1' },
                        { value: 2, name: '2' },
                        { value: 3, name: '3' }
                      ]}
                      submitted={submitted}
                      // displayEmpty
                      required
                      error={selectValue < 1 && submitted}
                      errorMessage={'Error Message'}
                      onChange={e => {
                        setSubmitted(false);
                        setSelectValue(e.target?.value);
                      }}
                    />
                  </Grid>
                </Grid>
              </Form>
            </DialogModal>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '2rem'
            }}
          >
            <Button onClick={() => setChapterMode(prevSt => !prevSt)}>Cambio</Button>
            <ButtonMulti
              text={'Manage columns'}
              actions={columnMapperForButton}
              keepOpenAfterSelect={true}
              onClickAway={() => saveTableConfig(customColumns.map(cc => cc.id))}
            />
          </div>
          <div
            style={{
              margin: '2rem'
            }}
          >
            {!chapterMode && (
              <ViewTable
                rows={rows}
                cells={customColumns}
                defaultOrderBy={{ property: 'amount', direction: 'asc' }}
                disableOrderBy={true}
                onFetchData={getReceivedInvoiceLines}
                checkRowWhen={element => element.canBeDeleted}
                checkRowDisabledReason={'disabled'}
                emptyText={'no results!'}
                nextIconButtonText={'nexttt'}
                dateFormat="DD/MM/YYYY"
                allowRowChecking={false}
              />
            )}
            {chapterMode && (
              <ViewTable
                rows={rowsChapter}
                cells={customColumns}
                defaultOrderBy={{ property: 'amount', direction: 'asc' }}
                disableOrderBy={true}
                allowRowToggling={true}
                isToggled={isToggled}
                isVisible={isVisible}
                onToggleElement={onToggleElement}
                onFetchData={getReceivedInvoiceLinesChapter}
                checkRowWhen={element => element.canBeDeleted}
                checkRowDisabledReason={'disabled'}
                // allowRowChecking={false}
                // onCheckElement={onCheckElement}
                // onCheckAllElements={onCheckAllElements}
                // checkedElements={checkedElements}
                emptyText={'no results!'}
                nextIconButtonText={'nexttt'}
                dateFormat="DD/MM/YYYY"
                // numberRowsPerPage={5}
                // rowPerPageOptions={[]}
              />
            )}
          </div>
        </Form>
      </MuiPickersUtilsProvider>
    </>
  );
}
