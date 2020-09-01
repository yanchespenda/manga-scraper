import { Fragment } from 'react';
import { IListSupport } from '../../../../interfaces/components/ListSupport';

/* Material-UI Core */
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

/* Material-UI Icon */
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';


import PartStyle from '../../../../styles/components/parts/ListSupport.module.scss'


const ListSupport = ({ sites }: IListSupport) => {


    return (
        <Fragment>
            <TableContainer component={Paper}>
                <Table /* className={classes.table} */ aria-label="List support table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={PartStyle.tableHeadA}>Website</TableCell>
                            <TableCell className={PartStyle.tableHeadB} align="center">Site Id</TableCell>
                            <TableCell className={PartStyle.tableHeadC} align="center">Manga Id</TableCell>
                            <TableCell className={PartStyle.tableHeadC} align="center">Chapter Id</TableCell>
                            <TableCell className={PartStyle.tableHeadC} align="center">Images</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        sites?.map((row, idx) => (
                            <TableRow key={ idx }>
                                <TableCell component="th" scope="row">
                                    {row.website}
                                </TableCell>
                                <TableCell align="center">{row.siteId}</TableCell>
                                <TableCell align="center">{row.mangaId ? (<DoneIcon />) : (<ClearIcon />)}</TableCell>
                                <TableCell align="center">{row.chapterId ? (<DoneIcon />) : (<ClearIcon />)}</TableCell>
                                <TableCell align="center">{row.images ? (<DoneIcon />) : (<ClearIcon />)}</TableCell>
                            </TableRow>
                        ))
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    )
}

export default ListSupport
