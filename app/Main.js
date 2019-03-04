import React, { Component } from 'react'
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo'

import uuid from 'uuid/v1';

import { withToDo } from './services/ToDoProvider'

import { primaryGradientArray } from './utils/styles/Colors'
import grid, { gutter } from './utils/styles/Grid'
import { Button, Header, Input, List, SubTitle } from './components'

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputContainer: {
        marginTop: (2*gutter),
        paddingLeft: gutter
    },
    list: {
        flex: 1,
        marginTop: (4*gutter),
        paddingLeft: gutter,
        paddingRight: gutter,
        marginBottom: gutter
    },
    scrollableList: {
        marginTop: gutter
    },
})

export class Main extends Component {
    state = {
        inputValue: '',
    }
      
    componentDidMount = () => {
        this.props.loadingItems()
    }

    newInputValue = value => {
        this.setState({
            inputValue: value
        })
    }
    
    render() {
        const { inputValue } = this.state
        const { title, loadingItems, allItems } = this.props

        return (
            <LinearGradient colors={ primaryGradientArray } style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={ grid.fbCentered }>
                    <Header title={ title } />
                </View>
                <View style={styles.inputContainer}>
                    <SubTitle subtitle={"What's Next?"} />
                    <Input
                        inputValue={inputValue}
                        onChangeText={this.newInputValue}
                        onDoneAddItem={() => { 
                            this.props.onDoneAddItem(inputValue) 
                            this.newInputValue('')
                        }}
                    />
                </View>

                <View style={styles.list}>
                    <View style={styles.column}>
                        <SubTitle subtitle={'Recent Notes'} />
                        <View style={styles.deleteAllButton}>
                            <Button deleteAllItems={() => { this.props.deleteAllItems() }} />
                        </View>
                    </View>

                    {this.props.loadingItems ? (
                        <ScrollView contentContainerStyle={styles.scrollableList}>
                            {Object.values(this.props.allItems)
                                .reverse()
                                .map(item => (
                                    <List
                                        key={item.id}
                                        {...item}
                                        deleteItem={() => { this.props.deleteItem(item.id)}}
                                        completeItem={() => { this.props.completeItem(item.id, true)}}
                                        incompleteItem={() => {this.props.completeItem(item.id, false)}}
                                    />
                                ))
                            }
                        </ScrollView>
                    ) : (
                        <ActivityIndicator size="large" color="white" />
                    )}
                </View>
            </LinearGradient>       
        )
    }
}

export default withToDo(Main);