import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import firebase from "../database/Firebase";

const Dashboard = ({ navigation }) => {
  const [displayName, setDisplayName] = useState("");
  const [uid, setUid] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      setDisplayName(user.displayName);
      setUid(user.uid);
    }
  }, []);

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => setErrorMessage(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Hello, {displayName}</Text>
      <Button color="#3740FE" title="Logout" onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 35,
    backgroundColor: "#fff",
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20,
  },
});

export default Dashboard;
