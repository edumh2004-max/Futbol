// Datos demo
const TEAMS = [
  {id:1,name:'Club Aurora',logo:'https://dummyimage.com/100x100/ff7a59/081226.png&text=A'},
  {id:2,name:'Deportivo Sol',logo:'https://dummyimage.com/100x100/ffd157/081226.png&text=S'},
  {id:3,name:'Atlético Norte',logo:'https://dummyimage.com/100x100/6bc8ff/081226.png&text=N'},
  {id:4,name:"Real Valle",logo:'https://dummyimage.com/100x100/9b59ff/081226.png&text=V'},
  {id:5,name:'Unión Este',logo:'https://dummyimage.com/100x100/57d6a9/081226.png&text=U'}
];

const sampleMatches = () => ([
  {home:TEAMS[0],away:TEAMS[1],score:[1,2],date:'2025-09-17'},
  {home:TEAMS[2],away:TEAMS[3],score:[0,0],date:'2025-09-17'},
  {home:TEAMS[4],away:TEAMS[0],score:[2,3],date:'2025-09-16'}
]);

// Render
function renderMatches(matches){
  const container = document.getElementById('matches');
  container.innerHTML='';
  matches.forEach(m=>{
    const el=document.createElement('div'); el.className='match';
    el.innerHTML=`
      <div class="teams">
        <div class="team"><div class="name">${m.home.name}</div><div style="font-size:12px;color:var(--muted)">${m.date}</div></div>
        <div class="score">${m.score[0]} - ${m.score[1]}</div>
        <div class="team"><div class="name">${m.away.name}</div></div>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn" onclick='showDetails(${m.home.id},${m.away.id})'>Ver</button>
        <button class="btn" onclick='simulateSpecific(${m.home.id},${m.away.id})'>Sim.</button>
      </div>`;
    container.appendChild(el);
  });
}

function renderTeams(){
  const grid=document.getElementById('teamsGrid'); grid.innerHTML='';
  TEAMS.forEach(t=>{
    const card=document.createElement('div'); card.className='team-card';
    card.innerHTML=`<img src="${t.logo}" alt="${t.name}"><div style="margin-top:8px;font-weight:800">${t.name}</div><div style="color:var(--muted);font-size:13px;margin-top:6px">Estadio: Demo</div>`;
    grid.appendChild(card);
  });
}

// Detalles
function showDetails(homeId,awayId){
  const home=TEAMS.find(t=>t.id===homeId); const away=TEAMS.find(t=>t.id===awayId);
  document.getElementById('featuredLogo').src=home.logo;
  document.getElementById('featuredName').textContent=home.name+' vs '+away.name;
  const recent=['G 2-1','E 1-1','P 0-1','G 3-0','G 1-0'];
  const list=document.getElementById('recentList'); list.innerHTML='';
  recent.forEach(r=>{const li=document.createElement('li'); li.textContent=r; list.appendChild(li)});
}

// Simulador
function simulateRandom(){
  const a=TEAMS[Math.floor(Math.random()*TEAMS.length)];
  let b=TEAMS[Math.floor(Math.random()*TEAMS.length)];
  while(b.id===a.id) b=TEAMS[Math.floor(Math.random()*TEAMS.length)];
  const scoreA=Math.floor(Math.random()*5), scoreB=Math.floor(Math.random()*5);
  const match={home:a,away:b,score:[scoreA,scoreB],date:new Date().toISOString().slice(0,10)};
  const matches=sampleMatches(); matches.unshift(match);
  renderMatches(matches); showDetails(a.id,b.id);
  alert(`${a.name} ${scoreA} - ${scoreB} ${b.name}`);
}

function simulateSpecific(homeId,awayId){
  const home=TEAMS.find(t=>t.id===homeId); const away=TEAMS.find(t=>t.id===awayId);
  const scoreA=Math.floor(Math.random()*5), scoreB=Math.floor(Math.random()*5);
  const matches=sampleMatches(); matches.unshift({home,away,score:[scoreA,scoreB],date:new Date().toISOString().slice(0,10)});
  renderMatches(matches); showDetails(homeId,awayId);
  alert(`Resultado simulado: ${home.name} ${scoreA} - ${scoreB} ${away.name}`);
}

// Búsqueda
document.getElementById('search').addEventListener('input',(e)=>{
  const q=e.target.value.toLowerCase();
  if(!q) return renderMatches(sampleMatches());
  const matches=sampleMatches().filter(m=>m.home.name.toLowerCase().includes(q)||m.away.name.toLowerCase().includes(q));
  renderMatches(matches);
});

// Tema
const themeBtn=document.getElementById('themeBtn');
themeBtn.addEventListener('click',()=>{
  document.body.classList.toggle('light');
  themeBtn.textContent=document.body.classList.contains('light')?'Modo oscuro':'Modo claro';
});

// Botones
document.getElementById('simBtn').addEventListener('click',simulateRandom);
document.getElementById('refreshBtn').addEventListener('click',()=>{
  renderMatches(sampleMatches()); renderTeams(); alert('Datos actualizados (demo)')
});

// Init
renderMatches(sampleMatches()); renderTeams(); showDetails(1,2);
