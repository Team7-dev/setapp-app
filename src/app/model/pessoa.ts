import {InModel} from './in-model';

export class Pessoa extends InModel {

    id: number;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    rg: string;
    dataHoraCadastro: Date;
    ativo: number;
    // perfil: Perfil;
}
