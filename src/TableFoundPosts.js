import React,{useState,useEffect, useRef} from 'react';
import Box from '@mui/material/Box';
import { getAuth, createFoundWithEmailAndPassword } from "firebase/auth";
import { DataGrid,GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import BasicModal from './FoundAdd'
import {db} from './firebase-config'
import { collection, getDocs,getDoc,addDoc,updateDoc,deleteDoc,doc} from "firebase/firestore";
import './TableM.css'



function TableFoundPosts() {
    const [Posts,setFoundItems] = useState([])
    const [pageSize,setpageSize] = useState(10)
    const [update,setUpdate] = useState(true)
    const saveButton = useRef(null);
    useEffect(()=> {
        getDocs(collection(db, "Found Items"))
        .then((data)=>{ 
          const NewState = [];
          data.forEach((doc) => {
          NewState.push({id:doc.id, ...doc.data()})
        
      })
      console.log(NewState)
          setFoundItems(NewState)
          setUpdate(false)
      
      })},[update]);





  
      function deleteFound (FoundItem) {
        deleteDoc(doc(db,'Found Items',FoundItem))
        setUpdate(true)
      }
      function addingFound(Fname,Lname,email,password) {
        addDoc(collection(db,'Found Items'),
        {
          Fname:Fname,
          Lname:Lname,
          email:email
        })
        
        setUpdate(true)
      }


      function updateInfo(Found) {
        updateDoc(doc(db,'Found Items',Found.id),
        {
          name:Found.row.name,
          location:Found.row.location,
          description:Found.row.description
        }
        )
        setUpdate(true)

      }

 /* const { data } = useDemoData({
    dataSet: 'Employee',
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });*/
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
    {field:'UserID',headerName:'UserID',width:100,editable:false},
    {field:'name',headerName:'name',width:150,editable:true},
    {field:'date',headerName:'date',width:200,editable:false,renderCell: (params) =>{
    return (new Date(params.value.seconds*1000)).toLocaleString() }},
    {field:'description',headerName:'description',width:200,editable:true},
    {field:'location',headerName:'location',width:200,type:'singleSelect',valueOptions:places(),editable:true},
    
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
    <Box sx={{ height: 635, width:1180 ,color:'white',textAlign:'center' ,margin:'auto'}}>
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


 
export default TableFoundPosts;