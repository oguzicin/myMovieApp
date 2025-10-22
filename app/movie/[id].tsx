import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const API_KEY = "890ca110";

export default function MovieDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);
  const { width: SCREEN_WIDTH } = Dimensions.get("window");
  const headerFontSize = SCREEN_WIDTH * 0.08; // ekran genişliğine göre boyut

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie)
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#fff" />;

  const genres = movie.Genre ? movie.Genre.split(", ") : [];
  const rottenRating = movie.Ratings?.find(
    (r: any) => r.Source === "Rotten Tomatoes"
  );

  return (
    <LinearGradient
      colors={["#000000", "#290404", "#400707", "#000000"]}
      style={styles.gradientParent}
    >
      {/* Moviez Başlığı */}
      <Text style={[styles.moviezHeader]}>m o v i e z</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {movie.Poster && movie.Poster !== "N/A" && (
          <Image source={{ uri: movie.Poster }} style={styles.image} />
        )}

        <Text style={styles.title}>{movie.Title}</Text>
        <Text style={styles.year}>{movie.Year}</Text>

        {/* 🎬 Genre Tags */}
        <View style={styles.genreContainer}>
          {genres.map((genre: string, index: number) => (
            <View key={index} style={styles.genreTag}>
              <Text style={styles.genreText}>{genre}</Text>
            </View>
          ))}
        </View>

        {/*  Rotten Tomatoes Rating */}
        {movie.Ratings &&
          movie.Ratings.map((rating: any, index: number) => {
            if (rating.Source === "Rotten Tomatoes") {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 0,
                  }}
                >
                  <Text style={{ fontSize: 20, marginRight: 6, opacity:0.8 }}>🍅</Text>
                  <Text
                    style={{
                      color: "#FA320A",
                      fontSize: 16,
                      fontWeight: "600",
                      paddingTop:4,
                      opacity:0.8
                    }}
                  >
                    {rating.Value}
                  </Text>
                </View>
              );
            }
            return null;
          })}

        <Text style={styles.sectionTitle}>Plot</Text>
        <Text style={styles.overview}>{movie.Plot}</Text>

        <Text style={styles.sectionTitle}>Runtime</Text>
        <Text style={styles.info}>{movie.Runtime}</Text>

        <Text style={styles.sectionTitle}>Director</Text>
        <Text style={styles.info}>{movie.Director}</Text>

        <Text style={styles.sectionTitle}>Writer</Text>
        <Text style={styles.info}>{movie.Writer}</Text>

        <Text style={styles.sectionTitle}>Actors</Text>
        <Text style={styles.info}>{movie.Actors}</Text>

        <Text style={styles.sectionTitle}>Language</Text>
        <Text style={styles.info}>{movie.Language}</Text>

        <Text style={styles.sectionTitle}>Country</Text>
        <Text style={styles.info}>{movie.Country}</Text>

        <Text style={styles.sectionTitle}>Awards</Text>
        <Text style={styles.info}>{movie.Awards}</Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientParent: {
    flex: 1,
  },
  moviezHeader: {
    fontFamily: "BBHSansBartle",
    color: "lightgrey",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 10,
    fontSize: 18,
  },
  scrollContent: {
    padding: 10,
    paddingBottom: 40,
  },
  image: { marginTop: 0, width: "100%", height: 435, borderRadius: 8 },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
    textAlign: "center",
    fontFamily: "MontserratRegular",
  },

  year: { fontSize: 16, color: "#ccc", textAlign: "center", marginBottom: 10 },

  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 8,
  },
  genreTag: {
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 3,
    opacity: 0.85,
  },
  genreText: {
    color: "lightgrey",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "MontserratRegular",
  },

  rottenContainer: {
    flexDirection: "row", // emoji ve metni yan yana koy
    justifyContent: "center", // yatayda ortala
    alignItems: "center", // dikeyde ortala
    marginTop: 12,
    borderWidth:20,
  },
  rottenEmoji: {
    fontSize: 10,
    marginRight: 6, // metin ile emoji arası boşluk
  },
  rottenText: {
    color: "#FA320A", // Rotten Tomatoes teması
    fontSize: 160,
    borderWidth:20,
    fontWeight: "600",
    fontFamily: "MontserratRegular",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginTop: 16,
    marginBottom: 6,
    fontFamily: "MontserratRegular",
  },
  overview: {
    fontSize: 16,
    color: "#ddd",
    marginBottom: 12,
    lineHeight: 22,
    fontFamily: "MontserratRegular",
  },
  info: {
    fontSize: 15,
    color: "#bbb",
    paddingBottom: 8,
    fontFamily: "MontserratRegular",
  },
});
