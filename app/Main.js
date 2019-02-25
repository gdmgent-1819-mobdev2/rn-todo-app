import React, { Component } from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo'

import { primaryGradientArray } from './utils/styles/Colors'
import { Button, Header, Input, SubTitle } from './components'

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    centered: {
        alignItems: 'center'
    },
    inputContainer: {
        marginTop: 40,
        paddingLeft: 15
    },
    list: {
        flex: 1,
        marginTop: 70,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 10
    },
    scrollableList: {
        marginTop: 15
    },
})

export class Main extends Component {
    state = {
        inputValue: '',
    }  

    componentDidMount() {
    }

    newInputValue = value => {
        this.setState({
            inputValue: value
        })
    }

    render() {
        const { title } = this.props
        const { inputValue } = this.state

        return (
            <LinearGradient colors={ primaryGradientArray } style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={ styles.centered }>
                    <Header title={ title } />
                </View>
                <View style={styles.inputContainer}>
                    <SubTitle subtitle={"What's Next?"} />
					<Input
						inputValue={inputValue}
						onChangeText={this.newInputValue}
						onDoneAddItem={this.onDoneAddItem}
					/>
				</View>
                <View style={styles.list}>
					<View style={styles.column}>
						<SubTitle subtitle={'Recent Notes'} />
						<View style={styles.deleteAllButton}>
							<Button deleteAllItems={this.deleteAllItems} />
						</View>
					</View>
				</View>
            </LinearGradient>
        )
    }
}

export default Main