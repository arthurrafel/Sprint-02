import expreds from 'express';
const app = express();

const PORT =  3000;

//Sprint 2 arrray de objetos e função de consulta
    function criarMensagem(id,usuario, texto){
        return {id,usuario: usuario.trim(), texto: texto.trim() };
    }

    const mensagens = [
        criarMensagem(1, 'Ana', 'Olá,Turma'),
        criarMensagem(2, 'Pedro', 'Servidor TOP'),       
        criarMensagem(3, 'João', 'Vamos conversar com mensageiro local'),
    ];  

    function listaMensagens(){
        return mensagens;
    };

    function quantidaDeMensagens(){
        return mensagens.length;
    }

    function buscarMensagem(id){
        return mensagens.find(mensagem => mensagem.id === id);
    }

    app.get('/', (req, res) => res.send('Servidor rodando! 🚀'));
    app.get('/status', (req, res) => res.json({ status: 'online', sprint: 2, total: quantidadeDeMensagens() }));
    app.get('/sobre', (req, res) => res.send('Meu primeiro servidor Node.js com Express e ES Modules.'));


   // [SPRINT 02 - NOVO] 6. Consulta, total e busca por ID; erro HTTP 404.
    app.get('/mensagens', (req, res) => res.json(listaMensagens()));
    app.get('/total-mensagens', (req, res) => res.json( {total: quantidadeDeMensagens}));
    app.get('/mensagens/:id', (req, res) => { 
    const mensagem = buscarMensagem(Number(req.params.id));
    if (!mensagem) 
        res.status(404).json({ error: 'Mensagem não encontrada' });
    res.json(mensagem);
});

app.listen(PORT, () => console.log(`Servidor em http://localhost:${PORT}`));