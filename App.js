import React, { useState } from "react";
import { View, Image, Text, Button, TextInput, FlatList } from "react-native";

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      .then((response) => response.json())
      .then((data) => setRecipes(data.meals))
      .catch((error) => {
        Alert.alert("Error", error);
      });
  };

  return (
    <View>
      <TextInput
        style={{ fontSize: 18, width: 200 }}
        placeholder="Enter an ingridient"
        value={keyword}
        onChangeText={(text) => setKeyword(text)}
      />
      <Button title="Find" onPress={getRecipes} />
      <FlatList
        keyExtractor={(meal, index) => index.toString()}
        renderItem={({ item: meal }) => (
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {meal.strMeal}
            </Text>
            <Image
              source={{ uri: meal.strMealThumb }}
              style={{ width: 200, height: 200 }}
            />
          </View>
        )}
        data={recipes}
      />
    </View>
  );
}
