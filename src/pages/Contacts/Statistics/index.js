import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { styled } from '@material-ui/core/styles';
import { compose, spacing, palette } from '@material-ui/system';
import { NATIONALITIES_HUMAN_NAME } from '../../../constants/nationality';

const Box = styled('div')(compose(spacing, palette));


const useStyles = makeStyles((theme) =>
  createStyles({
    statisticsContainer: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3)
    },
    table: {
      width: "50%",
    },
    mb: {
      marginBottom: "10px"
    },
    ml: {
      marginLeft: "15px"
    },
    nationalityContainer: {
      "& > * ": {
        marginRight: theme.spacing(2)
      }
    }
  })
);



export const Statistics = ({ data }) => {
  const classes = useStyles();
  const maleSize = data.filter(c => c.gender === "male").length;
  const femaleSize = data.filter(c => c.gender === "female").length;
  const indeterminateSize = data.filter(c => c.gender === "indeterminate").length
  const message = () => {
    if (maleSize === femaleSize) return "Man equal Women";
    return maleSize > femaleSize ? "Men predominate" : "Women predominate";
  }
  const nationalityStat = data.reduce((acc, item) => {
    acc[item.nat] = (acc[item.nat] || 0) + 1;
    return acc
  }, {});

  return (
    <Box display="flex" flexdirection="column" className={classes.statisticsContainer}>
      <Typography variant="h6" component="h1" >
        Statistics
       </Typography>
      <TableContainer component={Paper} className={classes.mb} >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Collection size</TableCell>
              <TableCell>Males</TableCell>
              <TableCell >Females</TableCell>
              <TableCell >Indeterminate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow >
              <TableCell >
                {data.length}
              </TableCell>
              <TableCell >
                {maleSize}
              </TableCell>
              <TableCell >
                {femaleSize}
              </TableCell>
              <TableCell >
                {indeterminateSize}
              </TableCell>
            </TableRow>
            <TableRow >
              <TableCell rowSpan={1} />
              <TableCell colSpan={2} align="center">
                <Box bgcolor="warning.main" color="warning.contrastText">
                  {message()}
                </Box>
              </TableCell>
            </TableRow >
          </TableBody>
        </Table>
      </TableContainer>
      <Box className={classes.ml}>
        <Typography variant="overline" display="block" >
          Nationalities
       </Typography>
        <Box variant="overline" className={classes.nationalityContainer} display="block" >
          {Object.entries(nationalityStat).map(([key, value]) => (
              <span key={key}> <strong>{NATIONALITIES_HUMAN_NAME[key]}</strong>: {value} {value>1?"contacts":"contact"}</span>
          ))}
        </Box>
      </Box>

    </Box>
  )
}
