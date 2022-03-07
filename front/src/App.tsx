import logo from './assets/logo.png';
import './style/main.css'
import './App.css';
import './bootstrap/bootstrap.css'
import SearchBar from './components/SearchBar';
import { Launches } from './components/Launches';
// import { NavBar } from './components/navbar/NavBarElements'

const App = () => {
  return (
    <div className="appContainer">
      <header>
        <img src={logo} className="mainLogo" alt="logo"/>
      </header>
      <main>
        <Launches/>
      </main>
      <br/>
    </div>
  )
}

export default App;
