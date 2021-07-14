import parseIso from 'date-fns/parseISO';
import format from 'date-fns/format';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { CopyToClipBoardText } from '../../../components/CopyToClipBoardText';
import { NATIONALITIES_HUMAN_NAME } from '../../../constants/nationality';


const ContactTable = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Fullname</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center">Nationality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.cell}>
              <TableCell >
                <Avatar alt="" src={row.picture.thumbnail} />
              </TableCell>
              <TableCell ><Typography color="primary">{row.name.title} {row.name.first} {row.name.last}</Typography></TableCell>
              <TableCell >
                <Typography >{format(parseIso(row.dob.date), 'eeee, MM/dd/yyyy')}</Typography>
                <Typography>{row.dob.age} years</Typography>
              </TableCell>
              <TableCell><CopyToClipBoardText text={row.phone} /></TableCell>
              <TableCell ><CopyToClipBoardText text={row.email} /></TableCell>
              <TableCell align="center" >
                <Typography>
                  /{row.location.country}/
                </Typography>
                <Typography>
                  {row.location.city}, {row.location.street.name}{" "}
                  {row.location.street.number}{" "}
                </Typography>
              </TableCell>
              <TableCell align="center">{NATIONALITIES_HUMAN_NAME[row.nat]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ContactTable
