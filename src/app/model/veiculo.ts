import {InModel} from './in-model';
import {Usuario} from './usuario';
import {Unidade} from './unidade';

export class Veiculo extends InModel {

    id: number;
    dataHoraCadastro: Date;
    placa: string;
    situacao: string;
    unidade: Unidade;
    usuario: Usuario;

}
