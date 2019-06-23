var tbody = document.querySelector('tbody'),
    adicionar = document.querySelector('#adicProduct');
    

var contLine = 0;

// Aqui eu atribuo a quantidade de dados já existentes no localStorage para que ele não começe a contagem das linhas do zero, e sim do numero corrente de linhas.
for (var key in localStorage) {
    if(localStorage.getItem(key)) {
        contLine++;
    }
}

// Fica escutando um evento de click no botão de adicionar para quando ele for clicado     
adicionar.addEventListener('click', (e) => {
    e.preventDefault();
    var inputs = document.querySelectorAll('input');

    let string = parseString(inputs);
    salvarLocalStorege(inputs[0].value ,string);
    contLine++;
    // console.table(renderizaTable());
    renderizaTable(parseJson());
    console.log(parseJson())
    setTimeout(() => {

        window.location.reload();
    }, 400);
});

// Transforma o array de valores dos inputs em String para ser armazenado no localStorage.
function parseString(inputs) {
    let array = [];
    inputs.forEach((item, index) => {
        var obj = {}
        obj[item.name] = item.value;
        array.push(obj);
    });
    return JSON.stringify(array);
}

// Salva cada linha com a chave diferente para poder diferenciar depois.
function salvarLocalStorege(cod,inputs) {
    // localStorage.setItem(`Linha-${contLine}`,inputs);
    localStorage.setItem(cod, inputs);
}

function parseJson() {
    let array = [];
    for (var key in localStorage) {
        if(localStorage.getItem(key)){
            array.push(JSON.parse(localStorage.getItem(key)));
        }
    }
    return array;
}

function renderizaTable(array) {
    array.map((arr) => {
        var tr = document.createElement('tr');
        arr.map((item) => {
            
            for (var key in item) {
                
                let td = document.createElement('td');
                td.innerHTML = item[key];
                tr.appendChild(td);
            }
        })
        let tdEdit = document.createElement('td');
        tdEdit.innerHTML = 'Editar';
        tdEdit.setAttribute('class', 'editar-td');
        tr.appendChild(tdEdit);

        let tdExclui = document.createElement('td');
        tdExclui.innerHTML = 'Excluir';
        tdExclui.setAttribute('class', 'excluir-td');
        tr.appendChild(tdExclui);

        tbody.appendChild(tr);
    });

}

function editarTd() {
    var tds = document.querySelectorAll('.editar-td');
    var codigo = document.querySelector('#codProduct'),
        produto = document.querySelector('#product'),
        tipo = document.querySelector('#tipeProduct'),
        quantidade = document.querySelector('#qtdeProduct'),
        valor = document.querySelector('#valorProduct'),
        descricao = document.querySelector('#descProduct');    
    tds.forEach((td) => {
        td.addEventListener('click', () => {
            let cod = td.parentElement.firstElementChild.innerText,
                dados = JSON.parse(localStorage.getItem(cod));
                codigo.value = dados[0].codigo;
                produto.value = dados[1].produto;
                tipo.value = dados[2].tipo;
                quantidade.value = dados[3].qtd;
                valor.value = dados[4].valor;
                descricao.value = dados[5].dsc;
                console.log(dados);
        });
    });
}

function excluirTd() {
    var tds = document.querySelectorAll('.excluir-td');

    tds.forEach((td) => {
        td.addEventListener('click', () => {
            
            for (var key in localStorage) {
                if(key === td.parentElement.firstElementChild.innerText) {
                    
                    localStorage.removeItem(key);
                    setTimeout(() => {

                        window.location.reload();
                    }, 400);
                    renderizaTable(parseJson());
                }
            }
        });
    });
}

renderizaTable(parseJson());

editarTd();
excluirTd();