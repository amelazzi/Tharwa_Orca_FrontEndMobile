import { BehaviorSubject } from "rxjs/BehaviorSubject";

export class Virement {
    dateV : string;
    private emetteur: string;
    private destinataire: string;
    private montant: number;
    private motif : string;
    private status : string;
    constructor(private date,private emt,private dest,private mont, private mtf,private sts)
    {
        this.dateV = date;
        this.emetteur = emt;
        this.destinataire = this.dest;
        this.montant = mont;
        this.motif = mtf;
        this.status = sts;
    }
  }