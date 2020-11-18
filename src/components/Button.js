import React, { PureComponent } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  ActivityIndicator,
  Platform,
  StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'

export default class Button extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    disabledText: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    style: PropTypes.any,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    disabledText: '',
    loading: false,
    disabled: false,
    style: undefined,
  }

  handlePress = (event) => {
    const { loading, disabled, onPress } = this.props

    if (loading || disabled) {
      return
    }

    if (onPress) {
      onPress(event)
    }
  }

  render() {
    const { text, disabledText, loading, disabled, style, ...rest } = this.props

    return (
      <TouchableHighlight
        {...rest}
        style={[styles.button, style]}
        underlayColor="rgba(0,0,0,0.5)"
        onPress={this.handlePress}>
          
        <View>
          {loading &&
            <ActivityIndicator
              animating
              size="small"
            />
          }
          {!loading && !disabled &&
            <Text style={{color: 'white'}}>
              {text}
            </Text>
          }
          {!loading && disabled &&
            <Text style={{color: 'white'}}>
              {disabledText || text}
            </Text>
           }
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 9,
    margin: 10,
    height: Platform.OS === 'ios' ? 35 : 40,
    minWidth: 170,
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#72bcd4',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingLeft:10,
    backgroundColor: '#72bcd4'
  },
})
