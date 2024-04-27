import { UserModel,CredentialsModel } from "../config/data-source";
import  {createCredentialService} from "./credentialServices"
import { User } from "../entities/User";
import IUserDto from "../dto/usersDto";
import ICredentialDto from "../dto/credentialDto";
let id:number=1;



export const createUserService = async (userData: IUserDto): Promise<User> => {
    console.log("este es el userdata del Service", userData);

    // Verificar si ya existe un usuario con el mismo correo electrónico
    const existingEmail = await UserModel.findOne({ where: { email: userData.email } });
    if (existingEmail) {
        throw new Error('Ya existe un usuario con este correo electrónico.');
    }

    // Verificar si ya existe un usuario con el mismo DNI
    const existingDNI = await UserModel.findOne({ where: { nDNI: userData.nDNI } });
    if (existingDNI) {
        throw new Error('Ya existe un usuario con este DNI.');
    }

    // Verificar si ya existe un usuario con el mismo nombre de usuario
    const existingUsername = await CredentialsModel.findOne({ where: { username: userData.username } });
    if (existingUsername) {
        throw new Error('Ya existe un usuario con este nombre de usuario.');
    }

    // Crear el usuario
    const user = await UserModel.create({
        name: userData.name,
        apellido: userData.apellido,
        nDNI: userData.nDNI,
        nTel: userData.nTel,
        fNacimiento: userData.fNacimiento,
        email: userData.email
    });

    // Crear las credenciales y asignarlas al usuario
    const credentialData = { username: userData.username, password: userData.password };
    const credential = await createCredentialService(credentialData);
    user.credential = credential;

    // Guardar el usuario
    const usresult = await UserModel.save(user);

    return usresult;
}
export const getUserService=async ()=>{
    const users= await UserModel.find({ relations: ['reservations'] })
    return users

}

export const getUserByIdService=async (id:number):Promise<User|null>=>{
    const user:User | null = await UserModel.findOneBy({id})
    return user

}
export const updateUserService=async ()=>{}
export const deleteUserService=async ()=>{}
