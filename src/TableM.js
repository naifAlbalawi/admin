import React,{useState,useEffect, useRef} from 'react';
import Box from '@mui/material/Box';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import { DataGrid, GridToolbar,GridActionsCellItem } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import * as AiIcons from 'react-icons/ai'
import SaveIcon from '@mui/icons-material/Save';

import BasicModal from './UserAdd'
import {db} from './firebase-config'
import { collection, getDocs,getDoc,addDoc,updateDoc,deleteDoc,doc} from "firebase/firestore";
import { gridClasses } from '@mui/system';
import { Button } from 'react-admin';
import './TableM.css'


function QuickFilteringGrid() {
    const [Users,setUsers] = useState([])
    const [pageSize,setpageSize] = useState(7)
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
      function addingUser(Fname,Lname,email) {
        addDoc(collection(db,'Users'),
        {
          Fname:Fname,
          Lname:Lname,
          email:email
        })
        setUpdate(true)
      }


      function updateInfo(user) {
        updateDoc(doc(db,'Users',user.id),
        {
          Fname:user.row.Fname,
          Lname:user.row.Lname,
          email:user.row.email
        }
        )
        setUpdate(true)

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
    {field:'email',headerName:'Email',width:200,editable:true},
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
    <Box sx={{ height: 479, width:725.5 ,color:'white',textAlign:'center' ,margin:'auto'}}>
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
    }
  }} 	 rowsPerPageOptions={[7,10,20]} pageSize={pageSize} onPageSizeChange={(newPageSize)=>setpageSize(newPageSize)}
       onCellEditCommit={(row)=> {
          
          saveButton.current.style.curser='pointer';
          saveButton.current.style.color='white';
          
        }}  />
    
    </Box>
  );
};


 
export default QuickFilteringGrid;