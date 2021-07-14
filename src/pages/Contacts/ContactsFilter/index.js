import React from 'react'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ClearIcon from '@material-ui/icons/Clear';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { NATIONALITIES_HUMAN_NAME } from '../../../constants/nationality';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) =>
  createStyles({
    fieldsContainer: {
      "& > *:not(:last-child)": {
        marginRight: theme.spacing(2)
      }
    },
    filterGender: {
      minWidth: 120
    },
    filterNationality: {
      minWidth: 140
    }
  })
);

export const ContactsFilter = ({ filters, updateFilter, clearFilters }) => {
  const classes = useStyles();
  const handleChangeFilter = (event) => {
    updateFilter(event.target.name, event.target.value);
  }
  return (
    <Box display="flex" justifyContent="space-between" >
      <Box display="flex" className={classes.fieldsContainer}>
        <TextField
          name="fullname"
          label="Fullname"
          variant="outlined"
          size="small"
          value={filters.fullname}
          onChange={handleChangeFilter}
          placeholder="Search by fullname"
        />

        <FormControl variant="outlined" size="small" className={classes.filterGender}>
          <InputLabel id="gender">Gender</InputLabel>
          <Select
            labelId="gender"
            value={filters.gender}
            onChange={handleChangeFilter}
            label="Gender"
            name="gender"
          >
            <MenuItem value="all">
              All
        </MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" size="small" className={classes.filterNationality}>
          <InputLabel id="nationality">Nationality</InputLabel>
          <Select
            labelId="nationality"
            value={filters.nationality}
            onChange={handleChangeFilter}
            label="nationality"
            name="nationality"
          >
            <MenuItem value="all">
              All
        </MenuItem>
            {Object.entries(NATIONALITIES_HUMAN_NAME).map(([key, name]) => (
              <MenuItem value={key} key={key}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button
        size="small"
        startIcon={<ClearIcon />}
        className={classes.button}
        onClick={clearFilters}
      >
        Clear
      </Button>
    </Box>
  )
}
