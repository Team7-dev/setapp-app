import {Unidade} from './unidade';
import {InModel} from './in-model';

export class Visitante extends InModel {

    id: number;
    dataHoraCadastro: Date;
    nome: string;
    cpf: string;
    situacao: string;
    unidade: Unidade;

}
