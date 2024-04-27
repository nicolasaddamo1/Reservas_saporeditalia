import { Request, Response } from "express";
import { createCredentialService,  getAllCredentialsService, getCredentialByIdService, compareCredentialService } from "../services/credentialServices";
import { Credential } from "../entities/Credential";



// export const createCredentialController = async (req: Request, res: Response) => {
//     const {username,password}=await req.body
//     const newCredential=await createCredentialService({username,password, user})
//     res.status(201).json(newCredential)
// }
//export const deleteCredentialController = async (req: Request, res: Response) => {res.send("borrar un credencial")}
export const updateCredentialController = async (req: Request, res: Response) => {res.send("actualizar un credencial")}
export const getAllCredentialsController = async (req: Request, res: Response) => {
    const credential:Credential[]|null = await  getAllCredentialsService();
    res
    .status(200)
    .json(credential)
    }
export const getCredentialByIdController = async (req: Request, res: Response) => {
    const {id}=req.params
    let credential: Credential| null=await getCredentialByIdService(Number(id))    
    res
    .status(200)
    .send("vamos a obtener una credencial")
    .json(credential)
}
// export const compareCredentialController = async (req: Request, res: Response) => {
//     const {username,password}=req.body
//     const credential: LoginResponse | null = await compareCredentialService(username)
//     if(credential?.login === true) {
//         res.status(200).json(credential)
//     }else {
//         res.status(404).json("contraseña invalida")
//     }
// }
export const compareCredentialController = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const credential = await compareCredentialService({ username, password });
    console.log(credential);
    if (credential.login === true) {
        if (credential.user) {
            res.status(200).json(credential);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } else {
        res.status(404).json("contraseña invalida");
    }
}
