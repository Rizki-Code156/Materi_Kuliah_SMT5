import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.biodata}>
        <Text>NAMA: Rizki Aidil Fazri</Text>
        <Text>Tempat, Tanggal Lahir: Cirebon, 03-11-2005</Text>
        <Text>Cita-Cita: Game Developer</Text>
        <Text>Rencana Hidup: Sukses duniawi dan akhirat</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  biodata: {
    alignItems: 'flex-start',
  },
});