import { Node } from './Node';
import { User } from './User';

export class Team extends Node {
  coaches?: User[];
  members?: User[];
  twitter?: string;
  biography?: string;
  name?: string;
  number?: number;
  school?: string;
  city?: string;
  state?: string;
  country?: string;
  photo_url?: string;
}