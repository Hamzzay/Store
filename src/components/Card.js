import React from 'react'
import { View, Text, StyleSheet} from 'react-native'

export default function Card (props) {
    return(
        <View style={styles.view}>
            {props.children}
        </View>    
    )
}

const styles = StyleSheet.create({
    view: {
        borderColor: '#ddd',
        borderBottomWidth: 0,
        borderWidth: 1,
        borderRadius: 2,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 0,
        elevation: 2,
        flex:1,
        borderRadius:5
    },
})

