import React, { Component } from 'react';
import './App.css';

class App extends Component {
	state = {
		username: '',
		email: '',
		pass: '',
		accept: false,

		errors: {
			username: false,
			email: false,
			pass: false,
			accept: false,
      message:'',
		},
	};

	messages = {
		username_incorrect:
			'Nazwa musi być dłuższa niż 10 znaków i nie może zawierać spacji',
		email_incorrect: 'brak @ w emailu',
		password_incorrect: 'hasło musi miec 8 znakow',
		accept_incorrect: 'nie potwierdzona zgoda',
	};

	handleChange = (e) => {
		const name = e.target.name;
		const type = e.target.type;
		if (type === 'text' || type === 'password' || type === 'email') {
			const value = e.target.value;
			this.setState({
				[name]: value,
			});
		} else if (type === 'checkbox') {
			const checked = e.target.checked;
			this.setState({
				[name]: checked,
			});
		}
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const validation = this.formValidation();
		console.log(validation);

		if (validation.correct) {
			this.setState({
				username: '',
				email: '',
				pass: '',
				accept: false,
        message: 'Formularz wysłany',

				errors: {
					username: false,
					email: false,
					pass: false,
					accept: false,
				},
			});
			
		} else {
			this.setState({
				errors: {
					username: !validation.username,
					email: !validation.email,
					pass: !validation.password,
					accept: !validation.accept,
				},
			});
		}
	};

	formValidation = () => {
		let username = false;
		let email = false;
		let password = false;
		let accept = false;
		let correct = false;

		if (
			this.state.username.length > 10 &&
			this.state.username.indexOf(' ') === -1
		) {
			username = true;
		}

		if (this.state.email.indexOf('@') !== -1) {
			email = true;
		}

		if (this.state.pass.length === 8) {
			password = true;
		}

		if (this.state.accept) {
			accept = true;
		}

		if (username && password && password && accept) {
			correct = true;
		}
		return {
			correct,
			username,
			password,
			accept,
			email,
		};
	};

  componentDidUpdate(){
    if(this.state.message !== ''){
      setTimeout(()=>this.setState({message:''}),3000)
    }
  }

	render() {
		return (
			<div className='App'>
				<form onSubmit={this.handleSubmit} noValidate>
					<label htmlFor='user'>
						Twoje imię:
						<input
							type='text'
							id='user'
							name='username'
							value={this.state.username}
							onChange={this.handleChange}
						/>
						{this.state.errors.username && (
							<span>{this.messages.username_incorrect}</span>
						)}
					</label>
					<label htmlFor='user'>
						Adres email:
						<input
							type='email'
							id='email'
							name='email'
							value={this.state.email}
							onChange={this.handleChange}
						/>
						{this.state.errors.email && (
							<span>{this.messages.email_incorrect}</span>
						)}
					</label>
					<label htmlFor='pass'>
						Twoje hasło:
						<input
							type='password'
							id='password'
							name='pass'
							value={this.state.pass}
							onChange={this.handleChange}
						/>
						{this.state.errors.pass && (
							<span>{this.messages.password_incorrect}</span>
						)}
					</label>
					<label htmlFor=''>
						<input
							type='checkbox'
							id='accept'
							name='accept'
							checked={this.state.accept}
							onChange={this.handleChange}
						/>
						Wyrażam zgodę wszelaką
					</label>
					{this.state.errors.accept && (
						<span>{this.messages.accept_incorrect}</span>
					)}
					<button>Zapisz się</button>
				</form>
        {this.state.message &&<h3>{this.state.message}</h3>}
			</div>
		);
	}
}

export default App;
