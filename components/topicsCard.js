import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from '@mui/material/Button';
import mixpanel from 'mixpanel-browser';
import {getUser} from "../function/users";

mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true});

export default function TopicsCard(props){
    const [show, setShow] = React.useState(false);
    const router = useRouter();
    const[added, setAdded] = React.useState(false);
    const handleAdd = () => {
        if(added === false){
          props.addDatasetcatalog(props.data);
          setAdded(true);
        } else {
            props.removeDataset(props.data);
            setAdded(false);
        }
    }

    const handleRemove = () => {
          props.removeDataset(props.data);
  }

    return (

          <div style={{display:"flex", flexDirection:'row', minHeight:'14vh', width:"100%",
              justifyContent:'space-around', alignItems:'center', marginBottom:16,  }}
              href="/topicbrowser">
      
                    <Button style={{fontSize:14, width:"19%",backgroundColor:'#fff', paddingLeft:8,
                        paddingRight:2, marginLeft:2}}
                        onClick={()=>
                          mixpanel.track('Topics Button', {
                            'source': "Create dataset Page",
                            'action': "clicked on FDA icon",
                            'dataset': props.data.ID,
                              'email': props.user.email
                          })}>
                        <Link href="/topic/FDA" >
                      <a style={{width:'19%', textAlign:'center'}}>
                        <p><b>{props.data.title?props.data.title: "FDA"}</b><br></br>
                              </p>

                       </a>
                    </Link>
                         </Button>

                    <Button style={{fontSize:14, width:"19%",backgroundColor:'#fff',
                        paddingRight:2, marginLeft:2}}
                        onClick={()=>
                          mixpanel.track('Topics Button', {
                            'source': "Create dataset Page",
                            'action': "clicked on Physician icon",
                            'dataset': props.data.ID,
                              'email': props.user.email
                          })}>
                        <Link href="/topic/Physician">
                      <a style={{width:'19%',textAlign:'center'}}>
                        <p><b>{props.data.title?props.data.title: "Physician"}</b><br></br>
                              </p>

                       </a>
                    </Link>
                         </Button>

                    <Button style={{fontSize:14, width:"19%",backgroundColor:'#fff', paddingLeft:8,
                        paddingRight:2, marginLeft:2}}
                        onClick={()=>
                          mixpanel.track('Topics Button', {
                            'source': "Create dataset Page",
                            'action': "clicked on Drugs icon",
                            'dataset': props.data.ID,
                              'email': props.user.email
                          })}>
                        <Link href="/topic/Drugs" >
                      <a style={{width:'19%',textAlign:'center'}}>
                        <p><b>{props.data.title?props.data.title: "Drugs"}</b><br></br>
                              </p>

                       </a>
                    </Link>
                         </Button>

                    <Button style={{fontSize:14, width:"19%",backgroundColor:'#fff', paddingLeft:0,
                        paddingRight:0, marginLeft:0}}
                        onClick={()=>
                          mixpanel.track('Topics Button', {
                            'source': "Create dataset Page",
                            'action': "clicked on Insurance Companies icon",
                            'dataset': props.data.ID,
                              'email': props.user.email
                          })}>
                        <Link href="/topic/Insurance Companies" >
                      <a style={{width:'19%', textAlign:'center'}}>
                        <p><b>{props.data.title?props.data.title: "Insurance Companies"}</b><br></br>
                              </p>

                       </a>
                    </Link>
                         </Button>


          </div>
    )

}