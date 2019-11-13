import {Usuario} from './usuario';
import {InModel} from './in-model';

export class Unidade extends InModel {

    id: number;
    dataHoraCadastro: Date;
    bloco: string;
    numero: number;
    situacao: string;
    usuario: Usuario;

}
