import React, { Component } from 'react'
import { View, Text, FlatList, Modal, TouchableOpacity, StyleSheet, BackHandler } from 'react-native'
import ItemOrcamento from '../components/ItemOrcamento'
import Axios from 'axios'

export default class AcompanhamentoOrçamento extends Component {

    state = {
        listaOrcamento: [],
        modalVisible: false,
        itemModal: null
    }

    componentDidMount() {
        this.getUrl()
    }

    //Busca dados
    getUrl = () => {
        try {
            Axios.get('https://my-json-server.typicode.com/codificar/oficina/proposals')
                .then((res) => {
                    if (res) this.setState({ listaOrcamento: res.data })
                }).catch((res) => {
                    return alert('Erro ao estabelecer conexão')
                })
        } catch (er) {
            alert('Ocorreu algum erro, por favor reinicie a aplicação')
        }
    }

    //Exibe modal
    setModalVisibles = (item) => {
        this.setState({ modalVisible: !this.state.modalVisible, itemModal: item });
    }

    //JSX Modal
    modal = () => (
        <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => this.setState({ modalVisible: false })}
        >
            <View style={styles.containerModal}>
                <View style={styles.modalTitle}>
                    <Text>Descrição</Text>
                </View>
                <View style={styles.modalDescription}>
                    {
                        this.state.itemModal &&
                        (
                            <Text style={styles.modalText}>{this.state.itemModal.description}</Text>
                        )
                    }
                </View>
                <View style={styles.containerBtnModal}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setModalVisibles();
                        }}>
                        <View style={styles.btnModal}>
                            <Text style={styles.textBtnModal}>x</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.tableHeader}>
                    <View style={styles.tableTitle}>
                        <Text style={styles.title}>Cliente</Text>
                    </View>
                    <View style={styles.tableTitle}>
                        <Text style={styles.title}>Valor</Text>
                    </View>
                    <View style={styles.tableTitle}>
                        <Text style={styles.title}>Vendedor</Text>
                    </View>
                </View>
                <FlatList
                    data={this.state.listaOrcamento}
                    renderItem={({ item }) =>
                        <ItemOrcamento
                            item={item}
                            setModalVisible={() => this.setModalVisibles(item)}
                        />}
                    keyExtractor={(item) => String(item.id)}
                />
                {this.modal()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f7f7'
    },
    tableHeader: {
        flexDirection: 'row',
        marginRight: 10,
        marginLeft: 10
    },
    tableTitle: {
        flex: 1,
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 18,
        borderBottomWidth: 1,
        margin: 13,
        paddingBottom: 10
    },
    containerModal: {
        flex: 1,
        backgroundColor: '#ece7e7',
    },
    modalTitle: {
        fontSize: 18,
        borderBottomWidth: 1,
        margin: 13,
        paddingBottom: 10,
        alignItems: 'center'
    },
    modalDescription: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ece7e7',
        borderRadius: 6,
        margin: 10,
        height: 50,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    modalText: {
        fontSize: 15
    },
    containerBtnModal: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    btnModal: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBtnModal: {
        fontSize: 30,
        color: 'white',
        paddingBottom: 6
    }
})