import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import SettingsIcon from '@mui/icons-material/Settings';

export default function HeaderDatasetCard(props){
    const [show, setShow] = React.useState(false);
    const router = useRouter();
    const[added, setAdded] = React.useState(false);
    const handleAdd = () => {
        if(added === false){
          props.addDatasetcatalog(props.data);
          setAdded(true);
        } else {
            props.removeDatasetcatalog(props.data);
            setAdded(false);
        }
    }

    const handleRemove = () => {
          props.removeDatasetcatalog(props.data);
  }

    return (

          <div style={{display:"flex", flexDirection:'row', minHeight:'3vh',maxHeight:'4vh', width:"97.3%",
              justifyContent:'space-around', alignItems:'center' ,backgroundColor:'#FAFAFB', marginBottom:2,
              textOverflow:'clip',marginLeft:16, }}>
      
                    <div style={{fontSize:14, width:"10%", overflow:'hidden'}}>
                      <p style={{textOverflow:'clip', overflow:'hidden',}}><b>{props.data.title?props.data.title: "Title"}</b><br></br>
                            </p>
                    </div>
                    <div style={{fontSize:14, width:"14%", textAlign:'left'}}>
                    <p><b>&nbsp;{props.data.features?props.data.features: "Description"}</b><br></br>
                        </p>
                    </div>
                    <div style={{fontSize:14,width:"12%"}}>
                      <p><b>&nbsp;{props.data.row_count?props.data.row_count: "Data"}</b><br></br>
                         </p>
                    </div>
                    {/* <div style={{fontSize:14,width:"7%"}}>
                      <p><b>&nbsp;{props.data.address?props.data.address: "Ranges"}</b><br></br>
                         </p>
                    </div>
                    <div style={{fontSize:14,width:"7%"}}>
                      <p><b>&nbsp;{props.data.address?props.data.address: "Features"}</b><br></br>
                         </p>
                    </div> */}
                    <div style={{fontSize:14,width:"7%"}}>
                      <p><b>&nbsp;{props.data.address?props.data.address: "Datasources"}</b><br></br>
                         </p>
                    </div>
                    <div style={{fontSize:14,width:"4%"}}>
                      <p><b>&nbsp;{props.data.address?props.data.address: "Action"}</b><br></br>
                         </p>
                    </div>
                    {/* <div style={{fontSize:14, cursor:'pointer',width:""}} 
                        onClick={()=>props.handleOpenDetails(props.data)}>
                      <p><b>{props.geo?"View Details": "View Details"}</b></p>
                    </div> */}
                    
                    {router.pathname.includes('/dashboard')?"":
                        router.pathname.includes('/createsignalsecond')?
                        <div style={{fontSize:14, cursor:'pointer'}} 
                        onClick={()=>handleRemove()}>
                          <p><ClearIcon /></p>
                        </div>:
                    <div style={{fontSize:14, cursor:'pointer'}} 
                        onClick={()=>handleAdd()}>
                      <p><SettingsIcon /></p>
                    </div>}
        
          </div>
    )

}