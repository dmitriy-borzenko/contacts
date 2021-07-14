import React from 'react';
import { useState } from 'react';
import { useContact } from './useContacts';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ContactTable from './ContactTable';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ToggleDataViewMode } from './ToggleDataViewMode';
import { DATA_VIEW_MODES } from '../Contacts/constansts/view_mode';
import { useDataViewMode } from './useDataViewMode';
import { ContactsFilter } from './ContactsFilter'
import ContactGrid from './ContactGrid';
import { Statistics } from './Statistics';
import Pagination from '@material-ui/lab/Pagination';



const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    headContainer: {
      marginBottom: theme.spacing(3)
    },
    filterContainer: {
      marginBottom: theme.spacing(3)
    },
    filterGender: {
      minWidth: 120
    },
    pagination: {
      '& > *': {
        marginBottom: theme.spacing(3),
      }
    }
  })
);

const FiltersDefaultValue = {
  fullname: "",
  gender: "all",
  nationality: "all"
}

const filterByFullname = ({ first, last }, fullname) =>
  first?.toLowerCase().includes(fullname.toLowerCase()) ||
  last?.toLowerCase().includes(fullname.toLowerCase());

const filterByGender = (gender, filterGender) => {
  if (filterGender === "all") { return true; }
  return gender === filterGender;
}

const filterByNationality = (value, nationality) => {
  if (nationality === "all") { return true; }
  return value === nationality;
}



export const Contacts = () => {
  const classes = useStyles();

  const { data, isError, isLoading, isRefresh, setIsRefresh } = useContact();
  const [dataViewMode, setdataViewMode] = useDataViewMode();
  const [filters, setFilters] = useState(FiltersDefaultValue);

  const [currentPage, setCurrentPage] = useState(1);
  const [contactPerPage,] = useState(5);
  const indexOfLastContact = currentPage * contactPerPage;
  const indexOfFirstContact = indexOfLastContact - contactPerPage;

  const updateFilter = (name, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }))
  };

  const filteredContacts = data
    .filter((c) => filterByFullname(c.name, filters.fullname))
    .filter((c) => filterByGender(c.gender, filters.gender))
    .filter((c) => filterByNationality(c.nat, filters.nationality))

  const clearFilters = () => {
    setFilters(FiltersDefaultValue);
  }

  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item xs={12} className={classes.headContainer}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4" component="h1">
              Contacts
            </Typography>
            <ToggleDataViewMode
              dataViewMode={dataViewMode}
              setdataViewMode={setdataViewMode}
              setIsRefresh={setIsRefresh}
              isRefresh={isRefresh}
            />
          </Box>
        </Grid>
        <Grid item xs={12} className={classes.filterContainer}>
          <ContactsFilter filters={filters} updateFilter={updateFilter} clearFilters={clearFilters} />
        </Grid>
        <Grid item xs={12}>
          {(() => {
            if (isLoading) {
              return <CircularProgress />
            };
            if (isError) {
              return <div>...error</div>
            };
            if (dataViewMode === DATA_VIEW_MODES.TABLE) {
              return <ContactTable data={filteredContacts.slice(indexOfFirstContact, indexOfLastContact)} />
            }
            if (dataViewMode === DATA_VIEW_MODES.GRID) {
              return <ContactGrid data={filteredContacts.slice(indexOfFirstContact, indexOfLastContact)} />;
            }
            return null
          })()}
        </Grid>
        <Statistics data={data} />
      </Grid>
      <Box display="flex" justifyContent="flex-end" className={classes.pagination}>
        <Pagination
          count={Math.ceil(filteredContacts.length / contactPerPage)}
          page={currentPage}
          variant="outlined"
          shape="rounded"
          onChange={(e, val) => { setCurrentPage(val); }} />
      </Box>
    </Container>
  )
}
