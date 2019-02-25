import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo'

import { Header } from './components'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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
        const grArray = ['#ff0000', '#0000ff']

        return (
            <LinearGradient colors={ grArray } style={styles.container}>
                <View style={styles.container}>
                    <Text>{ title } in { color }</Text>
                    <Text>{ time }</Text>
                    <Text>NMD - Open up App.js to start working on your app!</Text>
                </View>
            </LinearGradient>
        )
    }
}

export default Main