import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import MyDrawer from './src/components/MyDrawer';

export default function App() {
	return ( 
		<NavigationContainer >
			<MyDrawer / >
		</NavigationContainer>
	);
}