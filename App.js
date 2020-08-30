import React, { Component } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { render } from "react-dom";
import axios from "axios";

export default class App extends Component {

  state={
    res: [],
    showedCount: 0,
  }

  renderItem = ({ item }) => {
    return <View
    style = {{
      borderWidth: 1,
      margin: 10,
      padding: 5,
    }}
  >
    <Text>{item.text}</Text>
  </View>
  }

  componentDidMount() {
    const res = axios
    .get("https://cat-fact.herokuapp.com/facts")
    .then(res => {
      if (res.status === 200) {
        this.setState({
          res: res.data.all,
          showedCount: 3,
        });
      }
    });
  }


  onPressLearnMore = () => {
    const { state: { showedCount } } = this;
    this.setState({
      showedCount: showedCount + 3,
    });
  }

  render() {
    const { state: { res, showedCount } } = this;

    const factsToShow = res.slice(0, showedCount);
 
    return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          padding: 40,
        }}
      >
        <FlatList
          data={factsToShow}
          renderItem={this.renderItem}
          keyExtractor={item => item._id}
        />
      </View>
      <View
        style={{
          margin: 10,
        }}
      >
        <Button
          onPress={this.onPressLearnMore}
          title="Load More..."
        />
      </View>
    </View>
  );
  }
  
}
