document.addEventListener("DOMContentLoaded", () => {
  // --- ELEMENTOS DA PÁGINA ---
  const connectButton = document.getElementById("connectButton");
  const disconnectButton = document.getElementById("disconnectButton");
  const walletAddressEl = document.getElementById("walletAddress");
  const networkInfoEl = document.getElementById("networkInfo");
  const adminSection = document.getElementById("adminSection");
  const lookupSection = document.getElementById("lookupSection");

  // --- ELEMENTOS DO ADMIN ---
  const mintButton = document.getElementById("mintButton");
  const studentAddressInput = document.getElementById("studentAddress");
  const studentNameInput = document.getElementById("studentName");
  const courseNameInput = document.getElementById("courseName");
  const completionYearInput = document.getElementById("completionYear");
  const mintStatusEl = document.getElementById("mintStatus");

  // --- ELEMENTOS DA CONSULTA ---
  const lookupButton = document.getElementById("lookupButton");
  const tokenIdInput = document.getElementById("tokenIdInput");
  const certificateInfoEl = document.getElementById("certificateInfo");

  // --- CONFIGURAÇÃO DO CONTRATO ---
  const contractAddress = "0xCe9C6cd6f85823b955FFbD4E8a9B85a3d457F57e";
  const contractAbi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "ERC721IncorrectOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ERC721InsufficientApproval",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "approver",
          type: "address",
        },
      ],
      name: "ERC721InvalidApprover",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "ERC721InvalidOperator",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "ERC721InvalidOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
      ],
      name: "ERC721InvalidReceiver",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "ERC721InvalidSender",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ERC721NonexistentToken",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "studentAddress",
          type: "address",
        },
        {
          internalType: "string",
          name: "studentName",
          type: "string",
        },
        {
          internalType: "string",
          name: "courseName",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "completionYear",
          type: "uint256",
        },
      ],
      name: "mintCertificate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "OwnableUnauthorizedAccount",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getApproved",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getCertificateInfo",
      outputs: [
        {
          internalType: "string",
          name: "studentName",
          type: "string",
        },
        {
          internalType: "string",
          name: "courseName",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "completionYear",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "operator",
          type: "address",
        },
      ],
      name: "isApprovedForAll",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "ownerOf",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "tokenURI",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  // --- ESTADO DA APLICAÇÃO ---
  let provider;
  let signer;
  let contract;
  let userAddress;
  let contractOwner;

  // --- FUNÇÕES ---

  /**
   * Limpa o estado da aplicação e redefine a UI para o estado inicial.
   */
  function disconnectWallet() {
    provider = null;
    signer = null;
    contract = null;
    userAddress = null;
    contractOwner = null;

    walletAddressEl.innerText = "";
    networkInfoEl.innerText = "";

    connectButton.classList.remove("hidden");
    disconnectButton.classList.add("hidden");
    adminSection.classList.add("hidden");
    lookupSection.classList.add("hidden");
    certificateInfoEl.innerHTML = "";
  }

  /**
   * Conecta à carteira MetaMask, inicializa o Ethers.js e atualiza a UI.
   */
  async function connectWallet() {
    if (typeof window.ethereum === "undefined") {
      alert(
        "MetaMask não está instalado! Por favor, instale para usar este DApp."
      );
      return;
    }

    try {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      userAddress = accounts[0];
      signer = provider.getSigner();
      contract = new ethers.Contract(contractAddress, contractAbi, signer);
      contractOwner = await contract.owner();

      // DEBUG: Imprimir os endereços para comparação
      console.log("Endereço do Usuário Conectado:", userAddress);
      console.log("Endereço do Dono do Contrato:", contractOwner);

      updateUI();
    } catch (error) {
      console.error("Erro ao conectar a carteira:", error);
      alert(
        "Falha ao conectar a carteira. Verifique o console para mais detalhes."
      );
    }
  }

  /**
   * Atualiza a interface do usuário com base no estado da conexão.
   */
  async function updateUI() {
    if (!userAddress) return;

    walletAddressEl.innerText = `Conectado: ${userAddress.substring(
      0,
      6
    )}...${userAddress.substring(userAddress.length - 4)}`;
    connectButton.classList.add("hidden");
    disconnectButton.classList.remove("hidden");

    const network = await provider.getNetwork();
    networkInfoEl.innerText = `Rede: ${network.name}`;

    lookupSection.classList.remove("hidden");

    if (userAddress.toLowerCase() === contractOwner.toLowerCase()) {
      adminSection.classList.remove("hidden");
    }
  }

  /**
   * Chama a função 'mintCertificate' do contrato.
   */
  async function handleMintCertificate() {
    const studentAddress = studentAddressInput.value;
    const studentName = studentNameInput.value;
    const courseName = courseNameInput.value;
    const completionYear = completionYearInput.value;

    if (!studentAddress || !studentName || !courseName || !completionYear) {
      alert("Por favor, preencha todos os campos para emitir o certificado.");
      return;
    }

    mintStatusEl.innerText = "Enviando transação...";
    mintButton.disabled = true;

    try {
      const tx = await contract.mintCertificate(
        studentAddress,
        studentName,
        courseName,
        completionYear
      );
      mintStatusEl.innerText = "Aguardando confirmação da transação...";

      await tx.wait();

      mintStatusEl.innerText = `Certificado emitido com sucesso! Hash: ${tx.hash}`;
      studentAddressInput.value = "";
      studentNameInput.value = "";
      courseNameInput.value = "";
      completionYearInput.value = "";
    } catch (error) {
      console.error("Erro ao emitir certificado:", error);
      mintStatusEl.innerText =
        "Erro ao emitir certificado. Verifique o console.";
    } finally {
      mintButton.disabled = false;
    }
  }

  /**
   * Chama a função 'getCertificateInfo' do contrato para buscar dados de um token.
   */
  async function handleLookupCertificate() {
    const tokenId = tokenIdInput.value;
    if (!tokenId) {
      alert("Por favor, insira um ID de Token.");
      return;
    }

    certificateInfoEl.innerHTML = "Buscando...";

    try {
      const readOnlyContract = new ethers.Contract(
        contractAddress,
        contractAbi,
        provider
      );
      const info = await readOnlyContract.getCertificateInfo(tokenId);

      certificateInfoEl.innerHTML = `
                <p><strong>Nome do Aluno:</strong> ${info.studentName}</p>
                <p><strong>Curso:</strong> ${info.courseName}</p>
                <p><strong>Ano de Conclusão:</strong> ${info.completionYear.toString()}</p>
            `;
    } catch (error) {
      console.error("Erro ao buscar certificado:", error);
      certificateInfoEl.innerText =
        "Certificado não encontrado ou erro na consulta.";
    }
  }

  // --- EVENT LISTENERS ---
  connectButton.addEventListener("click", connectWallet);
  disconnectButton.addEventListener("click", disconnectWallet);
  mintButton.addEventListener("click", handleMintCertificate);
  lookupButton.addEventListener("click", handleLookupCertificate);
});
