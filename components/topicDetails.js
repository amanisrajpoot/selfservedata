import React, {useEffect, useState} from 'react';
import { Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import mixpanel from 'mixpanel-browser';
import {getUser} from "../function/users";

mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true}); 

export default function TopicDetails(props){
    const router = useRouter();

    return (
        <div style={{display:'flex', height:'5vh',  maxWidth:'90% !important',
                        backgroundColor:'white', }}>
            <div style={{ margin: '1rem', 
                        backgroundColor:'white', }}>
                <div style={{ margin: '1rem', 
                            backgroundColor:'white', }}>
                              </div>
                    <div></div>
            </div>
            
            <div>
                {props.topicName ? <h1>{props.topicName}</h1> : <h1>No Topic Selected</h1>}
            </div>
        </div>

    );
}
