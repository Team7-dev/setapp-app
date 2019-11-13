import {Usuario} from './usuario';
import {InModel} from './in-model';

export class Ocorrencia extends InModel {

    id: number;
    dataHoraCadastro: Date;
    ocorrencia: string;
    descricao: string;
    dataHoraOcorrencia: Date;
    dataHoraConclusao: Date;
    situacao: string;
    usuario: Usuario;

}
