import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { inputPlaceholder, white } from '../utils/styles/Colors'

const styles = StyleSheet.create({
  input: {
    paddingTop: 10,
    paddingRight: 15,
    fontSize: 34,
    color: white,
    fontWeight: '500'
  },
})

const Input = ({ inputValue, onChangeText, onDoneAddItem }) => (
  <TextInput
    style={styles.input}
    value={inputValue}
    onChangeText={onChangeText}
    placeholder="Type here to add note."
    placeholderTextColor={ 'white' }
    multiline={true}
    autoCapitalize="sentences"
    underlineColorAndroid="transparent"
    selectionColor={'white'}
    maxLength={30}
    returnKeyType="done"
    autoCorrect={false}
    blurOnSubmit={true}
    onSubmitEditing={onDoneAddItem}
  />
)

export default Input