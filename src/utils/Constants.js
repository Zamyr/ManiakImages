export const COLORS = {
	PRIMARY: '#1d3557',
	SECONDARY: '#457b9d',
	BLUELIGHT: '#a8dadc',
	LIGHT: '#f1faee',
	RED: '#e63946',
};

export const validateEmail = email => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};

export const API = {
	default_url: 'https://challenge.maniak.co/api/'
}
