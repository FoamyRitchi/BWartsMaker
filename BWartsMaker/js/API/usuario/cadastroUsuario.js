const API = "https://bwartsmaker-back-end-production.up.railway.app";

const formCadastro = document.getElementById("cadastro_usuario");

/* =========================================
   FUNÇÃO DE REQUISIÇÃO
========================================= */
async function request(endpoint, options = {}) {

    try {

        const response = await fetch(`${API}${endpoint}`, {

            ...options,

            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            }
        });

        const contentType =
            response.headers.get("content-type") || "";

        let data;

        if (contentType.includes("application/json")) {

            data = await response.json();

        } else {

            data = await response.text();
        }

        if (!response.ok) {

            console.error("Erro retornado pelo backend:");
            console.error(data);

            throw new Error(
                data?.message ||
                data ||
                `Erro ${response.status}`
            );
        }

        return data;

    } catch (error) {

        console.error("Erro na requisição:");
        console.error(error);

        throw error;
    }
}

/* =========================================
   CAPTURAR DADOS DO FORMULÁRIO
========================================= */
function obterDadosFormulario() {

    const dados = new FormData(formCadastro);

    return {

        nome_user:
            dados.get("nome_user")?.trim(),

        email_user:
            dados.get("email_user")?.trim(),

        senha_user:
            dados.get("senha_user"),

        cpf_user:
            dados.get("cpf_user")
                ?.replace(/\D/g, ""),

        dataNasc_user:
            dados.get("dataNasc_user"),

        telefone: {

            ddd_telefone:
                dados.get("ddd_telefone"),

            numero_telefone:
                dados.get("numero_telefone")
                    ?.replace(/\D/g, "")
        },

        endereco: {

            numero_endereco:
                Number(
                    dados.get("numero_endereco")
                ),

            cep_endereco:
                dados.get("cep_endereco")
                    ?.replace(/\D/g, ""),

            rua: {

                nome_rua:
                    dados.get("nome_rua")
                        ?.trim()
            },

            bairro: {

                nome_bairro:
                    dados.get("nome_bairro")
                        ?.trim()
            },

            cidade: {

                nome_cidade:
                    dados.get("nome_cidade")
                        ?.trim()
            },

            estado: {

                nome_estado:
                    dados.get("nome_estado")
                        ?.trim()
            }
        }
    };
}

/* =========================================
   VALIDAÇÃO
========================================= */
function validarFormulario(usuario) {

    if (!usuario.nome_user) {
        throw new Error("Nome obrigatório.");
    }

    if (!usuario.email_user) {
        throw new Error("E-mail obrigatório.");
    }

    if (!usuario.senha_user) {
        throw new Error("Senha obrigatória.");
    }

    if (!usuario.cpf_user) {
        throw new Error("CPF obrigatório.");
    }

    if (!usuario.dataNasc_user) {
        throw new Error("Data de nascimento obrigatória.");
    }

    if (!usuario.telefone.ddd_telefone) {
        throw new Error("DDD obrigatório.");
    }

    if (!usuario.telefone.numero_telefone) {
        throw new Error("Telefone obrigatório.");
    }

    if (!usuario.endereco.numero_endereco) {
        throw new Error("Número do endereço obrigatório.");
    }

    if (!usuario.endereco.cep_endereco) {
        throw new Error("CEP obrigatório.");
    }

    if (!usuario.endereco.rua.nome_rua) {
        throw new Error("Rua obrigatória.");
    }

    if (!usuario.endereco.bairro.nome_bairro) {
        throw new Error("Bairro obrigatório.");
    }

    if (!usuario.endereco.cidade.nome_cidade) {
        throw new Error("Cidade obrigatória.");
    }

    if (!usuario.endereco.estado.nome_estado) {
        throw new Error("Estado obrigatório.");
    }
}

/* =========================================
   CADASTRAR USUÁRIO
========================================= */
async function cadastrarUsuario() {

    try {

        const usuario = obterDadosFormulario();

        validarFormulario(usuario);

        console.log("Payload enviado:");
        console.log(usuario);

        const resposta = await request("/api/usuarios", {

            method: "POST",

            body: JSON.stringify(usuario)
        });

        console.log("Resposta backend:");
        console.log(resposta);

        alert("Usuário cadastrado com sucesso!");

        formCadastro.reset();

    } catch (error) {

        console.error("Erro ao cadastrar:");
        console.error(error);

        alert(error.message);
    }
}

/* =========================================
   EVENTO SUBMIT
========================================= */
formCadastro.addEventListener("submit", async (event) => {

    event.preventDefault();

    await cadastrarUsuario();
});