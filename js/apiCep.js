// /js/apiCep.js
export async function fetchAddressByCep(cepDigits) {
// recebe '12345678' (somente dígitos)
const url = `https://viacep.com.br/ws/${cepDigits}/json/`;
try {
const res = await fetch(url);
if (!res.ok) throw new Error('Erro na requisição');
const json = await res.json();
if (json.erro) return { error: 'CEP_NAO_ENCONTRADO' };
// retorna campos úteis
return {
logradouro: json.logradouro || '',
bairro: json.bairro || '',
localidade: json.localidade || '',
uf: json.uf || ''
};
} catch (err) {
// pode ser falha de rede
return { error: 'NETWORK' };
}
}