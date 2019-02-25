import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 40
    },
    headerText: {
        color: 'white',
        fontSize: 22,
        fontWeight: '500'
    }
})

const Header = ({ title }) => (
    <View style={ styles.headerContainer }>
        <Text style={ styles.headerText }>{ title.toUpperCase() }</Text>
    </View>
)

export default Header