import './css/footer.css';

export const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-left'>© 2024 Zberezhemo.</div>
      <div className='footer-right'>
        <a href='/legal-terms'>Legal terms and privacy</a>
        <a href='/'>Cookies</a>
      </div>
    </footer>
  );
};
