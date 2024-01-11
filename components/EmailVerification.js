import React, { useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import firebase from "../database/Firebase";

const EmailVerification = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkEmailVerification = async () => {
      const user = firebase.auth().currentUser;

      if (user) {
        await user.reload();
        setIsLoading(false);

        if (user.emailVerified) {
          // Email is verified, navigate to the Dashboard or any other screen
          navigation.navigate("Dashboard");
        } else {
          // Email is not verified, show a message or handle accordingly
          console.log("Email is not verified!");
        }
      }
    };

    checkEmailVerification();
  }, [navigation]);

  const sendEmailVerification = async () => {
    try {
      const user = firebase.auth().currentUser;

      if (user) {
        await user.sendEmailVerification();
        console.log("Verification email sent successfully!");
      }
    } catch (error) {
      console.error("Error sending verification email:", error.message);
    }
  };

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text>Email Verification</Text>
          <Button
            title="Send Verification Email"
            onPress={sendEmailVerification}
          />
        </>
      )}
    </View>
  );
};

export default EmailVerification;
