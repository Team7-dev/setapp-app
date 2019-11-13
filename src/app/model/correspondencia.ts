import {Usuario} from './usuario';
import {InModel} from './in-model';

export class Correspondencia extends InModel {

    id: number;
    dataHoraCadastro: Date;
    descricao: string;
    dataHoraRecebida: Date;
    dataHoraRetirada: Date;
    situacao: string;
    usuario: Usuario;

}
