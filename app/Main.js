import React, { Component } from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo'

import { primaryGradientArray } from './utils/styles/Colors'
import { Header } from './components'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centered: {
      alignItems: 'center'
  }
})

export class Main extends Component {
    state = {
        time: new Date().getTime()
    }    
    componentDidMount() {
        this.tick()
    }
    tick() {
        this.setState((state) => {
            return {
                ...state,
                time: new Date().getTime()
            }
        })
        setTimeout(() => {  
            this.tick()
        }, 200)
    }
    render() {
        const { title, color } = this.props
        const { time } = this.state

        return (
            <LinearGradient colors={ primaryGradientArray } style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={ styles.centered }>
                    <Header title='NMD To Do' />
                </View>
                <View style={ styles.container }>
                    <Text>{ title } in { color }</Text>
                    <Text>{ time }</Text>
                    <Text>NMD - Open up App.js to start working on your app!</Text>
                </View>
            </LinearGradient>
        )
    }
}

export default Main