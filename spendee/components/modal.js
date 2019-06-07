import React from 'react';
import styled from 'styled-components';
import { StyleSheet, Text, View } from 'react-native';
import { Body, Card, CardItem, Button, Picker, Form } from 'native-base';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Dropdown } from 'react-native-material-dropdown';
import moment from 'moment';
import Modal from "react-native-modal";

let data = [{
  value: 'Banana',
}, {
  value: 'Mango',
}, {
  value: 'Pear',
}];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      chosenDate: new Date(),
      selected: "key1"
    };
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
        <Modal isVisible={true}>
          <Card>
            <CardItem header bordered>
              <Text>Add List</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text onPress={this.showDateTimePicker}>{moment(this.state.chosenDate).format("MMM Do YY")}</Text>
                <Dropdown
                  label='Favorite Fruit'
                  data={data}
                />
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <TextAlign>
                <Button success><Text> Add </Text></Button>
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
  justify-content : space-around;
  flexDirection: row
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
