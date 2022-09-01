import TimerIcon from '@mui/icons-material/Timer';
import DateRangeIcon from '@mui/icons-material/DateRange';
import StorageIcon from '@mui/icons-material/Storage';

export default function HomepageCard(props){
    return(
        // <Box sx={{ borderColor:'white', py:12, px:12}}>
                  <div style={{display:"flex", flexDirection:'column', maxWidth:'325px'}}>
                    {props.title==="GETTING STARTED"?<TimerIcon /> :
                    props.title==="GEOGRAPHIC AND TIME GRAINS"?<DateRangeIcon /> : <StorageIcon />} 
                    <p>{props.description}STEP 1</p>
                    <h3>{props.title}Start from scratch or using one of our templates.</h3>
                    <p>{props.description} You can customize signals anyway you need by choosing:</p>
                    
                    <ol>
                        <li>We source the control data including economic, weather, demographic, and population data sets;</li>
                        <li>We organize and curate the data by adjusting for time and geographic granularity;</li>
                        <li>We apply a variety of data science treatments; and</li>
                        <li>We simplify data ingestion through automated processes.</li>
                    </ol>
                  </div>
        // </Box>
    )
}
