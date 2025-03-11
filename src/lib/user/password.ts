import bcrypt from "bcrypt";

// Função para gerar um hash de uma senha em texto plano
export async function hashPassword(plainPassword: string): Promise<string> {
    const saltRounds = 10; // Número de rounds para gerar o salt. Quanto maior o número, mais seguro (porém mais lento) o processo de hash.
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds); // Gera o hash da senha usando o bcrypt
    return hashedPassword; // Retorna a senha hasheada
}

// Função para verificar se uma senha em texto plano corresponde a um hash
export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    const match = await bcrypt.compare(plainPassword, hashedPassword); // Compara a senha em texto plano com o hash
    return match; // Retorna true se a senha corresponder ao hash, caso contrário, retorna false
}