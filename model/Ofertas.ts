export class Ofertas {
    public idProduto: string;
    public nomeProduto: string;
    public descricaoProduto: string;
    public precoAtual: number; // Alterado para tipo number
    public precoOferta: number; // Alterado para tipo number
    public id: string;
    
    constructor(obj?: Partial<Ofertas>) {
        if (obj) {
            this.idProduto = obj.idProduto || "";
            this.nomeProduto = obj.nomeProduto || "";
            this.descricaoProduto = obj.descricaoProduto || "";
            this.precoAtual = obj.precoAtual || 0; // Definido valor padrão como 0 se não for fornecido
            this.precoOferta = obj.precoOferta || 0; // Definido valor padrão como 0 se não for fornecido
            this.id = obj.id || "";
         }
    }

    toFirestore() {
        const oferta = {
            idProduto: this.idProduto,
            nomeProduto: this.nomeProduto,
            descricaoProduto: this.descricaoProduto,
            precoAtual: this.precoAtual,
            precoOferta: this.precoOferta,
        };
        return oferta;
    }

    toString() {
        const objeto = `{
            "idProduto": "${this.idProduto}",
            "nomeProduto": "${this.nomeProduto}",
            "descricaoProduto": "${this.descricaoProduto}",
            "precoAtual": ${this.precoAtual}, // Não usar aspas para números
            "precoOferta": ${this.precoOferta}, // Não usar aspas para números
        }`;
        return objeto;
    }
}
