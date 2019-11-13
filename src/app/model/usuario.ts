import {Perfil} from './perfil';
import {InModel} from './in-model';

export class Usuario extends InModel {

    id: number;
    dataHoraCadastro: Date;
    usuario: string;
    senha: string;
    nome: string;
    cpf: string;
    email: string;
    situacao: string;
    perfil: Perfil;

}
