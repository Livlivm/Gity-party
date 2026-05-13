const API = "http://localhost:3000/eventos";

const listaEventos = document.getElementById("lista-eventos");
const modalDetalhes = document.getElementById("modalDetalhes");
const modalFormulario = document.getElementById("modalFormulario");
const abrirFormulario = document.getElementById("abrirFormulario");
const fecharFormulario = document.getElementById("fecharFormulario");
const fecharModal = document.getElementById("fecharModal");
const form = document.getElementById("formEvento");




abrirFormulario.addEventListener("click", () => {
    modalFormulario.classList.remove("escondido");

})


fecharFormulario.addEventListener("click", () => {
    modalFormulario.classList.add("escondido");

});


fecharModal.addEventListener("click", () => {
    modalDetalhes.classList.add("escondido");

});


async function carregarEventos(){
    try {
     const resposta = await fetch(`${API}/listar`);
     const eventos = await resposta.json();
      listaEventos.innerHTML = "";
    eventos.forEach(evento => {

            const data = new Date(
                evento.data_evento
            ).toLocaleDateString("pt-BR");

            listaEventos.innerHTML += `

                <div class="card">

                    <img
                        src="http://localhost:3000/eventos/buscar/imagem/${evento.id}"
                        onclick="abrirDetalhes(${evento.id})"
                    >

                    <h3 onclick="abrirDetalhes(${evento.id})">
                        ${evento.titulo}
                    </h3>

                    <p onclick="abrirDetalhes(${evento.id})">
                        ${data}
                    </p>

                    <button
                        class="btn-excluir"
                        onclick="excluirEvento(${evento.id})"
                    >
                        Excluir Evento
                    </button>

                </div>

            `;

        });

    } catch (erro) {

        console.log(erro);

    }

}

async function abrirDetalhes(id){
    try {
        const resposta = await fetch(`${API}/buscar/${id}`);
        const evento = await resposta.json();
        document.getElementById("imagemEvento").src =
        `http://localhost:3000/eventos/buscar/imagem/${evento.id}`;
         document.getElementById("tituloEvento").innerText =evento.titulo;
         document.getElementById("descricaoEvento").innerText =evento.descricao;
        document.getElementById("localEvento").innerText = evento.local;
        document.getElementById("dataEvento").innerText =new Date(evento.data_evento).toLocaleDateString("pt-BR");
        document.getElementById("capacidadeEvento").innerText =evento.capacidade_max;
        document.getElementById("statusEvento").innerText =evento.status;
        modalDetalhes.classList.remove("escondido");

    } catch (erro) {

        console.log(erro);

    }

}
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {

        const novoEvento = {
            titulo: document.getElementById("titulo").value,
            descricao: document.getElementById("descricao").value,
            local: document.getElementById("local").value,
            data_evento: document.getElementById("data").value,
            capacidade_max: Number(
                document.getElementById("capacidade").value)
            };

        

        const resposta = await fetch(`${API}/cadastrar`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(novoEvento)

        });
        const eventoCriado = await resposta.json();

        // ENVIAR IMAGEM
      const imagem = document.getElementById("imagem").files[0];
       if(imagem){
      const formData = new FormData();
        formData.append("imagem", imagem);
       await fetch(
                `${API}/cadastrar/imagem/${eventoCriado.id}`,
                {
                    method:"POST",
                    body:formData
                }
            );

        }

        alert("Evento cadastrado!");

        modalFormulario.classList.add("escondido");

        form.reset();

        carregarEventos();

    } catch (erro) {

        console.log(erro);

        alert("Erro ao cadastrar");

    }

});

async function excluirEvento(id){
    const confirmar = confirm(
        "Deseja excluir este evento?"
    );

    if(!confirmar){
        return;
    }

    try {

        const resposta = await fetch(
            `${API}/excluir/${id}`,
            {
                method:"DELETE"
            }
        );

        if(resposta.ok){

            alert("Evento excluído!");

            carregarEventos();

        }else{

            alert("Erro ao excluir");

        }

    } catch (erro) {

        console.log(erro);

        alert("Erro no servidor");

    }

}


carregarEventos();