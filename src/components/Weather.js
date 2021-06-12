import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GetWeatherDetals } from '../redux/Actions';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import  Clock  from '../components/Clock';

const format_date = (d) => {
	let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
	let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
 
	let day = days[d.getDay()];
	let date = d.getDate();
	let month = months[d.getMonth()];
	let year = d.getFullYear();
 
	return `${day} ${date} ${month} ${year}`
 }

class Weather extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchInput: ''
		};
	}

	componentDidMount() {
		const { GetWeatherDetals } = this.props.action;
		GetWeatherDetals();
	}
	handleSubmit = e => {
		e.preventDefault();
		const { searchInput } = this.state;
		const { GetWeatherDetals } = this.props.action;
		if (searchInput) GetWeatherDetals(this.state.searchInput);
		this.setState({ searchInput: ''});
	};
	handleOnChange = e => {
		this.setState({
			searchInput: e.target.value
		});
	};
	render() {
		const { data, success } = this.props.weatherData;
		const { weather, sys, name, main, wind } = data;
		const { searchInput } = this.state;
		return (
	<div className="wrapper">
		<div className="header">
				<div className="container">
					<div className="header__row">
					<div className="header_refresh">
							<button className="refresh" onClick={ () => window.location.reload() }></button>
					</div>
					<form onSubmit={this.handleSubmit} >	
						<div className="header_serach">
							<div className="search_header">
								<input type="text" name="city" placeholder="Search city" value={searchInput} onChange={e => this.handleOnChange(e)} />
								<button className="search">search</button>
							</div>
						</div>		
					</form>
				</div>
			</div>
		</div>
		<div className="content-weather_title">{ success ? name : "Брест" }, { success ? sys.country : "BY" }</div>
		<div className="content">
			<div className="content-weather">
				<div className="content-weather_subtitle">
					<div className="subtitle-date">{format_date(new Date())}</div>
					<div className="subtitle-time"><Clock /></div>
				</div>
			</div>
		</div>
		<div className="wrapper-content-weather">
		<div className="infoWeath">
				<div className="info-cont">
					<div className="content-weather_wether ">
						<p className="temp">{success ? main.temp : "15"}<span className="gradus"></span></p>
					</div>
					<div className="info">
						<p>Заход солнца: {success ? main.feels_like : "0"}</p>
						<p>Влажность: {success ? main.humidity : "0"}%</p>
						<p>Атмосферное давление: {success ? main.pressure : "0"} гПа</p>
						<p>Сила ветра: {success ? wind.speed : "0"} м/с</p>
					</div>	
					<div className='icon'>
					{success ? (
                  <img
                    src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                    alt=""
                  />
                ) : null}
					</div>
					</div>
					
				</div>		
		</div>
		<ToastContainer />
	</div>
	
		);
	}
}

const mapStateToProps = state => ({
	weatherData: state
});

const mapDispatchToProps = dispatch => ({
	action: bindActionCreators({ GetWeatherDetals }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Weather);