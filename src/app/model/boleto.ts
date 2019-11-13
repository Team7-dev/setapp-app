import {Usuario} from './usuario';
import {InModel} from './in-model';

export class Boleto extends InModel {

    id: number;
    dataHoraCadastro: Date;
    arquivo: string;
    situacao: string;
    usuario: Usuario;

}
