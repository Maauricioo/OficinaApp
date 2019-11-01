import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function ItemOrcamento(props) {
    return (
        <TouchableOpacity onPress={() => props.setModalVisible()}>
            <View style={styles.tableTr}>
                <View style={styles.tableTd}>
                    <Text style={styles.text}>{props.item.customer}</Text>
                </View>
                <View style={styles.tableTd}>
                    <Text style={styles.text}>{props.item.value}</Text>
                </View>
                <View style={styles.tableTd}>
                    <Text style={styles.text}>{props.item.seller}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    tableTr:{
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ece7e7',
        borderRadius: 6,
        margin: 10,
        height: 50,
        backgroundColor:'#fff'
    },
    tableTd: {
        padding: 5,
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    text: {
        fontSize: 15
    }
})