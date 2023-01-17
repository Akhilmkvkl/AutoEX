import React from 'react'
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';


function Success() {
  return (
    <div>
        <div className='mt-32'>
        <Result
    status="success"
    title="Successfully compleated payment"
    subTitle="You can view the session details on you console."
    extra={[
    <Link to={'/experts'}>  <Button type="primary" key="console">
        Go Console
      </Button>,</Link>  // <Button key="buy">Buy Again</Button>,
    ]}
  />
        </div>
    </div>
  )
}

export default Success