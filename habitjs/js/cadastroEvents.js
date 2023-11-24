import Store from './store.js';
import Habito from './habitoObject.js';
import Menu from './menu.js'

window.onload = () => {
    renderListaOrdinariaHabitos()
    Menu.render()
}

window.toggleTodosOsDias = () => {
    let checked = true;
    if (
        document.getElementById('domingo').checked
        && document.getElementById('segunda').checked
        && document.getElementById('terca').checked
        && document.getElementById('quarta').checked
        && document.getElementById('quinta').checked
        && document.getElementById('sexta').checked
        && document.getElementById('sabado').checked
    ) {
        checked = false
    }
    document.getElementById('domingo').checked = checked;
    document.getElementById('segunda').checked = checked;
    document.getElementById('terca').checked = checked;
    document.getElementById('quarta').checked = checked;
    document.getElementById('quinta').checked = checked;
    document.getElementById('sexta').checked = checked;
    document.getElementById('sabado').checked = checked;
}

window.importBackupJson = () => {
    let file = document.getElementById('arquivojson').files[0];
    console.log('file', file);

    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            console.log('file2',evt.target.result);
            Store.setData(JSON.parse(evt.target.result))
            renderListaOrdinariaHabitos()
        }
        reader.onerror = function (evt) {
            console.log("error reading file");
        }
    }

}

window.baixarBackupJson = () => {
    let dados = Store.getData();
    const aElement = document.createElement('a');
    const blob = new Blob([JSON.stringify(dados)], { type: 'application/json' })
    const href = URL.createObjectURL(blob);
    aElement.href = href;
    aElement.setAttribute('target', '_blank');
    let date = new Date();
    date = date.toISOString().substr(0, 19);
    date = date.replaceAll( ':','.');
    aElement.download = date + '.habitJs.export.json'
    aElement.click();
    URL.revokeObjectURL(href);
}

window.uploadBackupJson = () => {
    let element = document.getElementById('arquivojson');
    console.log('elemet', element);
}

window.criarNovoHabito = () => {
    let habito = Habito.newEmptyHabito();
    habito.nome = document.getElementById('novoHabitoNome').value;
    habito.domingo = document.getElementById('domingo').checked;
    habito.segunda = document.getElementById('segunda').checked;
    habito.terca = document.getElementById('terca').checked;
    habito.quarta = document.getElementById('quarta').checked;
    habito.quinta = document.getElementById('quinta').checked;
    habito.sexta = document.getElementById('sexta').checked;
    habito.sabado = document.getElementById('sabado').checked;
    // validar campos
    console.log('habito', habito);
    Store.storeNewHabito(habito)
    resetCamposCriarHabitos()
    renderListaOrdinariaHabitos()
}

window.resetCamposCriarHabitos = () => {
    document.getElementById('novoHabitoNome').value = null;
    document.getElementById('domingo').checked = null;
    document.getElementById('segunda').checked = null;
    document.getElementById('terca').checked = null;
    document.getElementById('quarta').checked = null;
    document.getElementById('quinta').checked = null;
    document.getElementById('sexta').checked = null;
    document.getElementById('sabado').checked = null;
}


window.renderListaOrdinariaHabitos = () => {
    let habitos = Store.getHabitos();
    let lista = '';
    habitos.forEach(habito => {
        lista += '<div class="spanBox">';
        lista += habito.nome + '<br>';
        // checkboxes
        lista += '<input disabled type="checkbox"';
        lista += habito.domingo == true ? 'checked' : ''
        lista += '><label for="domingo">domingo</label>'
        lista += '<input disabled type="checkbox"';
        lista += habito.segunda == true ? 'checked' : ''
        lista += '><label for="segunda">segunda</label>'
        lista += '<input disabled type="checkbox"';
        lista += habito.terca == true ? 'checked' : ''
        lista += '><label for="terca">terca</label>'
        lista += '<input disabled type="checkbox"';
        lista += habito.quarta == true ? 'checked' : ''
        lista += '><label for="quarta">quarta</label>'
        lista += '<input disabled type="checkbox"';
        lista += habito.quinta == true ? 'checked' : ''
        lista += '><label for="quinta">quinta</label>'
        lista += '<input disabled type="checkbox"';
        lista += habito.sexta == true ? 'checked' : ''
        lista += '><label for="sexta">sexta</label>'
        lista += '<input disabled type="checkbox"';
        lista += habito.sabado == true ? 'checked' : ''
        lista += '><label for="sabado">sabado</label>'
        lista += '</div>';
    });
    document.getElementById('listaOrdinariaHabitos').innerHTML = lista
}
