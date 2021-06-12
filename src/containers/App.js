import React from 'react';
import '../containers/App.css';
import Weather from '../components/Weather';
import { Provider } from 'react-redux';
import WeatherStore from '../redux/Store';

const App = () => {
	return (
		<Provider store={WeatherStore}>
			<Weather />
		</Provider>
	);
};

export default App;