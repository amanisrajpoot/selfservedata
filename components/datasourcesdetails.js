import React, {useEffect, useState} from 'react';
import { Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import mixpanel from 'mixpanel-browser';
import {getUser} from "../function/users";

mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true}); 

export default function DataSourcesDetails(props){
    const router = useRouter();

    return (
                        <div style={{flex: 1, height: '70%', margin: '1rem', maxWidth: '100%',
                        backgroundColor:'white', }}>
                            <div style={{display:'flex', justifyContent:'end', cursor:'pointer'}}
                                 onClick={()=>props.handleCloseDetails()}>
                              <p>X</p>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center',
                                            justifyContent: 'space-between', margin: '1rem 0'}}>
                              <div style={{fontFamily: 'Plus Jakarta Sans',fontStyle: 'normal', fontWeight: 'bold',
                                                fontSize: '1.5rem', color: '#3f4544',display: 'flex', flexDirection: 'column'}}>
                                <span>Data Source Details</span>
                              </div>
                              {/* {role === 'Doctor' && (
                                <div
                                  onClick={editDetails}
                    
                                >
                                  Edit details
                                </div>
                              )} */}
                            </div>
                            <div style={{display:'flex', maxWidth:'100%', maxHeight:'70%', flexDirection:'column', 
                                    justifyContent:'space-around'}}>
                              <div >
                                {/* <p>{props.data.title}</p> */}
                              </div>
                              <div style={{display: 'flex', flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                flexWrap: 'wrap',
                                                    margin: "1rem 0",}}>
                                <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                                                            alignItems: 'flex-start', minWidth: '40%', 
                                                            maxWidth:'40%',margin: '1.2rem 1rem 1.2rem 0'}}>
                                  <label><b>Title</b></label>
                                  {props.data.title}
                                </div>
                                <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                                                            alignItems: 'flex-start', minWidth: '40%', 
                                                            maxWidth:'40%',margin: '1.2rem 1rem 1.2rem 0'}}>
                                  <label><b>Description</b></label>
                                  {props.data.description}
                                </div>
                                <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                                                            alignItems: 'flex-start', minWidth: '40%', 
                                                            maxWidth:'40%',margin: '1.2rem 1rem 1.2rem 0'}}>
                                  <label><b>No. of Features</b></label>
                                  {props.data.features.split(',').length}
                                </div>
                                <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                                                            alignItems: 'flex-start', minWidth: '40%', 
                                                            maxWidth:'40%',margin: '1.2rem 1rem 1.2rem 0'}}>
                                  <label><b>No. of Rows</b></label>
                                  {props.data.row_count}
                                </div>
                                <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                                                            alignItems: 'flex-start', minWidth: '40%', 
                                                            maxWidth:'40%',margin: '1.2rem 1rem 1.2rem 0'}}>
                                  <label><b>Topics</b></label>
                                  {props.data.topic}
                                </div>
                                {/* <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                                                            alignItems: 'flex-start', minWidth: '40%', margin: '1.2rem 1rem 1.2rem 0'}}>
                                  <label><b>Start Date</b></label>
                                  {props.data.startdate?props.data.startdate.split('T')[0]:'27/01/2021'}
                                </div>
                                <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                                                            alignItems: 'flex-start', minWidth: '40%', margin: '1.2rem 1rem 1.2rem 0'}}>
                                  <label><b>End Date</b></label>
                                  {props.data.enddate?props.data.enddate:"27/10/2021"}
                                </div> */}
                                <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                                            width:'100%', alignItems: 'flex-start', minWidth: '40%', margin: '1.2rem 1rem 1.2rem 0'}}>
                                  <p><b>Features: </b>{props.data.features?props.data.features.substring(0,30):"7"} </p>
                                  
                                </div>
                                <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                                            width:'100%', alignItems: 'flex-start', minWidth: '100%', 
                                            }}>
                                    <table style={{width:'100%',}}>
                                        <tbody style={{width:'100%',}}>
                                            {props.data.range !== null && props.data.range.length !==0 ? <tr style={{width:'100%',}}>
                                                <td style={{width:'33%', border:'1px solid', borderColor:'#3f4544', textAlign:'center'}}>
                                                    <p><b>Name </b></p>
                                                </td>
                                                <td style={{width:'33%', border:'1px solid', borderColor:'#3f4544', textAlign:'center'}}>
                                                    <p><b>Granularity </b></p>
                                                </td>
                                                <td style={{width:'33%', border:'1px solid', borderColor:'#3f4544', textAlign:'center'}}>
                                                    <p><b>Range </b></p>
                                                </td>
                                            </tr>:null}

                                            {props.data.range !== null && props.data.range.length !==0 ? props.data.range.map((rang, i)=><tr key={""+i} style={{width:'100%',}}>
                                                <td style={{width:'33%', border:'1px solid', borderColor:'#3f4544', textAlign:'center'}}>
                                                    <p>{rang.name} </p>
                                                </td>
                                                <td style={{width:'33%', border:'1px solid', borderColor:'#3f4544', textAlign:'center'}}>
                                                    <p>{rang.grain} </p>
                                                </td>
                                                <td style={{width:'33%', border:'1px solid', borderColor:'#3f4544', textAlign:'center'}}>
                                                    <p>{rang.range} </p>
                                                </td>
                                            </tr>):null}
                                        </tbody>
                                    </table>
                                                              
                                </div>
                                
                              </div>
                            </div>
                            <div style={{ flexDirection: 'column' }}>
                              
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'end',
                                  columnGap: '1em',
                                }}
                              >
                                {router.pathname.includes('/dashboard')?<button
                                  // onClick={disposeFunc}
                                  style={{  width: '30%', height: '2.5rem', 
                                  backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)', 
                                  color: 'white',}}
                                  href="/createsignalfirst"
                                  onClick={() => {router.push('/searchresult')
                                  mixpanel.track('Catalog Details Card Operations', {
                                    'source': "Dashboard",
                                    'action': "clicked on Create a Dataset button",
                                    'dataset': props.data.ID,
                                      'email': props.user.email
                                  })
                                }
                                }
                                >
                                  Create Dataset to Explore More
                                </button>:router.pathname.includes('/dataset')?"":
                                <button
                                  // onClick={disposeFunc}
                                  style={{ width: '30%', height: '2.5rem', 
                                  backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)', 
                                  color: 'white',  }}
                                  onClick={() => {
                                    props.addDatasetcatalog(props.data)
                                    mixpanel.track('Catalog Card Operations', {
                                      'source': "Create Dataset Page",
                                      'action': "clicked on Add to Dataset button",
                                      'dataset': props.data.ID,
                                        'email': props.user.email
                                    })
                                    props.handleCloseDetails()
                                  
                                  }
                                }
                                >
                                  Add to Dataset
                                </button>}

                              </div>
                            </div>
                          </div>

    );
}
