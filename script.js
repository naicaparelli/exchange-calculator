const URL ='https://economia.awesomeapi.com.br/last/USD-BRL';
const form = document.getElementById('form');

let cotationValue;

async function callApi() {
    const resp = await fetch(URL);
    if (resp.status === 200) {
        const data = await resp.json();
        const cotation = parseFloat(data.USDBRL.low);
        cotationValue = cotation.toFixed(2);
        document.getElementById('cotation-value').textContent = `BRL ${cotationValue}`;
    }
    else {
    console.log("Erro ao buscar a cotação.");
    }
}

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    if (!cotationValue) {
        await callApi();
    } 

    const send = parseFloat(document.getElementById('send').value);
    console.log(`send ${send}`);
  
    const iof = send * 0.011;
    console.log(`iof ${iof}`);
    iofValue = parseFloat(iof).toFixed(2);
    console.log(`iofvalue ${iofValue}`);
    document.getElementById('iof-value').textContent = `BRL ${iofValue}`;

    const spread = cotationValue * 0.01;
    console.log(`spread ${spread}`);
    spreadValue = parseFloat(spread).toFixed(2);
    console.log(`spreadvalue ${spreadValue}`)
    document.getElementById('spread-value').textContent = `BRL ${spreadValue}`;

    const receive = ((send - iof) / (parseFloat(cotationValue) + spread));
    console.log(`receive ${receive}`)
    receiveValue = parseFloat(receive).toFixed(2);
    console.log(`receivevalue ${receiveValue}`)
    document.getElementById('receive-value').textContent = `${receiveValue}`;

    const vet = send / receive;
    console.log(`vet ${vet}`)
    vetValue = parseFloat(vet).toFixed(2);
    console.log(`vetvalue ${vetValue}`)
    document.getElementById('vet-value').textContent = `BRL ${vetValue}`;
});

document.getElementById('get-cotation').addEventListener('click', callApi);