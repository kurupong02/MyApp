import React from 'react';
import styled from 'styled-components';
import { StyleSheet, Text, View } from 'react-native';
import { Body, Card, CardItem, Button, Picker, Form, Item, Input, Label } from 'native-base';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Dropdown } from 'react-native-material-dropdown';
import moment from 'moment';
import Modal from "react-native-modal";
import API from '../api/api';

let data = [{
  value: 'รายรับ',
}, {
  value: 'รายจ่าย',
}
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      chosenDate: new Date(),
      selected: "รายรับ",
      titleName: "",
      price: ""
    };
  }


  addData =() =>{
    const { chosenDate, selected, titleName , price } = this.state
    console.log(chosenDate, selected, titleName , price)
    API.post('/items', {
      title: selected,
      des: titleName,
      value: price,
      date: chosenDate
    })
    .then(function (response) {

    })
    .catch(function (error) {
      
    });
  }
  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });

  };

  handleDatePicked = chosenDate => {
    this.setState({ chosenDate });
    this.hideDateTimePicker();
  };

  

  render() {
    return (
      <View>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />

        <Button title="Show modal" onPress={this.toggleModal} />
        <Modal isVisible={this.props.isModalVisible} onBackdropPress={this.props.handleModal}>
          <Card>
            <CardItem header bordered>
              <Text>Add List</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text onPress={this.showDateTimePicker}>{moment(this.state.chosenDate).format("MMM Do YY")}</Text>
                <View style={{ width: 100 }}>
                  <Dropdown
                    data={data}
                    value = {this.state.selected}
                    
                  />
                </View>
                <Item stackedLabel>
                  <Label>Username</Label>
                  <Input onChangeText={(titleName) => this.setState({ titleName })}  placeholder='รายละเอียด'/>
                </Item>
                <Item stackedLabel>
                  <Label>Price</Label>
                  <Input onChangeText={(price) => this.setState({ price })}  placeholder='รายละเอียด'/>
                </Item>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <TextAlign>
                <Button success onPress={this.addData}><Text> Add </Text></Button>
                <Button danger><Text> Cancel </Text></Button>
              </TextAlign>
            </CardItem>
          </Card>
        </Modal>
      </View>
      // <Body>
      //   <TopBody>

      //   </TopBody>
      //   <View style={styles.flex2}>
      //     <Text onPress={this.showDateTimePicker}>Button{this.state.chosenDate}sss</Text>
      //   </View>
      //   <View style={styles.flex3}></View>
      // </Body>


    );
  }
}


// const Body = styled.View`
// flex:1;
// 	background-color: papayawhip;
// 	justify-content: center;

// `;
const TopBody = styled.View`
  height: 100;
  backgroundColor: powderblue;

`;
const TextAlign = styled.View`
  justify-content : space-between;
  flexDirection: row;
  flex:1;
`;
const styles = StyleSheet.create({

  flex1: {
    height: 100,
    backgroundColor: 'powderblue'
  },
  flex2: {
    height: 150,
    backgroundColor: 'skyblue'
  },
  flex3: {
    height: 400,
    backgroundColor: 'steelblue'
  }

});
