export class Produtos {
    public id : string;
    public nome : string;
    public peso: string;
    public quantidade: number;
    public descricao : string;
    public datadeentrada: string;
    public tipo: string;
    emFalta: boolean = false;    
    constructor(obj?: Partial<Produtos>) {
        if (obj) {
            this.id = obj.id
            this.nome = obj.nome
            this.peso = obj.peso
            this.quantidade = obj.quantidade
            this.descricao = obj.descricao
            this.datadeentrada = obj.datadeentrada
            this.tipo = obj.tipo
         }
    }

    toFirestore() {
        const Produto =  {
                    id : this.id,
                    nome : this.nome,
                    peso : this.peso,
                    quantidade : this.quantidade,
                    descricao : this.descricao,
                    datadeentrada : this.datadeentrada,
                    tipo : this.tipo         
         }
         return Produto
    }

   
    toString() {
        const Objeto = `{
            "id": "${this.id}",
            "nome": "${this.nome}",
            "peso": "${this.peso}",
            "quantidade": "${this.quantidade}",
            "descricao": "${this.descricao}",
            "datadeentrada": "${this.datadeentrada}",
            "tipo": "${this.tipo}" 
        }`
        return Objeto
    }
};