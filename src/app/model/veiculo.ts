import {InModel} from './in-model';
import {Pessoa} from './pessoa';

export class Veiculo extends InModel {

    id: number;
    vaga: string;
    descricao: string;
    pessoa: Pessoa;

}
