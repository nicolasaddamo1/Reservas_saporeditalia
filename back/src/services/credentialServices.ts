import ICredentialDto from "../dto/credentialDto"; 
import { User } from "../entities/User";
import  {Credential}  from "../entities/Credential";
import { CredentialsModel, UserModel } from "../config/data-source";


export const createCredentialService=async (credentialData:ICredentialDto):Promise<Credential>=>{
    const { username, password} = credentialData
    const newCredential:Credential= CredentialsModel.create({ username, password});
    await CredentialsModel.save(newCredential);

   
    return newCredential;


}



export const compareCredentialService = async ({ username, password }: ICredentialDto) => {
    console.log("credentialData", username,"pass: ", password);
    // Buscar la credencial por nombre de usuario
    const credential = await CredentialsModel.findOne({ where: { username },relations:['user'] });

    if (!credential) {
        // Si la credencial no existe, devolver un resultado de inicio de sesión falso
        return {
            login: false,
            message: 'Credencial no encontrada',
        };
    }

    // Verificar si la contraseña proporcionada coincide con la almacenada en la base de datos
    if (password !== credential.password) {
        // Si la contraseña no coincide, devolver un resultado de inicio de sesión falso
        return {
            login: false,
            message: 'Contraseña incorrecta',
        };
    }

    // Devolver un resultado de inicio de sesión exitoso
    return {
        login: true,
        user: credential.user, // Devuelve el usuario asociado a la credencial
    };
};














export const getAllCredentialsService = async () => {
    const credentials = await CredentialsModel.find();
    return credentials
}


export const getCredentialByIdService = async (id: number) => {
    const credential = await CredentialsModel.findOneBy({ id });
    return credential
}



// export const deleteCredentialController = async (req: Request, res: Response) => {res.send("borrar un credencial")}
// export const updateCredentialController = async (req: Request, res: Response) => {res.send("actualizar un credencial")}
// export const getAllCredentialsController = async (req: Request, res: Response) => {res.send("vamos a obtener una credencial")}
