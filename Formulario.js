import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Formulario({ onSave, onCancel, registroEmEdicao }) {
  // AÇÃO: Estados atualizados para o tema "Frutas"
  const [bananas, setBananas] = useState('');
  const [macas, setMacas] = useState('');
  const [laranjas, setLaranjas] = useState('');

  useEffect(() => {
    if (registroEmEdicao) {
      // AÇÃO: Preenche o formulário com os dados do tema "Frutas"
      setBananas(String(registroEmEdicao.bananas));
      setMacas(String(registroEmEdicao.macas));
      setLaranjas(String(registroEmEdicao.laranjas));
    } else {
      // Limpa os campos se não estiver editando
      setBananas('');
      setMacas('');
      setLaranjas('');
    }
  }, [registroEmEdicao]);

  const handleSaveClick = () => {
    // AÇÃO: Envia os três novos valores (frutas) para o App.js
    onSave(bananas, macas, laranjas);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.subtitulo}>
        {registroEmEdicao ? 'Editando Registro' : 'Novo Registro de Frutas'}
      </Text>
      {/* AÇÃO: Inputs atualizados com placeholders e estados do tema "Frutas" */}
      <TextInput style={styles.input} placeholder="Quantidade de bananas" keyboardType="numeric" value={bananas} onChangeText={setBananas} />
      <TextInput style={styles.input} placeholder="Quantidade de maçãs" keyboardType="numeric" value={macas} onChangeText={setMacas} />
      <TextInput style={styles.input} placeholder="Quantidade de laranjas" keyboardType="numeric" value={laranjas} onChangeText={setLaranjas} />

      <TouchableOpacity style={styles.botao} onPress={handleSaveClick}>
        <Text style={styles.botaoTexto}>
          {registroEmEdicao ? 'Atualizar Registro' : 'Gravar Registro'}
        </Text>
      </TouchableOpacity>

      {registroEmEdicao && (
        <TouchableOpacity style={styles.botaoCancelar} onPress={onCancel}>
          <Text style={styles.botaoTexto}>Cancelar Edição</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    card: { backgroundColor: 'white', borderRadius: 8, padding: 15, marginHorizontal: 15, marginBottom: 20, elevation: 3 },
    subtitulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#34495e' },
    input: { borderWidth: 1, borderColor: '#cccccc', borderRadius: 5, padding: 12, fontSize: 16, marginBottom: 10 },
    // AÇÃO (Opcional): Cor do botão principal alterada para laranja
    botao: { backgroundColor: '#f39c12', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 5 },
    botaoTexto: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    botaoCancelar: { backgroundColor: '#7f8c8d', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 },
});