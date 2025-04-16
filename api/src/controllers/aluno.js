const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const aluno = await prisma.aluno.create({
            data: req.body
        });
        res.status(201).json(aluno);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

const read = async (req, res) => {
    try {
        const alunos = await prisma.aluno.findMany({
            include: {
                emprestimo: {
                    include: {
                        livro: true 
                    }
                }
            }
        });
        res.json(alunos);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

const readOne = async (req, res) => {
    try {
        const aluno = await prisma.aluno.findUnique({
            where: {
                ra: req.params.id 
            },
            include: {
                emprestimo: {
                    include: {
                        livro: true 
                    }
                }
            }
        });
        if (aluno) {
            res.json(aluno);
        } else {
            res.status(404).json({ error: 'Aluno não encontrado' });
        }
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

const update = async (req, res) => {
    try {
        const aluno = await prisma.aluno.update({
            where: {
                ra: req.params.id 
            },
            data: req.body
        });
        res.status(200).json(aluno);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

const remove = async (req, res) => {
    try {
        await prisma.aluno.delete({
            where: {
                ra: req.params.id 
            }
        });
        res.status(204).end();
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

module.exports = {
    create,
    read,
    readOne,
    update,
    remove
};
