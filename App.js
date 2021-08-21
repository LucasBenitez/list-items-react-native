import { StatusBar } from "expo-status-bar";
import React, { useState }  from "react";
import {
  StyleSheet,
  TextInput,
  Button,
  Text,
  View,
  FlatList,
  Modal,
} from 'react-native';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [inputError, setInputError] = useState('');
  const [itemList, setItemList] = useState([]);

  const [itemSelected, setItemSelected] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const handleChangeText = (text) => {
    setInputText(text)
    setInputError('');
  };

  const handleAddItem = () => {
    if (inputText) {
      setItemList([
        ...itemList,
        {
          id: Math.random().toString(),
          value: inputText,
        },
      ]);
      setInputText('');
      setInputError('');
    } else {
      setInputError('Required');
    }
  }

  const handleConfirmDelete = () => {
    const id = itemSelected.id;
    setItemList(itemList.filter(item => item.id !== id));
    setModalVisible(false);
    setItemSelected({});
  }

  const handleModal = id => {
    setItemSelected(itemList.find(item => item.id === id));
    setModalVisible(true);
  }
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput 
          placeholder="Item de lista" 
          style={styles.input}
          onChangeText={handleChangeText}
          value={inputText} 
          />
          <Button 
          title="ADD" 
          olor="#323232" 
          onPress={handleAddItem}
          />
        </View>
        <Text style={styles.inputError}>{inputError}</Text>
      <FlatList
        data={itemList}
        renderItem={data => {
          return (
            <View style={[styles.item, styles.shadow]}>
              <Text>{data.item.value}</Text>
              <Button
                title="X"
                color="#AAAAAA"
                onPress={() => handleModal(data.item.id)}
              />
            </View>
          );
        }}
        keyExtractor={item => item.id}
      /><Modal animationType="slide" visible={modalVisible} transparent>
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, styles.shadow]}>
          <Text style={styles.modalMessage}>¿Está seguro que desea borrar?</Text>
          <Text style={styles.modalTitle}>{itemSelected.value}</Text>
          <View>
            <Button
              onPress={handleConfirmDelete}
              title="CONFIRMAR"
            />
          </View>
        </View>
      </View>
    </Modal>
    <StatusBar style="auto" />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: 200,
  },
  button: {
    width: 50,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  screen: {
    padding: 30,
    backgroundColor: '#F0F0F0',
    flex: 1,
  },
  inputError: {
    color: 'red',
  },
  items: {
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    padding: 30,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalMessage: {
    fontSize: 18,
  },
  modalTitle: {
    fontSize: 30,
    marginTop: 10,
    marginBottom: 20,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
