export interface Player {
  id: string;
  nombre: string;
  telefono: string;
  pagado?: boolean;
}

export interface BingoNumber {
  numero: number;
  jugadores: Player[];
  repeticiones: number;
  color: string;
}

export interface GameConfig {
  cantidadJugadores: number;
  montoSorteo: string;
  cantidadNumeros: number;
  cantidadGanadores: number;
  costoTicket?: string;
  premios: {
    posicion: number;
    descripcion: string;
  }[];
}

export interface Winner {
  numero: number;
  jugador: Player;
  premio: string;
  timestamp: Date;
  posicion: number;
}
