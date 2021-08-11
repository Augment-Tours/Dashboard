/* eslint-disable camelcase */
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
// import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  IconButton,
  TableRow,
  TableBody,
  TableCell,
  TextField,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Drawer
} from '@material-ui/core';
// components
import Page from '../components/Page';
// import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
// import ARMODELLIST from '../_mocks_/user';
import { getAllArModels, createArModel } from './request/armodel';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Model Name', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'model', label: 'Model', alignRight: false },
  { id: 'x_location', label: 'X-Location', alignRight: false },
  { id: 'y_location', label: 'Y-Location', alignRight: false },
  { id: 'floor', label: 'Floor', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ArModel() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [arModelList, setArModelList] = useState([]);

  const [modelName, setModelName] = useState('');
  const [modelDescription, setModelDescription] = useState('');
  const [modelUrl, setModelURL] = useState('');
  const [modelXLocation, setXLocation] = useState('');
  const [modelYLocation, setYLocation] = useState('');
  const [modelFloor, setFloor] = useState('');
  const [xScale, setXScale] = useState(0);
  const [yScale, setYScale] = useState(0);
  const [zScale, setZScale] = useState(0);
  const [museumId, setMuseumId] = useState('');

  useEffect(() => {
    const arModelList = getAllArModels(1)
      .then((res) => {
        console.log(res);
        if (Array.isArray(res)) {
          setArModelList(res);
        }
      })
      .catch((err) => console.log(err));

    console.log(arModelList);
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = arModelList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - arModelList.length) : 0;

  const filteredModels = applySortFilter(arModelList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredModels.length === 0;

  const toggleDrawer = () => {
    setIsOpenFilter(!isOpenFilter);
  };

  return (
    <Page title="AR Models | Augment-Tours">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            AR Model
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={toggleDrawer}
            startIcon={<Icon icon={plusFill} />}
          >
            New AR Model
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={arModelList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredModels
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, description, x_location, y_location, floor, model } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell>
                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="left">{description}</TableCell>
                          <TableCell align="left">
                            <a href={model}>Link</a>
                          </TableCell>
                          <TableCell align="left">{x_location}</TableCell>
                          <TableCell align="left">{y_location}</TableCell>
                          <TableCell align="left">{floor}</TableCell>
                          <TableCell align="right">
                            <UserMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={arModelList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <Drawer
          anchor="right"
          open={isOpenFilter}
          onClose={() => {}}
          PaperProps={{
            sx: { width: 400, border: 'none', overflow: 'hidden', padding: '20px 20px' }
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 1, py: 2 }}
          >
            <Typography variant="subtitle1" sx={{ ml: 1 }}>
              Add AR Model
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <Icon icon={closeFill} width={20} height={20} />
            </IconButton>
          </Stack>
          <TextField
            fullWidth
            label="Model Name"
            onChange={(e) => {
              setModelName(e.target.value);
            }}
            style={{ marginBottom: '15px' }}
          />
          <TextField
            fullWidth
            label="Model Description"
            onChange={(e) => {
              setModelDescription(e.target.value);
            }}
            style={{ marginBottom: '15px' }}
          />
          <TextField
            fullWidth
            label="Model URL"
            onChange={(e) => {
              setModelURL(e.target.value);
            }}
            style={{ marginBottom: '15px' }}
          />

          <TextField
            fullWidth
            label="Museum Id"
            onChange={(e) => {
              setMuseumId(e.target.value);
            }}
            style={{ marginBottom: '15px' }}
          />
          <TextField
            fullWidth
            label="Model X-Location"
            onChange={(e) => {
              setXLocation(e.target.value);
            }}
            style={{ marginBottom: '15px' }}
          />
          <TextField
            fullWidth
            label="Model Y-Location"
            onChange={(e) => {
              setYLocation(e.target.value);
            }}
            style={{ marginBottom: '15px' }}
          />
          <TextField
            fullWidth
            label="Model X-Scale"
            onChange={(e) => {
              setXScale(e.target.value);
            }}
            style={{ marginBottom: '15px' }}
          />
          <TextField
            fullWidth
            label="Model Y-Scale"
            onChange={(e) => {
              setYScale(e.target.value);
            }}
            style={{ marginBottom: '15px' }}
          />
          <TextField
            fullWidth
            label="Model Z-Scale"
            onChange={(e) => {
              setZScale(e.target.value);
            }}
            style={{ marginBottom: '15px' }}
          />
          <TextField
            fullWidth
            label="Model Floor"
            onChange={(e) => {
              setFloor(e.target.value);
            }}
            style={{ marginBottom: '15px' }}
          />
          {/* <Button variant="contained" component="label" style={{ marginBottom: '40px' }}>
            Upload File
            <input type="file" hidden />
          </Button> */}

          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={() => {
              createArModel(
                modelName,
                modelDescription,
                modelUrl,
                modelXLocation,
                modelYLocation,
                xScale,
                yScale,
                zScale,
                modelFloor,
                museumId
              )
                .then((res) => {
                  console.log(res);
                  setIsOpenFilter(false);
                })
                .catch((e) => console.log(e));
            }}
          >
            Save
          </Button>
        </Drawer>
      </Container>
    </Page>
  );
}
