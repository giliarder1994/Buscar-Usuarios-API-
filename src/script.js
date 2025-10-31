const campoBusca = document.getElementById("campoBusca")
const botao = document.getElementById("btnBuscar");
const staatus = document.getElementById("status");
const lista = document.getElementById("lista");

const url = "https://jsonplaceholder.typicode.com/users";
let usuarios = [];

window.addEventListener("load", () => {
  staatus.textContent = "⏳ Carregando usuários...";
  fetch(url)
  .then(res => res.json())
  .then(dados => {
    usuarios = dados;
    staatus.textContent = "✅ Usuários carregados!";
    mostrarUsuarios(usuarios)
  })
  .catch(() => {
    staatus.textContent = "❌ Erro ao carregar usuários!";
  })
})

function mostrarUsuarios(listaUsuarios) {
  lista.innerHTML = "";
  listaUsuarios.forEach(usuario => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
    <h3>${usuario.name}</h3>
    <p><strong>Email:</strong> ${usuario.email}</p>
    <p><strong>Cidade:</strong> ${usuario.address.city}</p>
    `;

    lista.appendChild(card);
  })
}

botao.addEventListener("click", () => {
  const termo = campoBusca.value.trim().toLowerCase();

  if(termo === ""){
    mostrarUsuarios(usuarios);
    staatus.textContent = "🔄 Mostrando todos os usuários";
    return;
  }

  const filtrados = usuarios.filter(usuario => 
    usuario.name.toLowerCase().includes(termo)
    );

    if(filtrados.length === 0) {
      lista.innerHTML = "<li>Nenhum usuário encontrado 😢</li>";
      staatus.textContent = "⚠️ Nenhum resultado para sua busca";
    } else {
      mostrarUsuarios(filtrados);
      staatus.textContent = `✅ ${filtrados.length} resultado(s) encontrado(s)`
    }
})