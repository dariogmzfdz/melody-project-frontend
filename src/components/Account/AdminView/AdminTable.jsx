import {  Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Table } from "react-bootstrap";
import "./AdminTable.css";
import useSortableData from "./useSortableData";
import DeleteIcon from "@mui/icons-material/Delete";
import AppBar from '../../AppBar/AppBar'
import axios from "axios";


export const UsersTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.products);
  
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const token = localStorage.getItem("userToken");

  const adminUserDelete = async (id) => {
console.log(id)
    try {
      const data = await axios.delete(`https://melodystream.herokuapp.com/admin/users/${id}`,
      {
        headers: {
          auth_token: token,
        },
      }
    ); const response = await data.json();

  } 

  catch (error){ 
    (console.log (error))
   }
  }
  return (
    <>
    <AppBar/>
    <TableContainer component={Paper}>
      <Table className="tableAdmin">
        <TableHead>
          <TableRow>
              <TableCell
                type="button"
                onClick={() => requestSort("name")}
                className={getClassNamesFor("name")}
              >
                Name
              </TableCell>

              <TableCell
                type="button"
                onClick={() => requestSort("lastName")}
              >
                Last Name
              </TableCell>

              <TableCell
                type="button"
                onClick={() => requestSort("email")}
                className={getClassNamesFor("email")}
                id="email"
              >
                Email
              </TableCell>
          
              <TableCell type="button" className={getClassNamesFor("password")}>
                Gender
              </TableCell>
         
              <TableCell type="button" className={getClassNamesFor("password")}>
                Birthday
              </TableCell>
           
              <TableCell id='password' type="button" className={getClassNamesFor("password")}>
                Password
              </TableCell>
          
              {/* <TableCell type="button" className={getClassNamesFor("password")}>
                Last update
              </TableCell> */}
       <TableCell>Action</TableCell>
        </TableRow>
        </TableHead>

        <TableBody  className="table-content">
          {items.map((item) => (
            <TableRow  key={item.id} >
              <TableCell >{item.name}</TableCell>
              <TableCell >{item.lastName}</TableCell>
              <TableCell >{item.email}</TableCell>
              <TableCell >{item.gender}</TableCell>
              <TableCell >{item.birthday}</TableCell>
              <TableCell >{item.password}</TableCell>
              {/* <TableCell >{item.updateAt}</TableCell> */}
              <TableCell className="butDel"><DeleteIcon className='butDelete' onClick={ () => adminUserDelete(item._id)}/></TableCell>

            
            </TableRow>
          ))}
        </TableBody>
        </Table>
    </TableContainer>
    </>
  );
};
