import React,{useState,useEffect, useRef} from 'react';
import Box from '@mui/material/Box';
import { getAuth, createUserWithEmailAndPassword,updateEmail,signInWithEmailAndPassword } from "firebase/auth";
import { DataGrid,GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import BasicModal from './UserAdd'
import {db} from './firebase-config'
import { collection, getDocs,getDoc,addDoc,setDoc,updateDoc,deleteDoc,doc} from "firebase/firestore";
import './TableM.css'


function TableUsers() {
    const [Users,setUsers] = useState([])
    const [pageSize,setpageSize] = useState(10)
    const [update,setUpdate] = useState(true)
    const saveButton = useRef(null);
    useEffect(()=> {
        getDocs(collection(db, "Users"))
        .then((data)=>{ 
          const NewState = [];
          data.forEach((doc) => {
          NewState.push({id:doc.id, ...doc.data()})
        
      })
      console.log(NewState)
          setUsers(NewState)
          setUpdate(false)
      
      })},[update]);
  
      function deleteUser (user) {
        deleteDoc(doc(db,'Users',user))
        setUpdate(true)
      }
      function addingUser(Fname,Lname,email,password) {
        
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password).then((pr)=>{
          console.log(pr.user)

          setDoc(doc(db,'Users',pr.user.uid),
        {
          Fname:Fname,
          Lname:Lname,
          email:email
        })
        
        }).catch((error)=>{
          if(error.code==="auth/email-already-in-use"){
              alert('email is already used')}
          else {
            alert(error.code)
          }
        }  
        )
        setUpdate(true)
      }


      function updateInfo(user) {
        const auth = getAuth();

  updateDoc(doc(db,'Users',user.id),
        {
          Fname:user.row.Fname,
          Lname:user.row.Lname,
          email:user.row.email
        }
        )
        setUpdate(true)

      ;}

      function sign_in(user){
        const auth = getAuth();
        signInWithEmailAndPassword(auth, user.email, user.password)
         .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
        })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
      }

        

 /* const { data } = useDemoData({
    dataSet: 'Employee',
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });*/

  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(()=>[
   // {field : 'Avatar' , headerName='user',width=90, renderCell: {params} =><AiIcons.AiOutlineUser/> ,sortable:false,filterable:false,editable:false},
    {field:'id',headerName:'id',width:220},
    {field:'Fname',headerName:'First Name',width:100,editable:true},
    {field:'Lname',headerName:'Last Name',width:100,editable:true},
    {field:'email',headerName:'Email',width:200,editable:false},
    {
      field: 'actions',
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem icon={<DeleteIcon/>} onClick={()=> deleteUser(params.id)} label="Delete" style={{color:'white'}}/>,
        <GridActionsCellItem  ref={saveButton}  icon={<SaveIcon/>} onClick={()=> {
          updateInfo(params);
          saveButton.current.style.color='grey';
          saveButton.current.style.curser='not-allowed';

        }} label="save" style={{color:'white',curser:'default'}}/>
      ]
    }

   
    

  ],
  []);

  return (
    <Box sx={{ height: 635, width:725.5 ,color:'white',textAlign:'center' ,margin:'auto'}}>
      <div className='head'>
        <Typography variant='h5' component="h5" sx={{textAlign:'center',mt:3,mb:3,color:'white',display:'inline'}}>
            Manage Users
        </Typography>
        <BasicModal addingUser= {addingUser} className='add'/>
        
        </div>
      <DataGrid className='table' loading={update} columns={columns} rows={Users} getRowId={row=>row.id} sx={{color:'white',textAlign:'center', background:'black ',border:'solid 1px white', 
      '& .MuiDataGrid-row': {
      background: '#121826',
    }, '& .MuiDataGrid-row:hover': {
      background: '#20293A',
    },
    '& 	.MuiTablePagination-root': {
      color: 'white',
    },
    '& .MuiButtonBase-root': {
      color: 'white',
    },
  }} 	 rowsPerPageOptions={[10,10,20]} pageSize={pageSize} onPageSizeChange={(newPageSize)=>setpageSize(newPageSize)}
       onCellEditCommit={(row)=> {
          
          saveButton.current.style.curser='pointer';
          saveButton.current.style.color='white';
          
        }}  />
    
    </Box>
  );
};


 
export default TableUsers;