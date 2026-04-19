export class Usuario{
    public id: string;
    public nome: string;
    public email: string;
    public senha: string;
    public datanascimento: string;
    public cargo: string;
    

    constructor(obj?: Partial<Usuario>){
        if (obj){
            this.id=obj.id
            this.nome=obj.nome
            this.email=obj.email
            this.senha=obj.senha
            this.datanascimento=obj.datanascimento
            this.cargo=obj.cargo
        }
    }

    toString(){
        const objeto=`{
            "id":"${this.id}",
            "nome":"${this.nome}",
            "email":"${this.email}",
            "senha":"${this.senha}",
            "datanascimento":"${this.datanascimento}",
            "cargo":"${this.cargo}",
        }`
        return objeto
    }

    toFirestore(){
        const usuario={
            id: this.id,
            nome: this.nome,
            email: this.email,
            senha: this.senha,
            datanascimento: this.datanascimento,
            cargo: this.cargo
        }
        return usuario
    }
}