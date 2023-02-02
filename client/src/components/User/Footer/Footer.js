import React from 'react'
import { MDBFooter, MDBContainer } from 'mdb-react-ui-kit';


function Footer() {
  return (
    <div className=' bottom-0 w-full'>
      <MDBFooter className='text-center text-white' style={{ backgroundColor: 'black' }}>
      <MDBContainer className='p-4'></MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        ©  Copyright:
        
          AutoEX india.in
       
      </div>
    </MDBFooter>
    </div>
  )
}

export default Footer