import React from 'react';
import styled from 'styled-components';
import { StyleSheet, Text, View ,FlatList} from 'react-native';
import { Container, Header, Left, Body, Right, Title, Subtitle, Fab } from 'native-base';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import Modal from './components/modal'
import API from './api/api'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      chosenDate: new Date(),
      isModalVisible:false,
      data:[]
    };
  }
  
  componentDidMount() {
    const _this = this
    API.get('/items')
    .then(function (response) {
      // handle success
      console.log(response.data);
      _this.setState({data:response.data})
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  }

  handleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible});
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
      <Container style={{ backgroundColor: "steelblue" }}>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
        <Header>
          <Text onPress={this.showDateTimePicker}>{moment(this.state.chosenDate).format("MMM Do YY")}</Text>
        </Header>
        <View style={styles.flex2}>
          <TextAlign>
            <Text>รายรับ</Text><Text>รายจ่าย</Text>
          </TextAlign>
          <TextAlign>
            <Text>รายรับ</Text><Text>รายจ่าย</Text>
          </TextAlign>
          <TextAlign>
            <Text>รายรับ</Text><Text>รายจ่าย</Text>
          </TextAlign>
        </View>
        <View>
        <FlatList
    keyExtractor={(item, index) => index.toString()}
    data={this.state.data}
  renderItem={({item}) => <Text>{item.title}</Text>}
/>
        </View>
        <Fab
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={this.handleModal}>
            <Text>+</Text>
          </Fab>
          <Modal isModalVisible={this.state.isModalVisible} handleModal={this.handleModal}/>
      </Container>
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
