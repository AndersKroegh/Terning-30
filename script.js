const startingPoints = 30;
const rounds = 15;

function createDropdown() {
  const select = document.createElement(“select”);
  for (let i = 0; i <= 30; i++) {
    const option = document.createElement(“option”);
    option.value = i;
    option.textContent = i;
    select.appendChild(option);
  }
  select.addEventListener(“change”, updateTotals);
  return select;
}

function initTable() {
  const tbody = document.getElementById(“score-rows”);
  tbody.innerHTML = “”;
  for (let r = 1; r <= rounds; r++) {
    const row = document.createElement(“tr”);
    const roundCell = document.createElement(“td”);
    roundCell.textContent = r;
    row.appendChild(roundCell);
    for (let p = 1; p < document.getElementById(“player-names”).children.length; p++) {
      const cell = document.createElement(“td”);
      cell.appendChild(createDropdown());
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }
}

function updateTotals() {
  const totalsRow = document.getElementById(“totals”);
  for (let p = 1; p < totalsRow.children.length; p++) {
    let total = startingPoints;
    const rows = document.getElementById(“score-rows”).children;
    for (let r = 0; r < rows.length; r++) {
      const select = rows[r].children[p].querySelector(“select”);
      total -= parseInt(select.value);
    }
    totalsRow.children[p].textContent = total;
  }
}

function addPlayer() {
  const playerCount = document.getElementById(“player-names”).children.length;
  const th = document.createElement(“th”);
  const input = document.createElement(“input”);
  input.className = “player-name”;
  input.value = `Spiller ${playerCount}`;
  input.onchange = function() { updateName(this); };
  th.appendChild(input);
  document.getElementById(“player-names”).appendChild(th);

  const totalsRow = document.getElementById(“totals”);
  const td = document.createElement(“td”);
  td.textContent = startingPoints;
  totalsRow.appendChild(td);

  const rows = document.getElementById(“score-rows”).children;
  for (let r = 0; r < rows.length; r++) {
    const cell = document.createElement(“td”);
    cell.appendChild(createDropdown());
    rows[r].appendChild(cell);
  }
}

function removePlayer() {
  const playerNames = document.getElementById(“player-names”);
  if (playerNames.children.length > 2) {
    playerNames.removeChild(playerNames.lastChild);
    document.getElementById(“totals”).removeChild(document.getElementById(“totals”).lastChild);
    const rows = document.getElementById(“score-rows”).children;
    for (let r = 0; r < rows.length; r++) {
      rows[r].removeChild(rows[r].lastChild);
    }
    updateTotals();
  }
}

function updateName(input) {
  input.value = input.value.trim() || “Spiller”;
}

initTable();