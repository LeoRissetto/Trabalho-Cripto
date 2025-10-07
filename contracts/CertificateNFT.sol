// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title CertificateNFT
 * @dev Contrato para emissão de certificados acadêmicos como NFTs (ERC-721).
 * Apenas o proprietário do contrato (administrador) pode emitir novos certificados.
 */
contract CertificateNFT is ERC721, Ownable {
    using Counters for Counters.Counter;

    // O contador nos ajuda a gerar um tokenId único para cada novo certificado.
    Counters.Counter private _tokenIdCounter;

    // Estrutura para armazenar os dados de cada certificado.
    struct Certificate {
        string studentName;
        string courseName;
        uint256 completionYear;
    }

    // Mapeamento que liga um tokenId (o ID do NFT) aos dados do certificado correspondente.
    mapping(uint256 => Certificate) private _certificateInfo;

    /**
     * @dev O construtor é chamado apenas uma vez, na implantação do contrato.
     * Define o nome e o símbolo do nosso token NFT.
     * O proprietário inicial (msg.sender) é definido pelo construtor do Ownable.
     */
    constructor() ERC721("AcademicCertificate", "CERT") Ownable(msg.sender) {}

    /**
     * @dev Função para emitir (criar) um novo certificado NFT.
     * Apenas o proprietário do contrato (definido pelo modificador 'onlyOwner') pode chamar esta função.
     * @param studentAddress O endereço da carteira do aluno que receberá o certificado.
     * @param studentName O nome do aluno.
     * @param courseName O nome do curso.
     * @param completionYear O ano de conclusão do curso.
     */
    function mintCertificate(
        address studentAddress,
        string memory studentName,
        string memory courseName,
        uint256 completionYear
    ) public onlyOwner {
        // Incrementa o contador para obter um novo ID único.
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();

        // Cria o NFT e o envia para o endereço do aluno.
        _safeMint(studentAddress, tokenId);

        // Armazena os dados do certificado no nosso mapeamento, associando-os ao tokenId.
        _certificateInfo[tokenId] = Certificate(
            studentName,
            courseName,
            completionYear
        );
    }

    /**
    * @dev Função para consultar as informações de um certificado a partir do seu tokenId.
    * É uma função 'view', ou seja, não gasta gás para ser chamada, pois apenas lê dados da blockchain.
    * @param tokenId O ID do certificado NFT a ser consultado.
    * @return studentName O nome do aluno.
    * @return courseName O nome do curso.
    * @return completionYear O ano de conclusão do curso.
    */
    function getCertificateInfo(uint256 tokenId)
        public
        view
        returns (
            string memory studentName,
            string memory courseName,
            uint256 completionYear
        )
    {
        // A função ownerOf(tokenId) reverte a transação se o token não existir,
        // servindo como uma verificação de existência implícita e mais robusta.
        require(ownerOf(tokenId) != address(0), "CertificateNFT: Certificado nao encontrado.");

        // Recupera os dados do mapeamento.
        Certificate storage certificate = _certificateInfo[tokenId];

        // Retorna os valores.
        return (
            certificate.studentName,
            certificate.courseName,
            certificate.completionYear
        );
    }
}