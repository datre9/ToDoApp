import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import axios from 'axios'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import './MainPage.css';
import todoLogo from '../images/todo-logo.png';
import { format } from 'date-fns'; 


const GETALL_TOKEN_URL = "http://localhost:8080/getall"
const CREATE_TOKEN_URL = "http://localhost:8080/create"
const DELETE_TOKEN_URL = "http://localhost:8080/delete"
const EDIT_TOKEN_URL = "http://localhost:8080/edit"
const COMPLETE_TOKEN_URL = "http://localhost:8080/complete"

interface Item {
  itemId: string
  userId: string
  title: string
  time: string
  description: string
  importance: string
  completed: boolean
}

const MainPage = (props: any) => {

  function logout(e: any) {
    props.setUserToken("");
  }
  const [currentTime, setCurrentTime] = useState(new Date()); 


  const [items, setItems] = useState<Item[]>([])

  const [itemID, setItemID] = useState('')
  const [userID, setUserID] = useState('')
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')
  const [description, setDescription] = useState('')
  const [importance, setImportance] = useState('')

  const [editOpen, setEditOpen] = useState(false)
  const [selectedItemID, setSelectedItemID] = useState('')
  const [selectedUserID, setSelectedUserID] = useState('')
  const [selectedTitle, setSelectedTitle] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedDescription, setSelectedDescription] = useState('')
  const [selectedImportance, setSelectedImportance] = useState('')

  var token = ''

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date()); 
    }, 1000);

    return () => clearInterval(timerId);  
  }, []);

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
          .catch(err => {
            console.log(err)
            setItems([])
          })
      })
      .catch(err => console.log(err))
  }

  const handleEditOpen = (e: any) => {
    setSelectedItemID(e.itemId)
    setSelectedUserID(e.userId)
    setSelectedTitle(e.title)
    setSelectedTime(e.time)
    setSelectedDescription(e.description)
    setSelectedImportance(e.importance)
    setEditOpen(true)
  }

  const handleEditClose = () => {
    setEditOpen(false)
    setSelectedItemID('')
    setSelectedUserID('')
    setSelectedTitle('')
    setSelectedTime('')
    setSelectedDescription('')
    setSelectedImportance('')
  }

  const handleSaveChanges = () => {
    const itemToEdit = {
      itemID: selectedItemID,
      userID: selectedUserID,
      title: selectedTitle,
      time: selectedTime,
      description: selectedDescription,
      importance: selectedImportance
    }
  
    axios.post(EDIT_TOKEN_URL, itemToEdit)
      .then(res => {
        axios.post(GETALL_TOKEN_URL, { userId: userID })
          .then(res => {
            setItems(res.data)
            handleEditClose()
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  function toggleCompleted(e: Item) {
    const itemToComplete = {
      itemID: e.itemId,
      completed: !e.completed
    }
  
    axios.post(COMPLETE_TOKEN_URL, itemToComplete)
      .then(res => {
        axios.post(GETALL_TOKEN_URL, { userId: userID })
          .then(res => {
            setItems(res.data)
            handleEditClose()
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }
  const importanceColor = (importance: string) => {
    switch (importance) {
      case 'CRITICAL': return '#ffcccc';
      case 'IMPORTANT': return '#ffecd9';
      case 'UNIMPORTANT': return '#ffffe0';
      default: return 'none';
    }
  };


  return (

        <Container maxWidth={false}>
          <div>
              <header className="header" >
  <div className="logo-container">
    <img src={todoLogo} alt="ToDo Logo" className="logo" />
  </div>
  <div className="header-title">ToDo App</div>
  <div className="user-info">
    <div className="time-display">{format(currentTime, 'PPpp')}</div>
    <div className="hello">Hello {props.user.username}</div>
    <Button onClick={logout}>
      Log Out
    </Button>
  </div>
</header>

    </div>
    <form onSubmit={create}>
  <Box sx={{ width: '100%', textAlign: 'center'}}>
    <TextField 
      label='Title' 
      onChange={e => setTitle(e.target.value)} 
      sx={{ margin: '8px' }}
    />
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="Time"
        defaultValue={dayjs()}
        onChange={(e) => setTime(e ? e.format('YYYY-MM-DDTHH:mm:ss') : '')}
        sx={{ margin: '8px' }}
      />
    </LocalizationProvider>
    <TextField 
      label='Description' 
      onChange={e => setDescription(e.target.value)} 
      sx={{ margin: '8px' }}
    />
    <Select 
      defaultValue={'IMPORTANT'} 
      onChange={e => setImportance(e.target.value as string)}
      sx={{ margin: '8px', minWidth: 140 }}
    >
      <MenuItem value={'UNIMPORTANT'}>Unimportant</MenuItem>
      <MenuItem value={'IMPORTANT'}>Important</MenuItem>
      <MenuItem value={'CRITICAL'}>Critical</MenuItem>
    </Select>
    <Button 
      type='submit' 
      variant='contained' 
      sx={{ height: 56, margin: '8px' }}
    >
      Create
    </Button>
  </Box>
</form>



        <TableContainer component={Paper}sx={{
  border: '2px solid #f5f5f5',
  background: 'linear-gradient(to bottom, #ffffff, #f5f5f5)'}}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
  <TableRow sx={{  borderBottom: '2px solid #e0e0e0' }}>
    <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Time</TableCell>
    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Description</TableCell>
    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Importance</TableCell>
    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Completed</TableCell>
    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Delete</TableCell>
    <TableCell align="right" sx={{ fontWeight: 'bold', paddingRight:'20px'}}>Edit</TableCell>
  </TableRow>
</TableHead>

<TableBody>
  {items.map((item) => (
    <TableRow key={item.itemId} sx={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
      <TableCell>{item.title}</TableCell>
      <TableCell align="right">{item.time}</TableCell>
      <TableCell align="right">{item.description}</TableCell>
      <TableCell align="right">{item.importance}</TableCell>
      <TableCell align="right">
        <Button onClick={() => toggleCompleted(item)}>
          {item.completed ? "Yes" : "No"}
        </Button>
      </TableCell>
      <TableCell align="right">
        <Button onClick={() => del(item.itemId)}>Delete</Button>
      </TableCell>
      <TableCell align="right" sx={{ paddingRight: '0px' }}>
        <Button onClick={() => handleEditOpen(item)}>Edit</Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

          </Table>
        </TableContainer>
        <Dialog open={editOpen} onClose={handleEditClose}>
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>
            <TextField label='Title' value={selectedTitle} onChange={e => setSelectedTitle(e.target.value)} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker label="Time" value={dayjs(selectedTime)} defaultValue={dayjs()} onChange={(e) => setSelectedTime(e!.format('YYYY-MM-DDTHH:mm:ss'))} />
            </LocalizationProvider>
            <TextField label='Description' value={selectedDescription} onChange={e => setSelectedDescription(e.target.value)} />
            <Select sx={{ minWidth: 140 }} value={selectedImportance} label="Importance" onChange={e => setSelectedImportance(e.target.value as string)}>
              <MenuItem value={'UNIMPORTANT'}>Unimportant</MenuItem>
              <MenuItem value={'IMPORTANT'}>Important</MenuItem>
              <MenuItem value={'CRITICAL'}>Critical</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSaveChanges}>Save</Button>
            <Button onClick={handleEditClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Container>
  )
}

export default MainPage

