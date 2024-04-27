import { Column, Entity, PrimaryGeneratedColumn, OneToMany , OneToOne, JoinColumn} from "typeorm"
import { Reservations } from "./Reservations"
import { Credential } from "./Credential"

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id:number

    @Column({length:50})
    name:string

    @Column({length:50})    
    apellido:string

    @Column("integer", { name: "nDNI" })
    nDNI:number

    @Column("integer")
    nTel:number

    @Column({type:"date"})
    fNacimiento:Date;  

    @Column({length:50})
    email:string
    
    @OneToMany(() => Reservations, reservation => reservation.user)
    reservations: Reservations[];
    
    @OneToOne(() => Credential, { cascade: true }) // Establece una relación uno a uno con Credential 
    @JoinColumn()
    credential: Credential;

        
    
}    


