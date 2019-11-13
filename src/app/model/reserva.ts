import {Usuario} from './usuario';
import {InModel} from './in-model';

export class AreaReserva extends InModel {

    id: number;
    dataHoraCadastro: Date;
    dataHoraInicio: Date;
    dataHoraFim: Date;
    situacao: string;
    areaReserva: AreaReserva;
    usuario: Usuario;

}
