import React from 'react';

import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  calculateScore,
  clearResults,
  setAnswer,
} from '../redux/questionnaireSlice';
import {questions} from '../utils/constants';

const QuestionnaireScreen = ({ navigation } : any) => {
  const dispatch = useDispatch();
  const answers = useSelector((state : any) => state.questionnaire.answers);

  const handleSelectOption = (questionId : number, optionIndex : number) => {
    const score = questions.find((q : any) => q.id === questionId).scores[optionIndex];
    dispatch(setAnswer({ questionId, score }));
  };

  const handleSubmit = () => {
    dispatch(calculateScore());
    navigation.navigate('Result');
  };
  const onPressClear = ()=>{
    dispatch(clearResults());
  }

  return (
    <View style={{flex:1}}>
      <FlatList
        data={questions}
        keyExtractor={(item) => item.id}
        renderItem={({ item } : any) => (
          <View>
            <View style={styles.QuestionRowStyle}>
            <Text>{item.question}</Text>
            </View>
            {item.options.map((option : any, index : number) => (
              <Button
                key={index}
                title={option}
                onPress={() => handleSelectOption(item.id, index)}
              />
            ))}
          </View>
        )}
      />
      <View style={styles.buttonWrapView}>
        <TouchableOpacity style={[styles.button]} onPress={handleSubmit}>
            <Text style={styles.buttonText}>{"Submit"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]} onPress={onPressClear}>
            <Text style={styles.buttonText}>{"Clear"}</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

export default QuestionnaireScreen;
const styles = StyleSheet.create({
    QuestionRowStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 20,
      paddingHorizontal:10,
      margin: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5, // For Android shadow
    },
    buttonWrapView:{
        flexDirection:'row',
        paddingHorizontal:20,
        paddingVertical:15,
       justifyContent:"space-between",
       shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        paddingHorizontal:50,
        marginHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5, // for Android shadow
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
  });