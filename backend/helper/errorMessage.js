class CustomError extends Error {
    constructor(message, status) {
        super(message) // Chama o construtor da classe base (Error) com a mensagem de erro
        this.name = this.constructor.name // Define o nome da classe como o nome do erro
        this.status = status // Define o status do erro
    }
}

module.exports = CustomError
