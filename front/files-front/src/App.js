import Navbar from "./components/Navbar";
import Search from './components/Search';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Search />
    </Provider>
  );
}

export default App;
