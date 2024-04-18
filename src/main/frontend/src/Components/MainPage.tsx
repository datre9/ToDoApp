import { Button } from '@mui/material'

const MainPage = (props: any) => {

  function logout(e: any) {
    props.setUserToken("");
  }

  return (
    <div>
      Hello {props.user.username}
      <Button variant='contained' type='submit' onClick={logout}>
        Log Out
      </Button>
    </div>
  )
}

export default MainPage