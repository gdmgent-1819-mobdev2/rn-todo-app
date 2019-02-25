import React from 'react'
import { StyleSheet, Text } from 'react-native'

import { white } from '../utils/styles/Colors'

const styles = StyleSheet.create({
	titleText: {
		fontSize: 16,
		fontWeight: '500'
	}
})

const SubTitle = ({ subtitle }) => (
	<Text style={[styles.titleText, { color: white }]}>
		{subtitle.toUpperCase()}
	</Text>
)

export default SubTitle