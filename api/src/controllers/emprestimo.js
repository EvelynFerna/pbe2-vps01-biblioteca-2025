const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const emprestimo = await prisma.emprestimo.create({
            data: req.body
        });
        res.status(201).json(emprestimo);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

const read = async (req, res) => {
    const emprestimos = await prisma.emprestimo.findMany({
        include: {
            livro: true,
            aluno: true
        }
    });
    res.json(emprestimos);
}

const readOne = async (req, res) => {
    const emprestimo = await prisma.emprestimo.findUnique({
        where: {
            id: Number(req.params.id)
        },
        include: {
            livro: true,
            aluno: true
        }
    });
    if (emprestimo) res.json(emprestimo);
    else res.status(404).json({ error: 'emprestimo não encontiddo' });
}

const update = async (req, res) => {
    try {
        const emprestimo = await prisma.emprestimo.update({
            where: {
                id:  Number(req.params.id)
            },
            data: req.body
        });
        res.status(200).json(emprestimo);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

const remove = async (req, res) => {
    try {
        await prisma.emprestimo.delete({
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