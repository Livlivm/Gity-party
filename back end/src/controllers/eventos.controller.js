const prisma = require("../data/prisma");
const fs = require("fs");

const cadastrarimagem = async (req, res) => {
    try {
        const idEvento = parseInt(req.params.id);
        const arquivo = req.file;
        const pastafinal = `uploads/eventos/${idEvento}`;
        const caminhofinal = `${pastafinal}/${arquivo.filename}`;

        if (!fs.existsSync(pastafinal)) {
            fs.mkdirSync(pastafinal, { recursive: true });
        }
        fs.renameSync(arquivo.path, caminhofinal);
        const imagem = await prisma.imagem.create({
            data: {
                nomeoriginal: arquivo.originalname,
                nomearquivo: arquivo.filename,
                mimetype: arquivo.mimetype,
                path: caminhofinal,
                eventosId: idEvento,
            },
        });

        if (!imagem) {
            throw new Error("Erro ao salvar imagem no banco de dados");
        }

        res.json(imagem).status(201).end();
    } catch (error) {
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.json({ error: error.message }).status(500).end();
    }
}

const buscarImagem = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const imagem = await prisma.imagem.findUnique({
      where: { id },
    });

    if (!imagem) {
      return res.status(404).json({ erro: "Imagem não encontrada" });
    }

    if (!fs.existsSync(imagem.path)) {
      return res
        .status(404)
        .json({ erro: "Arquivo não encontrado no servidor" });
    }

    res.sendFile(imagem.path, { root: "." });
  } catch (erro) {
    return res.status(500).json({ erro: "Erro ao buscar imagem" });
  }
}

const cadastrar = async (req, res) => {
    const data = req.body;
    data.data_evento = new Date(data.data_evento);

    const item = await prisma.eventos.create({
        data
    });

    res.json(item).status(201).end();
};

const listar = async (req, res) => {
    const lista = await prisma.eventos.findMany();

    res.json(lista).status(200).end();
};

const buscar = async (req, res) => {
    const { id } = req.params;

    const item = await prisma.eventos.findUnique({
        where: { id: Number(id) },
        include: {
            imagens: true
        }
    });

    res.json(item).status(200).end();
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;

    const item = await prisma.eventos.update({
        where: { id: Number(id) },
        data: dados
    });

    res.json(item).status(200).end();
};

const excluir = async (req, res) => {
    const { id } = req.params;

    const item = await prisma.eventos.delete({
        where: { id: Number(id) }
    });

    res.json(item).status(200).end();
};

module.exports = {
    cadastrarimagem,
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir,
    buscarImagem
}