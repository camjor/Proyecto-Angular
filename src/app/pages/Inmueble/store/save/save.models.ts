import {Inmueble} from '@app/models/backend/Inmueble';
export {Inmueble as InmuebleResponse} from '@app/models/backend/Inmueble';

export type InmuebleCreateRequest = Omit<Inmueble, 'id' | 'fechaCreacion'>;
