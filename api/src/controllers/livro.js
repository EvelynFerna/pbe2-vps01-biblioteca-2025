const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const livro = await prisma.livro.create({
            data: req.body
        });
        res.status(201).json(livro);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

const read = async (req, res) => {
    const livros = await prisma.livro.findMany({
        include: {
            emprestimo: true
        }
    });
    res.json(livros);
}

const readOne = async (req, res) => {
    const livro = await prisma.livro.findUnique({
        where: {
            id: Number(req.params.id)
        },
        include: {
            emprestimo: true
        }
    });
    if (livro) res.json(livro);
    else res.status(404).json({ error: 'livro não encontrado' });
}

const update = async (req, res) => {
    try {
        const livro = await prisma.livro.update({
            where: {
                id:  Number(req.params.id)
            },
            data: req.body
        });
        res.status(200).json(livro);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

const remove = async (req, res) => {
    try {
        await prisma.livro.delete({
            where: {
                id:  Number(req.params.id)
            }
        });
        res.status(204).end();
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

module.exports = {
    create,
    read,
    readOne,
    update,
    remove
}