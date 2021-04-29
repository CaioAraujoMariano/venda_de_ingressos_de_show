const express = require('express');
const app = express();
app.use(express.json());
const axios = require('axios');

const ingressosPorClienteId = {};
const {
    v4: uuidv4
} = require('uuid');

const funcoes = {
    ObservacaoClassificada: (observacao) => {
        const clientes =
            IngressoDoClienteId[observacao.lembreteId];
        const obsParaAtualizar = clientes.find(o => o.id ===
            observacao.id)
        obsParaAtualizar.status = observacao.status;
        axios.post('http://192.168.16.1:10000/eventos', {
            tipo: "ObservacaoAtualizada",
            dados: {
                id: observacao.id,
                texto: observacao.texto,
                lembreteId: observacao.lembreteId,
                status: observacao.status
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
        tipo: "ObservacaoCriada",
        dados: {
            id: idObs,
            texto,
            lembreteId: req.params.id,
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
    console.log('Ingressos. Porta 5000');
}));