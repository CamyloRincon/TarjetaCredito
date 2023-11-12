import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


import { TarjetaCredito } from '../models/TarjetaCredito';
import { query, orderBy, limit } from "firebase/firestore";
import { Observable, Subject } from 'rxjs';






@Injectable({
  providedIn: 'root'
})


export class TarjetaService {

  private tarjeta$ = new Subject<any>();

  private tcPath = '/tarjeta';
  tc: AngularFirestoreCollection<TarjetaCredito>;




  constructor(private db: AngularFirestore) {
    this.tc = db.collection(this.tcPath);

  }

  guardarTarjeta(tarjeta: TarjetaCredito): any {
    return this.tc.add({ ...tarjeta });
  }

  obtenerTarjetas(): AngularFirestoreCollection<TarjetaCredito> {

    return this.tc;

  }

  eliminarTarjeta(id: string): Promise<void> {

    return this.tc.doc(id).delete();

  }


  editarTarjeta(id: string, tarjeta: any): Promise <any>{

    return this.tc.doc(id).update(tarjeta);

  }

  addTarjetaEdit(tarjeta: TarjetaCredito){
    this.tarjeta$.next(tarjeta);
  }

  getTarjetaEdit(): Observable<TarjetaCredito>{
    return this.tarjeta$.asObservable();
  }

}
