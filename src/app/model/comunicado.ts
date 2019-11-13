import {Usuario} from './usuario';
import {InModel} from './in-model';

export class Comunicado extends InModel {

    id: number;
    dataHoraCadastro: Date;
    titulo: string;
    descricao: string;
    situacao: string;
    usuario: Usuario;

}
