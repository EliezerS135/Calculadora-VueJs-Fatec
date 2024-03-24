// Importa a função createApp do Vue
const { createApp } = Vue;

// Cria uma instância do aplicativo Vue
createApp({
    // Define os dados do aplicativo
    data() {
        return {
            display: '', // String que representa a expressão exibida na calculadora
            numeroAtual: null, // Número atual 
            numeroAnterior: null // Número anterior
        }
    },
    // Define os métodos do aplicativo
    methods: {
        // Cliques em botões da calculadora
        lidarBotao(botao) {
            switch (botao) {

                case "*":
                case "-":
                case "+":
                case "/":
                    this.lidarOperador(botao);
                    break;

                    case ".":
                    this.lidarDecimal();
                    break;

                    case "=":
                    this.lidarIgual();
                    break;

                    case "AC":
                    this.lidarClear();
                    break;

                    default:
                    this.lidarNumero(botao);
            }
        },
        // Cliques em operadores matemáticos
        lidarOperador(botao) {
            if (this.display !== '' && this.display !== 'Indefinido') {
                let ultimoCaractere = this.display.slice(-1);
                if (ultimoCaractere !== ' ') {
                    this.numeroAnterior = this.numeroAtual;
                    this.numeroAtual = null;
                    this.display += ' ' + botao + ' ';
                }
            }
        },
        // Cliques no botão decimal
        lidarDecimal() {
            if (this.numeroAtual !== null && !this.numeroAtual.includes('.')) {
                this.numeroAtual += '.';
                if (this.numeroAnterior !== null) {
                    this.display += '.';
                } else {
                    this.display = this.numeroAtual;
                }
            }
        },
        // Cliques no botão de igual
        lidarIgual() {
            if (this.numeroAnterior !== null) {
                let resultado = this.calcularExpressao(this.display);
                if (resultado === Infinity || isNaN(resultado)) {
                    this.display = 'Indefinido';
                } else {
                    this.display = resultado;
                }
                this.clearVariaveisExcetoDisplay();
            }
        },
        // Calcular o resultado de uma expressão matemática
        calcularExpressao(expressao) {
            return eval(expressao);
        },
        
        // Cliques no botão de limpar (AC)
        lidarClear() {
            this.display = '';
            this.clearVariaveisExcetoDisplay();
        },
        // Limpar as variáveis
        clearVariaveisExcetoDisplay() {
            this.numeroAtual = null;
            this.numeroAnterior = null;
        },
        // Cliques em números
        lidarNumero(botao) {
            if (this.numeroAtual !== null) {
                this.numeroAtual += botao;
            } else {
                this.numeroAtual = botao;
            }
            if (this.numeroAnterior !== null) {
                this.display += botao;
            } else {
                this.display = this.numeroAtual;
            }
        }
    }
}).mount("#app"); // Monta o aplicativo na div "app"