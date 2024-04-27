import { DataSource } from "typeorm";
import { PASS } from "./envs";
import { User } from "../entities/User";
import { Reservations } from "../entities/Reservations";
import { Credential } from "../entities/Credential";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: PASS,
    database: "reservas",
    //dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User, Reservations, Credential],
    subscribers: [],
    migrations: [],
})
export const UserModel = AppDataSource.getRepository(User)
export const ReservationsModel = AppDataSource.getRepository(Reservations)
export const CredentialsModel = AppDataSource.getRepository(Credential)