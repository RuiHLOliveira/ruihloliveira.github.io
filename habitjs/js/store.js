const LOCALSTORAGE_DATA_KEY = 'HabitJsData';

export default
{
    getData () {
        let json = window.localStorage.getItem(LOCALSTORAGE_DATA_KEY);
        if (json == null) json = this.getDefaultStructure();
        const data = JSON.parse(json);
        return data;
    },

    setData (dados) {
        window.localStorage.setItem(LOCALSTORAGE_DATA_KEY, JSON.stringify(dados));
    },

    getDefaultStructure() {
        return JSON.stringify({
            habitos: [],
            idProxHabito: 1
        });
    },

    getIdProxHabito() {
        let idProxHabito = this.getData().idProxHabito
    },

    fillEmptyFieldsList(habitos){
        for (let i = 0; i < habitos.length; i++) {
            habitos[i] = this.fillEmptyFields(habitos[i]);
        }
        return habitos
    },
    fillEmptyFields(habito){
        if(!habito.hasOwnProperty('diasRealizados')) habito.diasRealizados = {}
        return habito;
    },

    storeNewHabito(habito) {
        let dados = this.getData();
        let habitos = dados.habitos
        habito.id = dados.idProxHabito
        dados.idProxHabito++
        habitos.push(habito)
        dados.habitos = habitos
        this.setData(dados)
    },

    getHabitos() {
        let dados = this.getData();
        console.log(dados);
        return this.fillEmptyFieldsList(dados.habitos);
    },

    findHabito(idHabito) {
        let habitos = this.getHabitos()
        let habito = null;
        for (let i = 0; i < habitos.length; i++) {
            if(habitos[i].id == idHabito) {
                habito = habitos[i]
                break;
            }
        }
        return habito;
    },

    updateHabito(habito) {
        let dados = this.getData();
        let habitos = dados.habitos

        for (let i = 0; i < habitos.length; i++) {
            if(habitos[i].id == habito.id) {
                habitos[i] = habito
                break;
            }
        }

        console.log('habitos pre update',habitos);
        dados.habitos = habitos
        this.setData(dados)
    },


}
