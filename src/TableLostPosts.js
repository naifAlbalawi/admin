import React,{useState,useEffect, useRef} from 'react';
import Box from '@mui/material/Box';
import { getAuth, createFoundWithEmailAndPassword } from "firebase/auth";
import { DataGrid,GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import BasicModal from './LostAdd'
import {db} from './firebase-config'
import { collection, getDocs,getDoc,addDoc,updateDoc,deleteDoc,doc, Timestamp} from "firebase/firestore";
import './TableM.css'



function TableLostPosts() {
    const [Posts,setFoundItems] = useState([])
    const [pageSize,setpageSize] = useState(10)
    const [update,setUpdate] = useState(true)
    const saveButton = useRef(null);
    useEffect(()=> {
        getDocs(collection(db, "posts"))
        .then((data)=>{ 
          const NewState = [];
          data.forEach((doc) => {
            if(!doc.data().found){
              console.log(doc.data().postedAt.seconds)
          NewState.push({id:doc.id, ...doc.data()})}
        
      })
      console.log(NewState)
          setFoundItems(NewState)
          setUpdate(false)
      
      })},[update]);





  
      function deleteFound (FoundItem) {
        deleteDoc(doc(db,'posts',FoundItem))
        setUpdate(true)
      }
      function addingFound(desc,contact,found,location,name,phone,time,title,user) {
        addDoc(collection(db,'posts'),
       {
          desc,
          contact,
          found,
          location,
          name,
          postedAt:Timestamp.now(),
          title,
          user
        })

        
        setUpdate(true)
      }


      function updateInfo(Found) {
        console.log(Found.row)
        updateDoc(doc(db,'posts',Found.id),
        {
          title:Found.row.title,
          contact:Found.row.contact,
          location:Found.row.location,
          desc:Found.row.desc
        }
        )
        setUpdate(true)

      }


  function places(){
    var locations =[]
    for(var i=0;i<=73;i++){
      locations.push('building '+i)
    }
    return locations

  }

  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(()=>[
   // {field : 'Avatar' , headerName='Found',width=90, renderCell: {params} =><AiIcons.AiOutlineFound/> ,sortable:false,filterable:false,editable:false},
    {field:'id',headerName:'id',width:220},
    {field:'user',headerName:'user',width:100,editable:false},
    {field:'title',headerName:'title',width:170,editable:true},
    {field:'contact',headerName:'contact',width:200,editable:true},
    {field:'postedAt',headerName:'postedAt',width:200,editable:false,renderCell: (params) =>{
    return (new Date(params.value.seconds*1000)).toLocaleString() }},
    {field:'desc',headerName:'description',width:200,editable:true},
    {field:'location',headerName:'location',width:150,type:'singleSelect',valueOptions:places(),editable:true},
    
    {
      field: 'actions',
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem icon={<DeleteIcon/>} onClick={()=> deleteFound(params.id)} label="Delete" style={{color:'white'}}/>,
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
    <Box sx={{ height: 635, width:1540 ,color:'white',textAlign:'center' ,margin:'auto'}}>
      <div className='head'>
        <Typography variant='h5' component="h5" sx={{textAlign:'center',mt:3,mb:3,color:'white',display:'inline'}}>
            Manage Founds
        </Typography>
        <BasicModal addingFound= {addingFound} className='add'/>
        
        </div>
      <DataGrid className='table' loading={update} columns={columns} rows={Posts} getRowId={row=>row.id} sx={{color:'white',textAlign:'center', background:'black ',border:'solid 1px white', 
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


 
export default TableLostPosts;