import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import firebase from "../database/Firebase";

const Signup = ({ navigation }) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateInputVal = (val, prop) => {
    switch (prop) {
      case "displayName":
        setDisplayName(val);
        break;
      case "email":
        setEmail(val);
        break;
      case "password":
        setPassword(val);
        break;
      default:
        break;
    }
  };

  const registerUser = () => {
    console.log("Signing up...");
    if (email === "" || password === "") {
      Alert.alert("Enter details to signup!");
    } else {
      setIsLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          console.log("User registered successfully!", res.user);
          res.user.updateProfile({
            displayName: displayName,
          });
          setIsLoading(false);
          setDisplayName("");
          setEmail("");
          setPassword("");
          navigation.navigate("EmailVerification"); // Navigate to the email verification screen
        })
        .catch((error) => {
          console.error("Error during sign-up:", error.message);
          setIsLoading(false);
          setErrorMessage(error.message);
        });
    }
  };

  if (isLoading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Name"
        value={displayName}
        onChangeText={(val) => updateInputVal(val, "displayName")}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Email"
        value={email}
        onChangeText={(val) => updateInputVal(val, "email")}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Password"
        value={password}
        onChangeText={(val) => updateInputVal(val, "password")}
        maxLength={15}
        secureTextEntry={true}
      />
      <Button color="#3740FE" title="Signup" onPress={registerUser} />
      <Text
        style={styles.loginText}
        onPress={() => navigation.navigate("Login")}
      >
        Already Registered? Click here to login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: "#fff",
  },
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  loginText: {
    color: "#3740FE",
    marginTop: 25,
    textAlign: "center",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});

export default Signup;
