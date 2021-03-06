const express = require("express");
const app = express();
app.use(express.json());
const baseConsulta = {};
const axios = require("axios");
const funcoes = {
    LembreteCriado: (lembrete) => {
        baseConsulta[lembrete.contador] = lembrete;
    },
    clienteCriado: (cliente) => {
        const clientes =
            baseConsulta[cliente.ingressoId]["clientes"] || [];
        clientes.push(cliente);
        baseConsulta[cliente.ingressoId]["clientes"] =
            clientes;
    },
    clienteAtualizado: (cliente) => {
        const clientes =
            baseConsulta[cliente.ingressoId]["clientes"];
        const indice = clientes.findIndex((o) => o.id ===
        cliente.id);
        clientes[indice] = cliente;
    },
};

app.get("/ingressos", (req, res) => {
    res.status(200).send(baseConsulta);
});
app.post("/eventos", (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    } catch (err) {}

    res.status(200).send(baseConsulta);
});
app.listen(6000, async () => {
    console.log("Consultas. Porta 6000");
    const resp = await axios.get("http://127.0.0.1:10000/eventos")
        .catch((err) => {
            console.log("err", err);
        });
    //axios entrega os dados na propriedade data
    resp.data.forEach((valor, indice, colecao) => {
        try {
            funcoes[valor.tipo](valor.dados);
        } catch (err) {}
    });
});