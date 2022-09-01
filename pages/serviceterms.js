import {useState, } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ServiceTerms() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeIndustry = (event) => {
    setIndustry(event.target.value);
  };

  const handleChangeAnalysis = (event) => {
    setAnalysis(event.target.value);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  return (
    
    <Box>
      <Navbar />

      <Box sx={{ display: 'flex', flexDirection:'column', 
               pt:6,px: 24, bgcolor: '#fff', 
               justifyContent:'center', color:'#000', alignItems:'center',
              backgroundImage:'../components/homepage-banner.jpeg'
              }}>
        
            <Box sx={{pb: 2}}>
                <Typography color="inherit" variant="h4" component="h1" 
                    sx={{display:'flex', flexDirection:'column', py:0, my:0, 
                         }}
                    style={{textAlign:'center'}}>
                    TERMS OF SERVICE
                </Typography>
            </Box> 

            <Box>
              <p>This Terms of Service Agreement (the “Agreement”) is entered into the date the User creates an account with Company and accepts the click through acceptance (the “Effective Date”). This Agreement is between Ready Signal, LLC, a Michigan limited liability company with an address at 330 E Liberty, Ann Arbor, MI 48104 (the “Company” or “Ready Signal”) and the person or entity, if person enters into Agreement on behalf of the entity, ( “User”) also referred to herein as parties. User hereby agrees to this Agreement upon creation of an account with Company, and through click acceptance has agreed to abide by the terms of this Agreement.  Capitalized terms are generally defined in Section 14.</p>
              <h2>1. ORDERS.</h2>
              <p>Ready Signal provides a Software-as a-Service (“Software”) and data sets (“Data”) and that can be accessed via a web-enabled data portal (collectively, “Services”).  This Agreement establishes the terms of service for the use and/or purchase of the Services (“Subscriptions”). This Agreement does not obligate the parties to purchase or provide Subscriptions. Such obligations will be documented in subsequent orders the User makes through the Website that describe the Subscription, including license metrics, Subscription term, and fees (each, an “Order Form”). Upon submitting an Order Form to Company, User hereby agrees to abide by the terms of the applicable Order Form (“Order Effective Date”).  An explicit conflict between these agreements will be resolved according to the following order of precedence: (1) an Order Form; and (2) this Agreement.</p>
              <h2>2. SUBSCRIPTIONS.</h2>
              <p>Company will make Services available to User through a web-enabled portal. A User can obtain the Services through a trial subscription, monthly subscription basis, annual subscription basis, or on another periodic basis as purchased by User in an Order Form. There are limitations on the Services for trial subscription Users, including but not limited to, the types and amounts of Data that may be available to User. A User obtaining the Services through a trial subscription may obtain only the Services as determined by Company’s sole discretion and as may be changed from time to time after notice to the User.  Users have the ability to upgrade or modify their Subscriptions, including their paid package levels, in accordance with the terms of this Agreement and applicable Order Form. Services will be provided according to the terms in the Order Form unless changed in a subsequent renewal Order Form.  Company may alter the features, functionality, or availability of the Services at any time, after reasonable notice to the User, during a Subscription. Additional terms and conditions may be provided on the subscription registration web page or to a User by email.  Any such additional terms and conditions are incorporated into this Agreement by reference and are legally binding.</p>
              <h2>3. READY SIGNAL SERVICES.</h2>
              <h3>3.1 Purchased Services.</h3>
              <p>Company will make the Purchased Services available to User pursuant to this Agreement and the relevant Order Forms, if any, during the Term.  User agrees that its purchases hereunder are neither contingent on the delivery of any future functionality or features nor dependent on any oral or written public comments made by Company regarding future functionality or features.  To use certain features of the Services, User will need to create an account with Company (“Account”), and provide certain information as prompted by the Website.  User represents and warrant that: (a) all required registration information User submits is truthful and accurate; and (b) User will maintain the accuracy of such information.  Company may suspend or terminate User’s Account in accordance with Section 12.  User is responsible for maintaining the confidentiality of its Account login information and is fully responsible for all activities that occur under its Account.  User agrees to immediately notify Company of any unauthorized use, or suspected unauthorized use of User’s Account or any other breach of security.  Company will not be liable for any loss or damage arising from User’s failure to comply with the above requirements.</p>
              <h3>3.2 Trial Subscriptions.</h3>
              <p>Company may offer the Services to User for a trial period (“Trial Subscription”) as shown when User accesses the Trial Subscription (“Trial Subscription Period”). In the event Company offers a Trial Subscription to User, the Trial Subscription Period is effective upon the date that User creates an Account with Company (“Trial Subscription Effective Date”) and shall expire on the date shown when User accesses the Trial Subscription.  User will not be required to enter any credit card information during the Trial Subscription Period. If User desires to continue to access the Services after the expiration or termination of the Trial Subscription Period, User will be required to enter credit card information and purchase a Subscription. User may only access the Services through a Trial Subscription once, and only one (1) Trial Subscription is allowed per Account created with Company. User shall not be allowed to create multiple Accounts with Company. Company has no requirement to keep User’s Content and shall be entitled to permanently erase User’s Content after the expiration or termination of the Trial Subscription Period.</p>
              <h3>3.3 Users Subscriptions.</h3>
              <p>Unless otherwise specified in the applicable Order Form or registration web page on the Website, Services are obtained as Subscriptions, such as Hobbyist, Starter, Professional, or Enterprise, and may be accessed by no more than the specified number of users identified therein.  User shall use commercially reasonable efforts to prevent unauthorized access to, or use of, the Services, and notify Company promptly of any such unauthorized use known to User.</p>
              <h3>3.4 Standard Support.</h3>
              <p>Company will provide User with support as set out in this Agreement and its standard support offerings, as each may be modified from time to time. User is solely responsible for preparing its systems and facilities for accessing the Services. During the term of this Agreement, Company may, in its sole discretion, provide User with Updates.  In the event of a material Update, Company shall inform User by email of such Update or post such Update on Company’s web page, which User is obligated to review from time to time in order to stay current on the Company’s then-current policies related to the Services.  Updates (if any) will be deemed to be part of the Services under this Agreement.  Company is not obligated to provide any Updates to the Services.</p>
              <h2>4. LICENSE</h2>
              <h3>4.1 License Grant.</h3>
              <p>Subject to the terms and conditions of this Agreement, Company grants to User a non-exclusive, non-sublicensable, non-transferable license, during the term of this Agreement to access, use, perform, and digitally display the Services in accordance with the Documentation and this Agreement.</p>
              <h3>4.2 Limitations and License Restrictions.</h3>
              <p>The Company Property, including but not limited to all manuals, reports, records, programs, Data and other materials, and all Intellectual Property Rights in each of the foregoing, are the exclusive property of Company and its suppliers.  User agrees that it will not, and will not permit any other party, or if the Services are being purchased for use by an entity, any of such entity’s employees, to: (a) permit any party to access the Software or Documentation or use the Services, other than its employees authorized under this Agreement; (b) modify, adapt, alter or translate the Company Property, except as expressly allowed herein; (c) sublicense, lease, rent, loan, distribute, or otherwise transfer the Software or Documentation to any third party; (d) reverse engineer, decompile, disassemble, or otherwise derive or determine or attempt to derive or determine the source code (or the underlying ideas, algorithms, structure or organization) of the Software, except and only to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation; (e) use or copy the Software, Documentation, or Data except as expressly allowed under this subsection; (f) disclose or transmit any data contained in the Software to any individual other than a User employee, except as expressly allowed herein, (g) use the Services to conduct or promote any illegal activities; (h) use the Services to generate unsolicited email advertisements or spam; (i) use the Services to stalk, harass or harm another individual; (j) use any high volume automatic, electronic or manual process to access, search or harvest information from the Services (including without limitation robots, spiders or scripts); (k) impersonate any person or entity, or otherwise misrepresent your affiliation with a person or entity; (l) use any trademark, tradename, or brand name of Company’s in metatags, keywords or hidden text; (m) use any portion of the Services or Website in any manner that may give a false or misleading impression, attribution, or statement as to the Company, or any third party; (n) access or use the Services in a way intended to avoid incurring fees or exceeding usage limits or quotas; or (o) alter, remove, or obscure any copyright notice, digital watermarks, proprietary legends or other notice included in the Company Property.  Except as expressly set forth herein, no express or implied license or right of any kind is granted to User regarding the Company Property or any part thereof, including any right to obtain possession of any source code, data or other technical material relating to the Software.</p>
              <h2>5. FEES AND EXPENSES; PAYMENTS</h2>
              <h3>5.1 Fees.</h3>
              <p>In consideration for the access rights granted to User and the Services performed by Company under this Agreement, User will pay via credit card to Company all fees on User’s Account set forth on the pricing page for the Subscription Plan purchased on the Website, as amended from time to time, or, if the parties have mutually agreed to an Order Form (the “Fees”).  Company will automatically renew and bill User’s credit card according to the schedule detailed in the Order Form and in accordance with pricing page of the Website, or if the parties have mutually agreed to an Order Form, the Order Form.  If User provides credit card information to Company, User authorizes Company to charge such credit card for all Services listed in the User’s Account, or on the Order Form, as applicable, for the initial subscription term, any renewal User term(s), any recurring fees, any costs related to excess incremental data used by User that exceeds User’s Subscription as detailed in Order Form or pricing page, and charges set forth therein. In the event that User wishes to increase the number of user subscriptions beyond the maximum number of user subscriptions for which fees have been paid, User shall be required to pay additional fees pursuant to a new Order Form.</p>

              
            </Box>
      </Box>

        <Box sx={{ display: 'flex', flexDirection:'column', 
              height:'60vh', bgcolor: '#3e3e33', 
               justifyContent:'center', color:'#000',  
              backgroundImage:'../components/homepage-banner.jpeg', pb:4,pt:4
              }}>
        
            <Box sx={{pt:4, px:14,}}>
                <Box sx={{width:'85%'}}>
                  <img src="https://www.readysignal.com/wp-content/uploads/2021/01/Domo.png" />
                </Box>

                <Box sx={{textAlign:'right', color:'#BCBCBC'}}>
                  <Box>
                      <p>ABOUT US</p>
                      <p>SERVICES</p>
                      <p>CONTACT US</p>
                      <p>HELP CENTERy</p>
                      <p>{"BLOG & RESOURCES"}</p>
                      <p>TERMS OF USE</p>
                      <p>PRIVACY POLICY</p>
                  </Box>
                </Box>
            </Box>

            <Box sx={{pt:8, px:14}}>
                <Box sx={{width:'90%', color:'#BCBCBC'}}>
                  <p>contact@readysignal.com </p>
                  <p>330 E. Liberty St. Ann Arbor, MI 48104</p>
                </Box>
            </Box>
          </Box>
    
      <Footer />
    </Box>
  );
}

