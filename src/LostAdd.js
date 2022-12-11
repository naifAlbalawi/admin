import * as React from 'react';
import Button from '@mui/joy/Button';
import TextField from '@mui/joy/TextField';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Autocomplete from '@mui/joy/Autocomplete';
import Typography from '@mui/joy/Typography';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DataGrid, GridToolbar,GridActionsCellItem } from '@mui/x-data-grid';






export default function BasicModalDialog(addingFound) {
  const [open, setOpen] = React.useState(false);
  const [desc, setDesc] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [name, setName] = React.useState('');
  const [user, setUser] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [date, setdate] = React.useState('');
  const [location, setlocation] = React.useState('');
 


  return (
    <React.Fragment>
      <Button className='add'
        color="neutral"
        onClick={() => setOpen(true)}
      >
        <GridActionsCellItem icon={<PostAddIcon style={{'font-size':'40px'}}/>} label="Delete" style={{color:'white'}}/>
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
           
              addingFound.addingFound(
                desc,
                contact,
                false,
                location,
                name,
                date,
                title,
                user,)
            }}
          >
            <Stack spacing={2}>
              <TextField label="user" name='UserID' placeholder='XW828wh2HSJN' onChange = {(event)=>setUser(event.target.value)} autoFocus required />
              <TextField label="name" name='name' placeholder='mohammed alkhaldi' onChange = {(event)=>setName(event.target.value)} autoFocus required />
              
              <TextField label="contact" name='contact' placeholder='prefer way of contact' onChange = {(event)=>setContact(event.target.value)}required />
              
              <TextField label="title" placeholder='note9'  name='title' onChange = {(event)=>setTitle(event.target.value)} type="textarea" required />
              
              <TextField label="desc" placeholder='green cover with a broken tie'  name='description' onChange = {(event)=>setDesc(event.target.value)} type="textarea" required />
              <TextField label="locaiton" placeholder='building 63'  name='location' onChange = {(event)=>setlocation(event.target.value)} type="Text" required />
              
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}