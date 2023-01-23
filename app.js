const inputNovaTarefa = document.getElementById("inputNovaTarefa");
const btnAddTarefa = document.getElementById("btnAddTarefa");
const listaTarefas = document.getElementById("listaTarefas");

const janelaEdicao = document.getElementById("janelaEdicao");
const janelaEdicaoFundo = document.getElementById("janelaEdicaoFundo");
const janelaEdicaoBtnFechar = document.getElementById("janelaEdicaoBtnFechar");
const inputTarefaNomeEdicao = document.getElementById("inputTarefaNomeEdicao");
const btnAtualizar = document.getElementById("btnAtualizar");
const idTarefaEdição = document.getElementById("idTarefaEdição");

const janelaAviso = document.getElementById("janelaAviso");
const containerAviso = document.getElementById("container-aviso");
// inputNovaTarefa.addEventListener('keypress', (e) => {
//     if(e.keyCode = 13) {
//         let tarefa = {
//             nome: inputNovaTarefa.ariaValueMax,
//             id: gerarId(),
//         }
//         adicionarTarefa(tarefa);
//     }
// })

btnAddTarefa.addEventListener('click', (e) => {
    if(inputNovaTarefa.value != ""){     
        let tarefa = {
            nome: inputNovaTarefa.value,
            id: gerarId(),
        }
        adicionarTarefa(tarefa);
    }
    else{
        avisoAparece();
    }
})

janelaEdicaoBtnFechar.addEventListener('click', alternarJanelaEdicao)

btnAtualizar.addEventListener('click', (e) =>{
    e.preventDefault();

    let idTarefa = idTarefaEdição.innerHTML.replace('#', '');

    let tarefa = {
        nome: inputTarefaNomeEdicao.value,
        id: idTarefa
    }

    let tarefaAtual = document.getElementById(''+idTarefa+'');

    if(tarefaAtual){
        let li = criarTagLi(tarefa);
        listaTarefas.replaceChild(li, tarefaAtual);
        alternarJanelaEdicao();
    } else {
        alert('Elemento HTML não encontrado')
    }
})

function gerarId () {
    return Math.floor(Math.random() * 3000);
}

function adicionarTarefa (tarefa) {
    li = criarTagLi(tarefa);
    listaTarefas.appendChild(li);
    inputNovaTarefa.value = '';
}

function criarTagLi(tarefa) {
    let li = document.createElement('li');
    li.id = tarefa.id;

    let span = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerHTML = tarefa.nome;

    let div = document.createElement('div');

    let btnEditar = document.createElement('button');
    btnEditar.classList.add('btnAcao');
    btnEditar.innerHTML = '<i class="fa fa-pencil"></i>';
    btnEditar.setAttribute('onclick', 'editar('+ tarefa.id +')');

    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    btnExcluir.setAttribute('onclick', 'excluir('+ tarefa.id +')');

    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);

    li.appendChild(span);
    li.appendChild(div);
    return li
}

function editar(tarefaId) {
    let li = document.getElementById('' + tarefaId + '');
    if(li) {
        alternarJanelaEdicao();
        inputTarefaNomeEdicao.value = li.innerText;
        idTarefaEdição.innerHTML = '#' + tarefaId;
    } else {
        alert('Elemento HTML não encontrado')
    }
}

function excluir(tarefaId) {
    let confirm = window.confirm('Tem certeza que deseja excluir?');
    if(confirm){
        let li = document.getElementById('' + tarefaId + '');
        if(li){
            listaTarefas.removeChild(li);
        }
    }
}

function alternarJanelaEdicao() {
    janelaEdicaoFundo.classList.toggle('abrir');
    janelaEdicao.classList.toggle('abrir');
}

function avisoAparece() {
    janelaAviso.classList.add('abrir');

    setTimeout(() => {
        janelaAviso.classList.remove('abrir');
    }, 5000)
}
