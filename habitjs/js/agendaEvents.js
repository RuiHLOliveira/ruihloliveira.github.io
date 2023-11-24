import Store from './store.js';
import Habito from './habitoObject.js';
import Menu from './menu.js';
import JsDateFormater from './jsDateFormater.js'
import jsDateFormater from './jsDateFormater.js';

window.onload = () => {
    renderAgendaDoDia()
    Menu.render()
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
            renderAgendaDoDia()
        }
        reader.onerror = function (evt) {
            console.log("error reading file");
        }
    }

}

window.baixarBackupJson = () => {
    let dados = Store.getData();
    const aElement = document.createElement('a');
    const blob = new Blob([JSON.stringify(dados)], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    aElement.href = href;
    aElement.setAttribute('target', '_blank');
    let date = new Date();
    date = date.toISOString().substring(0, 19);
    date = date.replaceAll( ':','.');
    aElement.download = date + '.habitJs.export.json';
    aElement.click();
    URL.revokeObjectURL(href);
}

window.concluirHabito = (idHabito) => {
    let dateObject = new Date();
    let data = jsDateFormater.systemDate(dateObject);
    let hora = jsDateFormater.fullHour(dateObject)
    console.log('data',data);
    console.log('hora',hora);

    let diaRealizado = Habito.newEmptyDiaRealizado();
    diaRealizado.dataRealizada = data
    diaRealizado.horaRealizada = hora

    let habito = Store.findHabito(idHabito)
    // if(habito.diasRealizados == null) habito.diasRealizados = {}
    habito.diasRealizados[diaRealizado.dataRealizada] = diaRealizado;
    console.log('habito', habito);
    Store.updateHabito(habito);
    renderAgendaDoDia()
}

window.desfazerConcluirHabito = (idHabito) => {
    let dateObject = new Date();
    let data = jsDateFormater.systemDate(dateObject);
    let hora = jsDateFormater.fullHour(dateObject)
    console.log('data',data);
    console.log('hora',hora);
    
    let habito = Store.findHabito(idHabito)
    delete habito.diasRealizados[data]
    console.log('habito', habito);
    Store.updateHabito(habito);
    renderAgendaDoDia()

}

window.renderAgendaDoDia = () => {
    let habitos = Store.getHabitos();
    let lista = '';
    const date = new Date();
    const diaDaSemana = date.getDay();
    const dataHoje = JsDateFormater.systemDate(date)

    habitos.forEach(habito => {
        let realizadoHoje = false
        if(habito.diasRealizados.hasOwnProperty(dataHoje)){
            realizadoHoje = true
        }
        let pular = false;
        switch (diaDaSemana) {
            case 0:
                if(habito.domingo == false) pular = true;
                break;
            case 1:
                if(habito.segunda == false) pular = true;
                break;
            case 2:
                if(habito.terca == false) pular = true;
                break;
            case 3:
                if(habito.quarta == false) pular = true;
                break;
            case 4:
                if(habito.quinta == false) pular = true;
                break;
            case 5:
                if(habito.sexta == false) pular = true;
                break;
            case 6:
                if(habito.sabado == false) pular = true;
                break;
        }
        if(pular == true) return;

        lista += '<div class="spanBox">';
        if(realizadoHoje) {
            lista += '<button type="button" class="btn_atividade_concluida" onclick="desfazerConcluirHabito('+habito.id+')">Desfazer</button> ';
        } else {
            lista += '<button type="button" class="" onclick="concluirHabito('+habito.id+')">Concluir</button> ';
        }
        lista += habito.nome;
        lista += '</div>';
    });
    document.getElementById('agendaDoDia').innerHTML = lista;
}
