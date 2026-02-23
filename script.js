(function(){
  const thead = document.getElementById("thead")

const trHead = document.createElement("tr")

const categorias = {
    nome: "Nome",
    enchant: "Enchant",
    nivel: "Nível",
    preco: "Preço"
}

for(let chave in categorias){
    const th = document.createElement("th")
    th.textContent = categorias[chave]
    trHead.appendChild(th)
}

thead.appendChild(trHead)
    const itens = { 
     arcos: [
    {nome:"Arco do caçador",Enchant:3,nivel:85,preco:2000},
    {nome:"Arco do Dragão",Enchant:10,nivel:85,preco:20000},
    {nome:"Arco Alado",Enchant:2,nivel:90,preco:10000},
    {nome:"Arco Carmesim",Enchant:1,nivel:87,preco:5000},
   ],
    lancas:[
    {nome:"Lança poderosa",Enchant:5,nivel:52,preco:9000},
     {nome:"Lança Tridente",Enchant:2,nivel:61,preco:5000},
     {nome:"Lança Alada",Enchant:3,nivel:70,preco:10000},
     {nome:"Lança Draconica",Enchant:7,nivel:90,preco:15000},
    ],
    espadas:[
    {nome:"Espada do Dragão",Enchant:5,nivel:90,preco:6000},
    {nome:"Espada poderosa",Enchant:5,nivel:43,preco:10000},
    {nome:"Espada Alada",Enchant:5,nivel:90,preco:7000},
    {nome:"Espada Carmesim",Enchant:5,nivel:95,preco:10000},
    ],
    armaduras:[
    {nome:"Armadura Draconica",Enchant:0,nivel:50,preco:8000},
    {nome:"Armadura de Couro",Enchant:3,nivel:25,preco:10000},
    {nome:"Armadura de Tecido",Enchant:5,nivel:35,preco:7000},
    {nome:"Armadura Carmesim",Enchant:5,nivel:90,preco:10000},
    ],
    
    acessorios:[
    {nome:"Anel Mágico",Enchant:5,nivel:90,preco:8000},
    {nome:"Colar Mágico",Enchant:5,nivel:90,preco:10000},
    {nome:"Braceletes de Rubi",Enchant:5,nivel:74,preco:7000},
    {nome:"Braceletes de Diamante",Enchant:10,nivel:85,preco:15000},
    ],
  
  
}
const lista = document.getElementById("lista")
const final = document.getElementById("tfoot")
let ouro = 50000
let itemSelecionado = null
for(let categoria in itens){
    itens[categoria].forEach(item=>{
        let tr = document.createElement("tr")
        let tdNome = document.createElement("td")
        let tdEnchant = document.createElement("td")
        let tdNivel = document.createElement("td")
        let tdPreco = document.createElement("td")
        let btnComprar = document.createElement("button")
        tr.dataset.categoria = categoria
        tr.appendChild(tdNome)
        tr.appendChild(tdEnchant)
        tr.appendChild(tdNivel)
        tr.appendChild(tdPreco)
      tdEnchant.textContent = item.Enchant
tr.dataset.categoria = categoria

if(item.Enchant >= 7){
    tr.classList.add("lendario");
}
else if(item.Enchant >= 5){
    tr.classList.add("epico");
}
        tr.addEventListener("click", ()=>{
    document.querySelectorAll("#lista tr").forEach(linha=>{
        linha.classList.remove("selecionado")
    })
    tr.classList.add("selecionado")
    itemSelecionado = item
   
   
    somSelecionar(item.preco);
})
        lista.appendChild(tr)


        
        tdNome.textContent = item.nome
        tdEnchant.textContent = item.Enchant
        tdNivel.textContent = item.nivel
        tdPreco.textContent = item.preco + "g"
        btnComprar.textContent = "Comprar"
      

    })
     
}
function tocarSom(frequencia, duracao, tipo = "sine", volume = 0.1){
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = tipo; // sine, square, triangle, sawtooth
    oscillator.frequency.value = frequencia;

    gainNode.gain.value = volume;

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();

    setTimeout(() => {
        oscillator.stop();
        audioCtx.close();
    }, duracao);
}
function somGoldBasico(){
    tocarSom(800, 100);
    setTimeout(()=> tocarSom(1200, 120), 100);
}
function somErro(){
    tocarSom(200, 200, "square", 0.1);
}
function somPorPreco(preco){

    if(preco < 5000){
        // Item comum
        tocarSom(600, 120, "sine", 0.08);

    } else if(preco < 9000){
        // Item raro
        tocarSom(800, 100, "triangle", 0.1);
        setTimeout(()=> tocarSom(1200, 150, "triangle", 0.1), 120);

    } else {
        // Item épico
        tocarSom(700, 100, "sawtooth", 0.12);
        setTimeout(()=> tocarSom(1000, 120, "sawtooth", 0.12), 100);
        setTimeout(()=> tocarSom(1500, 200, "triangle", 0.15), 200);
    }

}
function somSelecionar(preco){

    if(preco < 5000){
        // Comum
        tocarSom(500, 80, "sine", 0.05);

    } else if(preco < 9000){
        // Raro
        tocarSom(700, 100, "triangle", 0.07);

    } else {
        // Épico
        tocarSom(900, 120, "sawtooth", 0.09);
        setTimeout(()=> tocarSom(1200, 100, "triangle", 0.08), 100);
    }
}

function filtrarCategoria(categoriaSelecionada){
    const linhas = document.querySelectorAll("#lista tr");
    linhas.forEach(linha=>{
        if(categoriaSelecionada ==="todos"){
          linha.style.display = "";
        }
        else if(linha.dataset.categoria === categoriaSelecionada){
            linha.style.display = ""
        }
        else if(linha.dataset.categoria !== categoriaSelecionada){
            linha.style.display = "none"
        }
        else{
            linha.style.dysplay ="none"
            somErro();
        }
    })
    
}
function atualizarOuro(){
    const trF = document.createElement("tr")
    const thF = document.createElement("td")
    trF.appendChild(thF)
    thF.className = "ouro"
    filtros.appendChild(thF)
    thF.textContent ="Ouro:" + ouro
}
document.querySelectorAll("#filtros button").forEach(botao=>{
    botao.addEventListener("click",()=>{
        filtrarCategoria(botao.dataset.categoria)
    })
})
filtrarCategoria("arcos")
filtrarCategoria("todos")
filtrarCategoria("espadas")
filtrarCategoria("lancas")
filtrarCategoria("armaduras")
filtrarCategoria("acessorios")

filtrarCategoria()
 atualizarOuro()

 document.getElementById("btn-comprar").addEventListener("click",()=>{
    if(ouro >= itemSelecionado.preco){
     somPorPreco(itemSelecionado.preco);
    }
    if(!itemSelecionado){
    alert("selecione um item primeiro!")
    return
   }
    if(ouro>=itemSelecionado.preco){
    ouro-=itemSelecionado.preco;
    atualizarOuro();
  
   }else{
    alert("Ouro insuficiente!")
     somErro();
      ouro = 0
       atualizarOuro();
   }

   const selected = document.querySelector(".selecionado")
   selected.style.background = "lightyellow"
   selected.style.color = "red"

    
 })

})()