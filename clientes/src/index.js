const express = require('express');
const app = express();
app.use(express.json());
const axios = require('axios');

const ingressosPorClienteId = {};
const {
    v4: uuidv4
} = require('uuid');

const funcoes = {
    clienteClassificado: (cliente) => {
        const clientes =
            IngressoDoClienteId[cliente.ingressoId];
        const obsParaAtualizar = clientes.find(o => o.id ===
            cliente.id)
        obsParaAtualizar.status = cliente.status;
        axios.post('http://192.168.16.1:10000/eventos', {
            tipo: "clienteAtualizado",
            dados: {
                id: cliente.id,
                texto: cliente.texto,
                endereco: cliente.endereco,
                idade: cliente.idade,
                ingressoId: cliente.ingressoId,
                status: cliente.status
            }
        }).catch((err) => {
            console.log("err", err);
        });
    }
}
app.post("/eventos", (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    } catch (err) {}
    res.status(200).send({
        msg: "ok"
    });
});

//:id é um placeholder
//exemplo: /ingressos/123456/clientes
app.put('/ingressos/:id/clientes', async (req, res) => {
    const idObs = uuidv4();
    const {
        texto
    } = req.body;
    //req.params dá acesso à lista de parâmetros da URL
    const ingressoDoCliente =
    IngressoDoClienteId[req.params.id] || [];
    ingressoDoCliente.push({
        id: idObs,
        texto,
        status: 'aguardando'
    });
    IngressoDoClienteId[req.params.id] =
        ingressoDoCliente;
    await axios.post('http://127.0.0.1:10000/eventos', {
        tipo: "clienteCriado",
        dados: {
            id: idObs,
            texto,
            ingressoId: req.params.id,
            status: 'aguardando'
        }
    }).catch((err) => {
        console.log("err", err);
    });
    res.status(201).send(ingressoDoCliente);
});
app.get('/ingressos/:id/clientes', (req, res) => {
    res.send(clientes[req.params.id] || []);

});
app.listen(5000, (() => {
    console.log('Clientes. Porta 5000');
}));