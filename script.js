const URL ='https://economia.awesomeapi.com.br/last/USD-BRL';
const form = document.getElementById('form');

const maxLimit = 1000000.00; 
const minLimit = 50.00;   

let cotationValue;
let debounceTimeout;

async function callApi() {
    const resp = await fetch(URL);
    if (resp.status === 200) {
        const data = await resp.json();
        const cotation = parseFloat(data.USDBRL.low);
        cotationValue = cotation.toFixed(2);
        cotationValueFormated = cotationValue.replace('.', ',');
        document.getElementById('cotation-value').textContent = `BRL ${cotationValueFormated}`;
        console.log( `cotation ${cotation}`);
        console.log(`cotationValue ${cotationValue}`);
        console.log(`cotationValueFormated ${cotationValueFormated}`);
    }
    else {
    console.log("Erro ao buscar a cotação.");
    }
}

function validateLimits(value) {
    if (value == 0) {
        document.getElementById('error').style.display = 'none';
        document.getElementById('get-cotation').disabled = true;
        console.log('valor é zero');
    } else if ( value > 0 && value < minLimit) {
        document.getElementById('error-message').textContent = `O valor mínimo permitido é BRL 50,00`;
        document.getElementById('error').style.display = 'block';
        document.getElementById('get-cotation').disabled = true;
        console.log('valor é menor que 50');
    } else if (value > maxLimit) {
        document.getElementById('error-message').textContent = `O valor máximo permitido é BRL 1.000.000,00`;
        document.getElementById('error').style.display = 'block';
        document.getElementById('get-cotation').disabled = true;
        console.log('valor é maior que 1.000.000');
    } else {
        document.getElementById('error').style.display = 'none';
        document.getElementById('get-cotation').disabled = false;
        console.log('valor é valido');
        // submitButton.disabled = false;
    }
}

document.getElementById('send').addEventListener('input', function (e) {
    let value = e.target.value;

    value = value.replace(/\D/g, '');
    value = (value / 100).toFixed(2);
    value = value.replace('.', ',');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    e.target.value = `${value}`;

    clearTimeout(debounceTimeout);
    
    debounceTimeout = setTimeout(function () {
        let rawValue = parseFloat(e.target.value.replace(/[R$.]/g, '').replace(',', '.'));
        validateLimits(rawValue);
    }, 1000);
});

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    if (!cotationValue) {
        await callApi();
    }
    
    const send = document.getElementById('send').value;
    const sendValue = parseFloat(send.replace(/[R$.]/g, '').replace(',', '.'));
    console.log(`send ${send}`);
    console.log(`sendValue ${sendValue}`);
  
    const iof = sendValue * 0.011;
    console.log(`iof ${iof}`); 
    iofValue = parseFloat(iof).toFixed(2);
    iofValue = iofValue.replace('.', ',');
    console.log(`iofValue ${iofValue}`);
    document.getElementById('iof-value').textContent = `BRL ${iofValue}`;

    const spread = cotationValue * 0.01;
    console.log(`spread ${spread}`);
    spreadValue = parseFloat(spread).toFixed(2);
    spreadValue = spreadValue.replace('.', ',');
    console.log(`spreadValue ${spreadValue}`);
    document.getElementById('spread-value').textContent = `BRL ${spreadValue}`;

    const receive = ((sendValue - iof) / (parseFloat(cotationValue) + spread));
    console.log(`receive ${receive}`);
    receiveValue = parseFloat(receive).toFixed(2);
    receiveValue = receiveValue.replace('.',',');
    receiveValue = receiveValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    console.log(`receiveValue ${receiveValue}`);
    document.getElementById('receive-value').textContent = `${receiveValue}`;

    const vet = sendValue / receive;
    console.log(`vet ${vet}`);
    
    vetValue = parseFloat(vet).toFixed(2);
    vetValue = vetValue.replace('.', ',');
    console.log(`vetValue ${vetValue}`);
    document.getElementById('vet-value').textContent = `BRL ${vetValue}`;

});

document.getElementById('get-cotation').addEventListener('click', callApi);



