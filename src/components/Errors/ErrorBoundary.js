import React from 'react';
import {View, Text} from 'react-native';

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {hasError: false};
	}

	static getDerivedStateFromError(error) {
		// Actualiza el estado para que el siguiente renderizado muestre la interfaz de repuesto
		return {hasError: true};
	}

	componentDidCatch(error, errorInfo) {
		// También puedes registrar el error en un servicio de reporte de errores
		console.log(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// Puedes renderizar cualquier interfaz de repuesto
			return (
				<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
					<Text>Ha ocurrido algo inesperado, por favor vuelva a intentarlo</Text>
				</View>
			);
		}

		return this.props.children;
	}
}
