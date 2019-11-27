import {Usuario} from './usuario';
import {InModel} from './in-model';
import {AreaReserva} from './area-reserva';

export class Reserva extends InModel {

    id: number;
    dataHoraCadastro: Date;
    dataHoraInicio: Date;
    dataHoraFim: Date;
    situacao: string;
    areaReserva: AreaReserva;
    usuario: Usuario;

}
