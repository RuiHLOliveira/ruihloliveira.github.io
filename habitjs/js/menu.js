export default {
    render() {
        let menu = '<div class="card flex">';
        menu += '<a class="btn" href="./agenda.html">Agenda</a>';
        menu += '<a class="btn" href="./cadastro.html">Cadastro</a>';
        menu += '</div>'
        document.getElementById('menu').innerHTML = menu
    }
}