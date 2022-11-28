import * as React from 'react';
import Button from '@mui/joy/Button';
import TextField from '@mui/joy/TextField';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Typography from '@mui/joy/Typography';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import { DataGrid, GridToolbar,GridActionsCellItem } from '@mui/x-data-grid';


export default function BasicModalDialog(addingUser) {
  const [open, setOpen] = React.useState(false);
  const [Fname, setFname] = React.useState('');
  const [Lname, setLname] = React.useState('');
  const [email, setEmail] = React.useState('');
 
 


  return (
    <React.Fragment>
      <Button className='add'
        color="neutral"
        onClick={() => setOpen(true)}
      >
        <GridActionsCellItem icon={<PersonAddAltIcon style={{'font-size':'40px'}}/>} label="Delete" style={{color:'white'}}/>
      </Button>
      <Modal className="popout" sx={{ transition:  '300ms ease-in'}} open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            background:'#20293A',
            boxShadow: 'lg',
            color:'white'
          }}
        >
          <Typography
            id="basic-modal-dialog-title"
            component="h2"
            level="inherit"
            fontSize="1.25em"
            mb="0.25em"
          >
            Add new User
          </Typography>
          <Typography
            id="basic-modal-dialog-description"
            mt={0.5}
            mb={2}
            textColor="text.tertiary"
          >
            Fill in the information of the User.
          </Typography>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
              console.log(addingUser)
              addingUser.addingUser(Fname,Lname,email)
            }}
          >
            <Stack spacing={2}>
              <TextField label="Fname" name='Fname' onChange = {(event)=>setFname(event.target.value)} autoFocus required />
              <TextField label="Lname" name='Lname' onChange = {(event)=>setLname(event.target.value)}required />
              <TextField label="email"   name='email' onChange = {(event)=>setEmail(event.target.value)}type="email" required />
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}