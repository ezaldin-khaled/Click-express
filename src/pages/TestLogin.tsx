import React from 'react'

const TestLogin: React.FC = () => {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: 'red', 
      color: 'white', 
      fontSize: '24px',
      textAlign: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div>
        <h1>TEST LOGIN PAGE</h1>
        <p>If you can see this, the routing is working!</p>
        <p>Current URL: {window.location.href}</p>
      </div>
    </div>
  )
}

export default TestLogin
