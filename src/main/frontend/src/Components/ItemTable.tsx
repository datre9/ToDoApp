import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box, Button, Container } from '@mui/material'
import axios from 'axios'

const ITEMS_TOKEN_URL = "http://localhost:8080/getall";

interface Item {
  itemId: string;
  userId: string;
  title: string;
  time: string;
  description: string;
  importance: string;
  completed: boolean;
}

const ItemTable = () => {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      const parsedToken = JSON.parse(userToken);
      if (parsedToken.userId) {
        axios.post(ITEMS_TOKEN_URL, { userId: parsedToken.userId })
          .then(res => setItems(res.data))
          .catch(err => console.log(err))
      }
    }
  }, [])

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Importance</TableCell>
              <TableCell align="right">Completed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.itemId}>
                <TableCell>{item.title}</TableCell>
                <TableCell align="right">{item.time.toString().replace('T', " ")}</TableCell>
                <TableCell align="right">{item.description}</TableCell>
                <TableCell align="right">{item.importance}</TableCell>
                <TableCell align="right">{item.completed ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default ItemTable