// CÓDIGO CORRIGIDO E COMPLETO
import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function Grafico({ registros }) {
  if (registros.length < 2) {
    return (
      <View style={styles.card}>
        <Text style={styles.infoTexto}>
          Adicione pelo menos 2 registros para ver o gráfico de evolução.
        </Text>
      </View>
    );
  }

  const registrosParaGrafico = [...registros].sort((a, b) => a.id - b.id);

  const data = {
    labels: registrosParaGrafico.map(reg => new Date(reg.id).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })), 
    datasets: [
      {
        data: registrosParaGrafico.map(reg => reg.bananas),
      },
    ],
  };

  return (
    <View style={styles.card}>
      <Text style={styles.tituloGrafico}>Evolução (Bananas)</Text>
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 40}
        height={220}
        yAxisSuffix=" 🍌"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: '#f39c12',
          backgroundGradientFrom: '#f1c40f',
          backgroundGradientTo: '#f39c12',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: { r: '6', strokeWidth: '2', stroke: '#c0392b' },
        }}
        bezier
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: 'white', borderRadius: 8, padding: 10, marginHorizontal: 15, marginBottom: 20, elevation: 3, alignItems: 'center' },
  tituloGrafico: { textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: '#34495e', marginBottom: 5 },
  infoTexto: { textAlign: 'center', margin: 10, fontStyle: 'italic', color: '#555' },
});