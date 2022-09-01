import TimerIcon from '@mui/icons-material/Timer';
import ArrowRightAltSharpIcon from '@mui/icons-material/ArrowRightAltSharp';
import DateRangeIcon from '@mui/icons-material/DateRange';
import StorageIcon from '@mui/icons-material/Storage';

export default function HelpCenterCard(props){
    return(
        // <Box sx={{ borderColor:'white', py:12, px:12}}>
                  <div style={{display:"flex", flexDirection:'column', maxWidth:'325px'}}>
                    {props.title==="GETTING STARTED"?<TimerIcon /> :
                    props.title==="GEOGRAPHIC AND TIME GRAINS"?<DateRangeIcon /> : <StorageIcon />} 
                    <h3>{props.title}</h3>
                    <p>{props.description}</p>
                    <div style={{display:"flex",flexDirection:'row', alignItems: 'center',}}>
                        <p>{props.linkText}</p>
                    </div>
                    <div style={{display:"flex",flexDirection:'row', alignItems: 'center',}}>
                      <p>{props.all}</p> 
                      &nbsp;&nbsp;<ArrowRightAltSharpIcon />
                    </div>
                  </div>
        // </Box>
    )
}
