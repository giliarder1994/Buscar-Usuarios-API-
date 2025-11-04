const campoBusca = document.getElementById("campoBusca");
const statusMsg = document.getElementById("status");
const lista = document.getElementById("lista");
const loading = document.getElementById("loading")

const url = "https://jsonplaceholder.typicode.com/users";
let usuarios = [];

// função debounce (para busca suave)
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer); 
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

// mostrar usuários na tela
function mostrarUsuarios(listaUsuarios) {
  lista.innerHTML = "";
  listaUsuarios.forEach(usuario => {
    const card = document.createElement("div");
    card.classList.add("card")

    card.innerHTML= `
    <h3>${usuario.name}</h3>
    <p><strong>Email:</strong> ${usuario.email}</p>
    <p><strong>Cidade:</strong> ${usuario.address.city}</p>
    `
    lista.appendChild(card);
  });
}

// Carrega os dados da API
window.addEventListener("load", () => {
  statusMsg.textContent = "⏳ Carregando usuários...";
  loading.classList.remove("hidden");

  fetch(url)
    .then(res => res.json())
    .then(dados => {
      usuarios = dados;
      statusMsg.textContent = "✅ Usuários carregados!";
      loading.classList.add("hidden");
      mostrarUsuarios(usuarios);
    })
    .catch(() => {
      statusMsg.textContent = "❌ Erro ao carregar usuários!";
      loading.classList.add("hidden");
    });
});

// filtra os usuarios
function filtrarUsuarios() {
  const termo = campoBusca.value.trim().toLowerCase();

  if (termo === "") {
    mostrarUsuarios(usuarios);
    statusMsg.textContent = "🔄 Mostrando todos os usuários";
    return;
  }

  const filtrados = usuarios.filter(usuario =>
    usuario.name.toLowerCase().includes(termo)
  );

  if (filtrados.length === 0) {
    lista.innerHTML = "<p><strong>Nenhum usuário encontrado 😢</strong></p>";
    statusMsg.textContent = "⚠️ Nenhum resultado para sua busca";
  } else {
    mostrarUsuarios(filtrados);
    statusMsg.textContent = `✅ ${filtrados.length} resultado(s) encontrado(s)`;
  }
}

// adiciona debounce a buscar (400ms)
campoBusca.addEventListener("input", debounce(filtrarUsuarios, 400));
  
