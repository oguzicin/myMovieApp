import { Ionicons } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native";
import useMovies from "../hooks/useMovies";


export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { results, searchMovies } = useMovies();
  const router = useRouter();

  useEffect(() => {
    if (query.length > 1) {
      searchMovies(query);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [query]);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#1f1f1f",
          borderRadius: 8,
          paddingHorizontal: 10,
        }}
      >
        <TextInput
          style={{ flex: 1, color: "#fff", paddingVertical: 10 }}
          placeholder="Search for a movie..."
          placeholderTextColor="#aaa"
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity onPress={() => Keyboard.dismiss()}>
          <Ionicons name="search" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {showDropdown && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setShowDropdown(false);
                router.push(`/movie/${item.id}` as Href);

              }}
              style={{ paddingVertical: 8, borderBottomWidth: 0.5, borderColor: "#333" }}
            >
              <Text style={{ color: "#fff" }}>{item.title}</Text>
            </TouchableOpacity>
          )}
          style={{
            backgroundColor: "#1f1f1f",
            borderRadius: 8,
            marginTop: 5,
            maxHeight: 200,
          }}
        />
      )}
    </View>
  );
}
