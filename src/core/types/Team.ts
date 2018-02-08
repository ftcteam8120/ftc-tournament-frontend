import { Node } from './Node';
import { User } from './User';
import { Location } from './Event';

export class Team extends Node {
  coaches?: User[];
  members?: User[];
  twitter?: string;
  biography?: string;
  name?: string;
  number?: number;
  affiliation?: string;
  location?: Location;
  city?: string;
  state?: string;
  country?: string;
  photo_url?: string;
  year?: number;
}