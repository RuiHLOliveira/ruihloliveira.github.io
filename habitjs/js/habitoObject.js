
export default {
    newEmptyHabito() {
        let habito = {
            'nome': null,
            'domingo': false,
            'segunda': false,
            'terca': false,
            'quarta': false,
            'quinta': false,
            'sexta': false,
            'sabado': false,
            'hora': '',
            'formulario': [
                'detalhes'
            ],
            'diasRealizados': {},
        }
        return habito;
    },
    newEmptyDiaRealizado () {
        return {
            dataRealizada: '',
            horaRealizada: '',
            respostasFormulario: {},
        };
    }
}