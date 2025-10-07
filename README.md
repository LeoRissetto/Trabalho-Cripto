# Registro de Certificados Acadêmicos em Blockchain com NFTs


**Autor:** Leonardo Gueno Rissetto (NUSP: 13676482)

**Docente:** Jo Ueyama

---

## 1. Introdução

Este é um projeto acadêmico desenvolvido para a disciplina de **SSC0958 - Criptomoedas e Blockchain (2025)**. O objetivo é demonstrar uma aplicação prática da tecnologia blockchain através da criação de um sistema descentralizado (DApp) para a emissão e consulta de certificados acadêmicos como Tokens Não Fungíveis (NFTs).

A aplicação permite que uma instituição de ensino, representada pelo administrador do contrato, emita certificados digitais únicos e à prova de falsificação na blockchain Ethereum. Cada certificado é um NFT padrão ERC-721 que contém informações do aluno, como nome, curso e ano de conclusão, garantindo a autenticidade e a propriedade do documento.

## 2. Tecnologias Utilizadas

- **Blockchain:** Ethereum (redes de teste como Sepolia).
- **Smart Contract:**
    - **Linguagem:** Solidity `^0.8.20`.
    - **Padrão:** ERC-721 (para NFTs).
    - **Bibliotecas:** OpenZeppelin (para implementações seguras de ERC-721 e controle de acesso `Ownable`).
- **Frontend (Interface Gráfica):**
    - **Linguagens:** HTML5, CSS3, JavaScript (ES6+).
    - **Biblioteca de Conexão:** Ethers.js (para interagir com a blockchain e a carteira).
- **Ambiente de Desenvolvimento e Testes:**
    - **IDE para Contrato:** Remix IDE.
    - **Carteira Digital:** MetaMask.

## 3. Estrutura do Projeto

O projeto está organizado em duas pastas principais:

- `/contracts`: Contém o código-fonte do contrato inteligente (`CertificateNFT.sol`).
- `/frontend`: Contém os arquivos da interface web (`index.html`, `style.css`, `app.js`).

## 4. Detalhes do Contrato Inteligente (`CertificateNFT.sol`)

- **Padrão:** `ERC721` da OpenZeppelin, que define a funcionalidade básica de um NFT.
- **Controle de Acesso:** `Ownable` da OpenZeppelin, que garante que apenas o endereço que fez o deploy do contrato (o "dono" ou "administrador") possa executar funções restritas.
- **Funções Principais:**
    - `mintCertificate(address studentAddress, string memory studentName, ...)`: Função exclusiva do administrador para criar (emitir) um novo certificado NFT e enviá-lo para o endereço do aluno.
    - `getCertificateInfo(uint256 tokenId)`: Função pública que permite a qualquer pessoa consultar os dados de um certificado a partir de seu ID (`tokenId`).
    - `ownerOf(uint256 tokenId)`: Função padrão do ERC-721 que retorna o endereço do proprietário de um determinado NFT.

## 5. Funcionalidades do Frontend

A interface gráfica foi projetada para ser simples e intuitiva, oferecendo as seguintes funcionalidades:

- **Conexão com a Carteira:** Permite que os usuários conectem suas carteiras MetaMask à aplicação.
- **Painel de Administrador:** Uma seção especial que só é visível para o dono do contrato, permitindo a emissão de novos certificados.
- **Consulta de Certificados:** Uma seção pública onde qualquer pessoa pode inserir o ID de um token e ver as informações do certificado correspondente.
- **Design Responsivo:** A interface se adapta a diferentes tamanhos de tela.

## 6. Guia de Execução do Projeto

Siga os passos abaixo para executar a aplicação localmente.

### Pré-requisitos

- Navegador com a extensão [MetaMask](https://metamask.io/) instalada.
- Conta na MetaMask com um pouco de ETH de teste na rede Sepolia (pode ser obtido em um "faucet" online, como [sepoliafaucet.com](https://sepoliafaucet.com/)).
- Python instalado (para rodar um servidor web local simples).

### Passo 1: Deploy do Contrato Inteligente

1.  Acesse o [Remix IDE](https://remix.ethereum.org/).
2.  Crie um novo arquivo `CertificateNFT.sol` e cole o conteúdo do arquivo que está na pasta `/contracts`.
3.  Vá para a aba "Solidity Compiler", selecione um compilador `0.8.20` (ou compatível) e clique em **Compile**.
4.  Após a compilação, copie o **ABI** do contrato clicando no botão correspondente.
5.  Vá para a aba "Deploy & Run Transactions", selecione o ambiente **"Injected Provider - MetaMask"** e conecte sua carteira na rede **Sepolia**.
6.  Clique em **Deploy**. Aprove a transação na MetaMask.
7.  Após o deploy, copie o **endereço do contrato** que aparecerá na seção "Deployed Contracts".

### Passo 2: Configuração do Frontend

1.  Abra o arquivo `frontend/app.js`.
2.  Localize a variável `const contractAddress` e cole o **endereço do contrato** que você copiou do Remix.
3.  Localize a variável `const contractAbi` e cole o **ABI** que você copiou do Remix.

### Passo 3: Execução da Aplicação

1.  Abra um terminal ou prompt de comando.
2.  Navegue até a pasta `frontend` do projeto.
3.  Execute o comando: `python -m http.server`.
4.  Abra seu navegador e acesse o endereço: `http://localhost:8000`.

## 7. Como Usar a Aplicação

1.  **Conectar:** Clique em "Conectar MetaMask" para ligar sua carteira ao site.
2.  **Emitir (como Admin):** Se você estiver conectado com a conta que fez o deploy, o painel de admin estará visível. Preencha os dados do aluno (para obter um endereço de aluno, crie uma nova conta na MetaMask) e clique em "Emitir Certificado".
3.  **Consultar:** Digite o ID de um certificado (começando em 1 para o primeiro emitido) e clique em "Consultar" para ver seus dados.
4.  **Desconectar:** Clique em "Desconectar" para resetar a interface e poder conectar com outra conta.