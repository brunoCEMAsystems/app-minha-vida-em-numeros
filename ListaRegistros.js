import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// AÇÃO: Recebe a nova prop "onEdit"
export default function ListaRegistros({ registros, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.subtitulo}>Histórico de Registros</Text>
      {/* AÇÃO: Agora usa a prop "registros" que já vem ordenada do App.js */}
      {registros.length > 0 ? registros.map(reg => (
        <View key={reg.id} style={styles.itemHistorico}>
          <Text style={styles.itemTexto}>
            <Text style={{fontWeight: 'bold'}}>{reg.data} - </Text>
            🍌 {reg.bananas}, 🍎 {reg.macas}, 🍊 {reg.laranjas}
          </Text>
          <View style={styles.botoesAcao}>
            {/* AÇÃO: Botão de Editar adicionado, chamando a função onEdit */}
            <TouchableOpacity style={styles.botaoEditar} onPress={() => onEdit(reg)}>
              <Text style={styles.botaoTextoAcao}>✎</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoDelete} onPress={() => onDelete(reg.id)}>
              <Text style={styles.botaoTextoAcao}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      )) : (
        <Text style={styles.itemTexto}>Nenhum registro de fruta encontrado.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    card: { backgroundColor: 'white', borderRadius: 8, padding: 15, marginHorizontal: 15, marginBottom: 20, elevation: 3 },
    subtitulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#34495e' },
    itemHistorico: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#eee' },
    itemTexto: { fontSize: 16, color: '#333', flex: 1, marginRight: 10 },
    botoesAcao: { flexDirection: 'row' },
    botaoEditar: { backgroundColor: '#3498db', borderRadius: 15, width: 30, height: 30, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
    botaoDelete: { backgroundColor: '#e74c3c', borderRadius: 15, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' },
    botaoTextoAcao: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});