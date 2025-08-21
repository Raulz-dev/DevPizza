import bcrypt from "bcrypt";

export async function gerarHashDaSenha(password: string) {
  const passwordHash = await bcrypt.hash(password, 10);
  return passwordHash;
}
