// import logo from './logo.svg';
import './App.css';
import VoucherEntry from './components/pages/Voucherentry';
import Header from './components/normal'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
      </header>
      <VoucherEntry/>
    </div>
  );
}

export default App;
