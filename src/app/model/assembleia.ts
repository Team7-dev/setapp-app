import {Usuario} from './usuario';
import {InModel} from './in-model';

export class Assembleia extends InModel {

    id: number;
    dataHoraCadastro: Date;
    motivo: string;
    dataHoraAgendamento: Date;
    dataHoraConclusao: Date;
    situacao: string;
    usuario: Usuario;

}
