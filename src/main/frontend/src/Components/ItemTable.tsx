import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box, Button, Container, TextField } from '@mui/material'
import axios from 'axios'
import { parse } from 'path'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { DEFAULT_LOCALE } from '@mui/x-date-pickers/locales'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

const GETALL_TOKEN_URL = "http://localhost:8080/getall"
const CREATE_TOKEN_URL = "http://localhost:8080/create"
const DELETE_TOKEN_URL = "http://localhost:8080/delete"

interface Item {
  itemId: string
  userId: string
  title: string
  time: string
  description: string
  importance: string
  completed: boolean
}

const ItemTable = (props: any) => {
  const [items, setItems] = useState<Item[]>([])

  const [itemID, setItemID] = useState('')
  const [userID, setUserID] = useState('')
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')
  const [description, setDescription] = useState('')
  const [importance, setImportance] = useState('')

  var token = ''

  useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    if (userToken) {
      const parsedToken = JSON.parse(userToken)
      if (parsedToken.userId) {
        token = parsedToken.userId
        setUserID(parsedToken.userId)
      }
    }
  }, [])

  useEffect(() => {
    axios.post(GETALL_TOKEN_URL, { userId: token })
      .then(res => setItems(res.data))
      .catch(err => console.log(err))
  }, [])

  function create(e: any) {
    e.preventDefault()

    const itemToCreate = {
      userID: userID,
      title: title,
      time: time,
      description: description,
      importance: importance
    }

    axios.post(CREATE_TOKEN_URL, itemToCreate)
      .then(res => {
        console.log(res)
        axios.post(GETALL_TOKEN_URL, { userId: userID })
          .then(res => setItems(res.data))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  function del(e: any) {
    axios.post(DELETE_TOKEN_URL, { userId: e })
      .then(res => {
        console.log(res)
        axios.post(GETALL_TOKEN_URL, { userId: userID })
          .then(res => setItems(res.data))
          .catch(err => {console.log(err)
              setItems([])
          })
      })
      .catch(err => console.log(err))
  }

  return (
    <Container>
      <form onSubmit={create}>
        <Box>
          <TextField label='Title' onChange={e => setTitle(e.target.value)} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker label="Time" defaultValue={dayjs()} onChange={(e) => setTime(e!.format('YYYY-MM-DDTHH:mm:ss'))} />
          </LocalizationProvider>
          <TextField label='Description' onChange={e => setDescription(e.target.value)} />
          <TextField label='Importance' onChange={e => setImportance(e.target.value)} />
        </Box>
        <Box>
          <Button type='submit' variant='contained'>Create</Button>
        </Box>
      </form>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Importance</TableCell>
              <TableCell align="right">Completed</TableCell>
              <TableCell align="right">Delete</TableCell>
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
                <TableCell align="right"><Button onClick={() => del(item.itemId)}>Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default ItemTable