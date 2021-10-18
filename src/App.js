import './App.css';
import paypallogo from './paypal.png';
import Container from 'react-bootstrap/Container'
import TimmiesApp from './TimmiesApp'
import Legend from './Legend'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <div className="App">
          <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
              integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
              crossOrigin="anonymous"
          />
          <header className="app-title">
            Tim Horton's Hockey Challenge Helper
          </header>
          <div>
              <div>App will be unstable for the near while.  Most of the time it will not connect properly and I have to manually fix it.  Refreshing constantly will not help. While it is in this state I will try to have it working at 9am PST/12pm EST and 9pm PST/12am EST but it depends if I am available or not.</div>
              <div>Until the authentication issue is solved this is how it will work but it's still better than not working at all.</div>
              <TimmiesApp />
              <Legend/ >
              <footer className="footer" >
                  <div>Questions? Suggestions? Find me on <a href={"//www.twitter.com/Zorbane"} target="_blank">Twitter</a></div>
                  <div>Buy me Timmies? <a href='https://www.paypal.com/paypalme/zorbane/' target="_blank"><img className="paypal-logo" src={paypallogo}/></a></div>
              </footer>
          </div>
      </div>
  );
}

export default App;
