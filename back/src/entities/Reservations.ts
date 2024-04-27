import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity({name:'reservations'})
export class Reservations{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    userId:number

    @Column()    
    date:string

    @Column()
    time:string

     @Column()
    status:string

     @ManyToOne(() => User, user => (user.reservations))
     user: User;

}    

