import React from 'react'

const Footer = (props) => {
  return (
    <>
      {props.isLoggedIn ? (
        <footer className="footer">
          <p className="footer__copyright">&copy; 2023 Mesto Russia</p>
        </footer>
      ) : (
        <></>
      )}
    </>
  )
}

export default Footer
