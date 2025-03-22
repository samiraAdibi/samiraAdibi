import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import testSamples from "../data/testSamples.json";
import { Colors } from "@/constants/Colors";
import CustomKeyboardAwareScrollView from "@/components/CustomKeyBoardAwareScrollView";

export default function Index() {
  const navigation = useNavigation();

  const [userInputs, setUserInputs] = useState(["", "", "", ""]);
  const [feedback, setFeedback] = useState([]);
  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (text, index) => {
    const updatedInputs = [...userInputs];
    updatedInputs[index] = text;
    setUserInputs(updatedInputs);
  };

  const checkAnswers = () => {
    const correctAnswers = testSamples?.testSamples[0]?.correctAnswer;
    const results = userInputs?.map(
      (input, index) =>
        input?.toLowerCase() === correctAnswers[index]?.toLowerCase()
    );
    setFeedback(results);
    setTimeLeft(180);
  };

  const resetQuiz = () => {
    setUserInputs(["", "", "", ""]);
    setFeedback([]);
    setTimeLeft(180);
  };

  useEffect(() => {
    navigation.setOptions({ headerShown: false }); // Hide default header
  }, [navigation]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.light.background,
      }}
    >
      {/* Custom Header */}
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={48} color="black" />
        <Text style={styles.title}>Test</Text>
        <Ionicons name="settings-outline" size={24} color="black" />
      </View>
      <CustomKeyboardAwareScrollView>
        <Text style={styles.question}>
          Complete the sentence{"\n"}with the correct word
        </Text>
        <Text style={styles.mainQuestion}>
          {testSamples.testSamples[0].text.split(" ").map((word, index) => {
            if (word.includes("_")) {
              return (
                <TextInput
                  key={index}
                  style={[
                    styles.input,
                    feedback[index] !== undefined && {
                      backgroundColor: feedback[index] ? "lightgreen" : "pink",
                    },
                  ]}
                  value={userInputs[index]}
                  onChangeText={(text) => handleInputChange(text, index)}
                  maxLength={
                    testSamples?.testSamples[0]?.correctAnswer[index]?.length
                  }
                />
              );
            }
            return ` ${word} `;
          })}
        </Text>

        <Text style={[styles.timer, timeLeft === 0 && { color: "#000000" }]}>
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </Text>
      </CustomKeyboardAwareScrollView>
      {feedback?.length === 0 && timeLeft !== 0 ? (
        <TouchableOpacity onPress={checkAnswers} style={styles.btn}>
          <Text style={styles.txtButton}>Submit</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={resetQuiz} style={styles.btn}>
          <Text style={styles.txtButton}>Reset</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: "100%",
    justifyContent: "space-between",
  },

  question: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    backgroundColor: "#DFDFDF",
    textAlign: "center",
    marginVertical: 20,
    padding: 10,
  },

  mainQuestion: { fontSize: 18, marginVertical: 20, marginHorizontal: 20 },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    borderBottomWidth: 1,
    width: 50,
    fontSize: 18,
    textAlign: "center",
    marginHorizontal: 5,
  },

  timer: {
    fontSize: 48,
    textAlign: "center",
    marginVertical: 20,
    color: "#D94A37",
    fontWeight: "400",
    marginTop: "30%",
  },

  btn: {
    borderRadius: 5,
    width: "90%",
    backgroundColor: "#000000",
    padding: 10,
    marginBottom: 10,
    alignSelf: "center",
    alignItems: "center",
  },

  txtButton: {
    color: "white",
    fontWeight: "bold",
  },
});
