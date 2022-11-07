import {UserEventsModel} from './UserEventsModel';

export interface RegisterEventsModel {
    id?: string;
    titulo: string;
    descripcion: string;
    fecha: string;
    users?:UserEventsModel[];
}