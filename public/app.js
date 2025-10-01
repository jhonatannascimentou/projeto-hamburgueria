  import { criarCardTrello } from '../utils/pedidoUtils.js';

// Aguarda o conteúdo da página carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', function() {

  const form = document.getElementById('form-pedido');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita o reload da página ao enviar

    // 1. Pegar valores simples do formulário usando seus IDs
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const quantidadeCombos = document.getElementById('quantidadeCombos').value;
    const info_extra = document.getElementById('info_extra').value;
    const local = document.getElementById('local').value;
    const pagamento = document.getElementById('pagamento').value;

    // 2. Coletar detalhes de cada combo de forma estruturada
    const combos = [];
    // Itera de 1 até a quantidade de combos selecionada pelo usuário
    for (let i = 1; i <= parseInt(quantidadeCombos); i++) {
      // Pega as opções de ingredientes (checkboxes) para o combo atual
      const ingredientes = Array.from(
        document.querySelectorAll(`input[name="combo${i}"]:checked`)
      ).map(checkbox => checkbox.value);

      // Pega o ponto da carne (radio) para o combo atual
      // O '?' (optional chaining) evita erro se nenhum for selecionado
      const estadoCarne = document.querySelector(`input[name="estadoCombo${i}"]:checked`)?.value || 'Não selecionado';
      
      // Pega a bebida (radio) para o combo atual
      const refrigerante = document.querySelector(`input[name="refCombo${i}"]:checked`)?.value || 'Não selecionado';

      // Adiciona um objeto organizado ao array de combos
      combos.push({
        combo_numero: i,
        ingredientes: ingredientes,
        ponto_carne: estadoCarne,
        bebida: refrigerante
      });
    }

    // 3. Montar o objeto final para envio
    const pedido = {
      nome,
      telefone,
      quantidade: quantidadeCombos,
      detalhes_combos: combos, // Envia um array de objetos, muito mais fácil de processar no backend
      informacoes_adicionais: info_extra,
      local_consumo: local,
      forma_pagamento: pagamento
    };

    // Exibe o objeto no console para depuração. Você pode remover esta linha em produção.
    console.log('Dados a serem enviados:', JSON.stringify(pedido, null, 2));
    // Exporta apenas o nome do pedido para ser usado em outro módulo


    // Chama a função para criar o card no Trello
    criarCardTrello();

    // 4. Enviar para o servidor (simulação)
    // Substitua '/api/pedidos' pela URL real da sua API
    fetch('/api/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido) // Envia o objeto completo
    })
    .then(res => {
      if (!res.ok) {
        // Se a resposta do servidor não for de sucesso (ex: erro 400 ou 500)
        throw new Error(`Erro na requisição: ${res.statusText}`);
      }
      return res.json();
    })
    .then(data => {
      // Supondo que a API retorna um objeto com o ID do pedido, como { id: 123 }
      alert('Pedido enviado com sucesso! ID do Pedido: ' + data.id);
      form.reset(); // Limpa o formulário
    })
    .catch(err => {
      console.error('Falha ao enviar o pedido:', err);
      // Simula uma resposta de sucesso para fins de teste, já que não temos um backend real.
      // REMOVA as 3 linhas abaixo quando tiver uma API de verdade.
      alert('Simulação: Pedido enviado com sucesso! ID do Pedido: ' + Math.floor(Math.random() * 1000));
      form.reset();
      // Mantenha a linha abaixo para o caso de erro real.
      // alert('Ocorreu um erro ao enviar seu pedido. Por favor, tente novamente.');
    });
  });
  

});
    export const nomePedido = pedido.nome;