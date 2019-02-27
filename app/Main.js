import React, { Component } from 'react'
import { ActivityIndicator, AsyncStorage, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo'

import uuid from 'uuid/v1';

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
        allItems: {},
        inputValue: '',
        isCompleted: false,
            loadingItems: false,
      }
      
    componentDidMount = () => {
        this.loadingItems()
    }

    newInputValue = value => {
        this.setState({
            inputValue: value
        })
    }

    loadingItems = async () => {
        try {
            const allItems = await AsyncStorage.getItem('Todos')
            this.setState({
                loadingItems: true,
                allItems: JSON.parse(allItems) || {}
            })
        } catch (err) {
            console.log(err)
        }
    }

    onDoneAddItem = () => {
        const { inputValue } = this.state
        if (inputValue !== '') {
            this.setState(prevState => {
                const id = uuid()
                const newItemObject = {
                    [id]: {
                        id,
                        isCompleted: false,
                        text: inputValue,
                        createdAt: Date.now()
                    }
                }
                const newState = {
                    ...prevState,
                    inputValue: '',
                    allItems: {
                        ...prevState.allItems,
                        ...newItemObject
                    }
                }
                this.saveItems(newState.allItems)
                return { ...newState }
            })
        }
    }

    deleteItem = id => {
        this.setState(prevState => {
            const allItems = prevState.allItems
            delete allItems[id]
            const newState = {
                ...prevState,
                ...allItems
            }
            this.saveItems(newState.allItems)
            return { ...newState }
        })
    }

    completeItem = id => {
        this.setState(prevState => {
            const newState = {
                ...prevState,
                allItems: {
                    ...prevState.allItems,
                    [id]: {
                        ...prevState.allItems[id],
                        isCompleted: true
                    }
                }
            }
            this.saveItems(newState.allItems)
            return { ...newState }
        })
    }

    incompleteItem = id => {
        this.setState(prevState => {
            const newState = {
                ...prevState,
                allItems: {
                    ...prevState.allItems,
                    [id]: {
                        ...prevState.allItems[id],
                        isCompleted: false
                    }
                }
            }
            this.saveItems(newState.allItems)
            return { ...newState }
        })
    }

    deleteAllItems = async () => {
        try {
            await AsyncStorage.removeItem('Todos')
            this.setState({ allItems: {} })
        } catch (err) {
            console.log(err)
        }
    }

    saveItems = newItem => {
        const saveItem = AsyncStorage.setItem('Todos', JSON.stringify(newItem))
    }
    
      render() {
        const { inputValue, loadingItems, allItems } = this.state
        const { title } = this.props

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

					{loadingItems ? (
						<ScrollView contentContainerStyle={styles.scrollableList}>
							{Object.values(allItems)
								.reverse()
								.map(item => (
									<List
										key={item.id}
										{...item}
										deleteItem={this.deleteItem}
										completeItem={this.completeItem}
										incompleteItem={this.incompleteItem}
									/>
								))}
						</ScrollView>
					) : (
						<ActivityIndicator size="large" color="white" />
					)}
				</View>
            </LinearGradient>
        )
    }
}

export default Main