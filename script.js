// ============================================
// Versao 2: dados persistidos no localStorage
// ============================================

// Chave usada para salvar os alunos no localStorage
const CHAVE = 'alunos';

// Carrega os alunos salvos ou começa com um array vazio
let alunos = JSON.parse(localStorage.getItem(CHAVE)) || [];

// Salva o array atual no localStorage
function salvar() {
  localStorage.setItem(CHAVE, JSON.stringify(alunos));
}

// Referencias aos elementos da pagina
const formulario = document.getElementById('form-aluno');
const corpoTabela = document.getElementById('corpo-tabela');
const aviso = document.getElementById('sem-registros');

// Quando o formulario for enviado, adiciona um aluno
formulario.addEventListener('submit', (evento) => {
  evento.preventDefault(); // evita recarregar a pagina

  const aluno = {
    nome: document.getElementById('campo-nome').value,
    curso: document.getElementById('campo-curso').value,
    ra: document.getElementById('campo-ra').value
  };

  alunos.push(aluno);  // adiciona no array
  salvar();            // persiste no localStorage
  formulario.reset();  // limpa os campos
  renderizar();        // atualiza a tabela
});

// Exclui um aluno pela posicao no array
function excluirAluno(indice) {
  alunos.splice(indice, 1);
  salvar();            // persiste no localStorage
  renderizar();
}

// Desenha o array na tabela
function renderizar() {
  corpoTabela.innerHTML = '';

  alunos.forEach((aluno, indice) => {
    const linha = document.createElement('tr');

    linha.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.curso}</td>
      <td>${aluno.ra}</td>
      <td><button class="excluir" onclick="excluirAluno(${indice})">Excluir</button></td>
    `;

    corpoTabela.appendChild(linha);
  });

  aviso.style.display = alunos.length === 0 ? 'block' : 'none';
}

renderizar();