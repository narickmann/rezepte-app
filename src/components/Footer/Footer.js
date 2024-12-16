import './Footer.module.css'

const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; {currentYear} Nadine Rickmann</p>
    </footer>
  )
}

export default Footer;