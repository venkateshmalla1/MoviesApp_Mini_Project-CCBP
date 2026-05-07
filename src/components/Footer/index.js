import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <footer className="footer-container">
    <div className="social-media-icons-container">
      <FaGoogle className="social-media-icons" role="img" />
      <FaTwitter className="social-media-icons" role="img" />
      <FaInstagram className="social-media-icons" role="img" />
      <FaYoutube className="social-media-icons" role="img" />
    </div>
    <p className="contact-us-text">Contact us</p>
  </footer>
)

export default Footer
