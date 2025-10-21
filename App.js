import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import * as Database from './services/Database';
import Formulario from './components/Formulario';
import ListaRegistros from './components/ListaRegistros';
// DESAFIO 2: Importa o novo componente de Gráfico
import Grafico from './components/Grafico';

export default function App() {
  const [registros, setRegistros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  
  // DESAFIO FINAL: Substitui 'editingId' por um estado que guarda o objeto inteiro
  const [registroEmEdicao, setRegistroEmEdicao] = useState(null);
  // DESAFIO 1: Estado para controlar a ordenação da lista
  const [ordenacao, setOrdenacao] = useState('recentes');

  useEffect(() => {
    const init = async () => {
      const dados = await Database.carregarDados();
      setRegistros(dados);
      setCarregando(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (!carregando) {
      Database.salvarDados(registros);
    }
  }, [registros, carregando]);

  // DESAFIO FINAL: Função de salvar atualizada para lidar com CRIAÇÃO e ATUALIZAÇÃO
  const handleSave = (bananas, macas, laranjas) => {
    const bananasNum = parseInt(String(bananas)) || 0;
    const macasNum = parseInt(String(macas)) || 0;
    const laranjasNum = parseInt(String(laranjas)) || 0;

    if (bananasNum < 0 || macasNum < 0 || laranjasNum < 0) {
      return Alert.alert("Erro", "Nenhuma quantidade pode ser negativa.");
    }

    if (registroEmEdicao) {
      // MODO DE ATUALIZAÇÃO
      const registrosAtualizados = registros.map(reg =>
        reg.id === registroEmEdicao.id
          ? { ...reg, bananas: bananasNum, macas: macasNum, laranjas: laranjasNum }
          : reg
      );
      setRegistros(registrosAtualizados);
      Alert.alert('Sucesso!', 'Registro atualizado!');
    } else {
      // MODO DE CRIAÇÃO
      const novoRegistro = { 
        id: new Date().getTime(), 
        data: new Date().toLocaleDateString('pt-BR'),
        bananas: bananasNum, macas: macasNum, laranjas: laranjasNum 
      };
      setRegistros([...registros, novoRegistro]);
      Alert.alert('Sucesso!', 'Registro de frutas salvo!');
    }
    setRegistroEmEdicao(null); // Limpa o estado de edição após salvar
  };

  const handleDelete = (id) => {
    setRegistros(registros.filter(reg => reg.id !== id));
    Alert.alert('Sucesso!', 'O registro foi deletado.');
  };

  // DESAFIO FINAL: Funções para controlar o modo de edição
  const handleIniciarEdicao = (registro) => {
    setRegistroEmEdicao(registro);
  };
  const handleCancelarEdicao = () => {
    setRegistroEmEdicao(null);
  };
  
  const exportarDados = async () => { /* ...código de exportar sem alterações... */ };

  // DESAFIO 1: Lógica de ordenação antes da renderização
  let registrosExibidos = [...registros]; // Copia para não modificar o estado original
  if (ordenacao === 'maior_bananas') {
    // Ordena pela quantidade de bananas, do maior para o menor
    registrosExibidos.sort((a, b) => b.bananas - a.bananas);
  } else {
    // Ordenação padrão: mais recentes primeiro
    registrosExibidos.sort((a, b) => b.id - a.id);
  }

  if (carregando) {
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#f39c12" /></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.titulo}>Meu Diário de Frutas 🍎</Text>
        <Text style={styles.subtituloApp}>Controle seu consumo diário</Text>

        {/* DESAFIO 2: Renderiza o componente de Gráfico */}
        <Grafico registros={registros} />

        <Formulario 
          onSave={handleSave}
          onCancel={handleCancelarEdicao}
          registroEmEdicao={registroEmEdicao}
        />

        {/* DESAFIO 1: Botões de Filtro/Ordenação */}
        <View style={styles.filtrosContainer}>
            <TouchableOpacity style={[styles.botaoFiltro, ordenacao === 'recentes' && styles.botaoFiltroAtivo]} onPress={() => setOrdenacao('recentes')}>
                <Text style={styles.botaoFiltroTexto}>Mais Recentes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.botaoFiltro, ordenacao === 'maior_bananas' && styles.botaoFiltroAtivo]} onPress={() => setOrdenacao('maior_bananas')}>
                <Text style={styles.botaoFiltroTexto}>Mais Bananas</Text>
            </TouchableOpacity>
        </View>

        <ListaRegistros 
          registros={registrosExibidos}
          onEdit={handleIniciarEdicao}
          onDelete={handleDelete}
        />
        
        {/* ...bloco de exportar dados sem alterações... */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === 'android' ? 25 : 0, backgroundColor: '#fffbe0' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, color: '#c0392b' },
  subtituloApp: { textAlign: 'center', fontSize: 16, color: '#555', marginTop: -20, marginBottom: 20, fontStyle: 'italic' },
  // Estilos para os botões de filtro
  filtrosContainer: { flexDirection: 'row', justifyContent: 'center', marginHorizontal: 15, marginBottom: 10, gap: 10 },
  botaoFiltro: { backgroundColor: '#bdc3c7', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20 },
  botaoFiltroAtivo: { backgroundColor: '#c0392b' },
  botaoFiltroTexto: { color: 'white', fontWeight: 'bold' },
});