//Tipagem e Variáveis/////////////////////////////////////////////////////////////////////////////
/*Tipagem da situação do planeta*/
type PlanetSituation = "Habitado" | "Habitável" | "Inabitável" | "Inexplorado";

/*Tipagem da das coordenadas do planeta*/
type PlanetCoordinates = [number, number, number, number];

/*Tipagem do planeta*/
interface Planet {
    name: string,
    coordinates: PlanetCoordinates,
    situation: PlanetSituation,
    atmosphere: number,
    gravity: number,
    weightCalc: any,
    satellitesSituation: string,
    satellites: string[]
};

/*Array de planetas registrados*/
const planets: Planet[] = [];
//////////////////////////////////////////////////////////////////////////////////////////////////




//Closure/////////////////////////////////////////////////////////////////////////////////////////
/*Função que é executada na função "addPlanet" para a criação do calculo de peso de um planeta*/
function weightFormula(gravity: number) {
    return function(mass: number) {
        return (mass / 1000) * gravity;
    };
};
//////////////////////////////////////////////////////////////////////////////////////////////////



/*Função que é executada na função "firstMenuOption" para o registro de um novo planeta*/
function addPlanet(name: string, coordinates: PlanetCoordinates, situation: PlanetSituation, atmosphere: number, gravity: number) {
    planets.push({
        name,
        coordinates,
        situation,
        atmosphere,
        gravity,
        weightCalc: weightFormula(gravity), 
        satellitesSituation: "Dessicronizados",
        satellites: []
    });

    alert(`O planeta ${name} foi salvo com sucesso.`);
};



//Função Lambda///////////////////////////////////////////////////////////////////////////////////
/*Função que é executada na função "promptValidPlanet" para a busca de um planeta registrado*/
const findPlanet = (name: string) => {
    const planet = planets.find(planet => planet.name === name);

    return planet ?? false;
};
//////////////////////////////////////////////////////////////////////////////////////////////////



/*Função que é executada na função "secondMenuOption" para a atualização da situação do planeta*/
function updateSituation(situation: PlanetSituation, planet: Planet) {
    planet.situation = situation;
    
    alert(`A situação do planeta ${planet.name} foi atualizada para ${situation}.`);
};



//Função de Continuação///////////////////////////////////////////////////////////////////////////
/*Função que é executada na função "thirdMenuOption" para a adição de um novo satelite no planeta*/
function addSatellite(name: string, planet: Planet) {
    const launch = setInterval(() => {
        console.log("Satélite em lançamento...");
    }, 1000);

    setTimeout(() => {
        planet.satellites.push(name);
        planet.satellitesSituation = "Dessicronizados";
    
        alert("Satélite entrou em órbita com sucesso.")
        alert(`O satélite ${name} foi adicionado ao planeta ${planet.name}.`);

        clearInterval(launch);

        menu();
    }, planet.atmosphere);
};
//////////////////////////////////////////////////////////////////////////////////////////////////




//List Comprehension//////////////////////////////////////////////////////////////////////////////
/*Função que é executada na função "fourthMenuOption" para a remoção de um satelite do planeta*/
function removeSatellite(name: string, planet: Planet) {
    planet.satellites = planet.satellites.filter(satellite => satellite !== name);
    planet.satellitesSituation = "Dessicronizados";

    alert(`O satélite ${name} foi removido do planeta ${planet.name}.`);
};
//////////////////////////////////////////////////////////////////////////////////////////////////



/*Função que é executada nas funçãos "firstMenuOption" e "secondMenuOption" para a execução de um menu de situações válidas do planeta*/
function promptValidSituation() {
    let situation: PlanetSituation;
    let valid = false;

    while(!valid) {
        const situationInput = Number(prompt(`Informe a situação do planeta?
            1 - Habitado
            2 - Habitável
            3 - Inabitável
            4 - Inexplorado
        `));

        switch(situationInput) {
            case 1:
                situation = "Habitado";
                valid = true;
                break;
            case 2:
                situation = "Habitável";
                valid = true;
                break;
            case 3:
                situation = "Inabitável";
                valid = true;
                break;
            case 4:
                situation = "Inexplorado";
                valid = true;
                break;
            default:
                alert('Situação inválida!');
                break;
        };
    };

    return situation;
};



//Funções de Alta Ordem//////////////////////////////////////////////////////////////////////////
/*Função que é executada nas funçãos "secondMenuOption", "thirdMenuOption". "fourthMenuOption", "sixthMenuOption" e "seventhMenuOption" para a validação de um planeta e execução de uma função determinada*/
function promptValidPlanet(callbackfn: (planet: Planet) => void) {
    let valid = false;
    while(!valid) {
        const planetName = String(prompt("Informe o nome do planeta:\n"));
        const planet = findPlanet(planetName);

        if(planet) {
            callbackfn(planet);
            valid = true;
        } else {
            alert("Planeta não encontrado!");
        };
    };
};
//////////////////////////////////////////////////////////////////////////////////////////////////



/*Função que executa a opção do menu que executa a opção (1 - Registrar um novo planeta)*/
function firstMenuOption() {
    let valid = false;
    
    const name = String(prompt("Informe o nome do planeta:\n"));
    const coordinateA = Number(prompt("Informe a primeira coordenada:\n"));
    const coordinateB = Number(prompt("Informe a segunda coordenada:\n"));
    const coordinateC = Number(prompt("Informe a terceira coordenada:\n"));
    const coordinateD = Number(prompt("Informe a quarta coordenada:\n"));
    const situation = promptValidSituation();
    const atmosphere = Number(prompt("Informe a distância da atmosfera em METROS:\n"));
    const gravity = Number(prompt("Informe a gravidade do planeta:\n"));

    while(!valid) {
        const confirmation = Number(prompt(`Confirma o registro do planeta ${name}?
            Coordenadas: (${coordinateA}, ${coordinateB}, ${coordinateC}, ${coordinateD})
            Situação: ${situation}
            Atmosfera: ${atmosphere}m
            Gravidade: ${gravity}m/s²
    
            1 = Sim / 2 = Não
        `));

        switch(confirmation) {
            case 1:
                addPlanet(name, [coordinateA, coordinateB, coordinateC, coordinateD], situation, atmosphere, gravity);
                valid = true;
                break;
            case 2:
                valid = true;
                break;
            default:
                alert("Opção Inválida");
                break;
        };

    };
};

/*Função que executa a opção do menu que executa a opção (2 - Atualizar situação do planeta)*/
function secondMenuOption() {
    promptValidPlanet(planet => {
        const situation = promptValidSituation();

        updateSituation(situation, planet);
    });
};

/*Função que executa a opção do menu que executa a opção (3 - Adicionar um satélite ao planeta)*/
function thirdMenuOption() {
    promptValidPlanet(planet => {
        let valid = false;

        const satellite = String(prompt("Informe o nome do satélite a ser adicionado:\n"));

        while(!valid) {
            const confirmation = Number(prompt(`Satélite ${satellite} será lançando
            Tempo Estimado: ${planet.atmosphere / 1000} segundos
            Deseja lançar o satélite ${satellite} na órbita do planeta ${planet.name}?

            1 = Sim / 2 = Não
        `));
    
            switch(confirmation) {
                case 1:
                    addSatellite(satellite, planet);
                    valid = true;
                    break;
                case 2:
                    alert(`Lançamento do satélite ${satellite} cancelado.`);
                    valid = true;
                    menu();
                    break;
                default:
                    alert("Opção Inválida");
                    break;
            };
    
        };
    });
};

/*Função que executa a opção do menu que executa a opção (4 - Remover um satélite do planeta)*/
function fourthMenuOption() {
    promptValidPlanet(planet => {
        const satellite = String(prompt("Informe o nome do satélite a ser removido:\n"));

        removeSatellite(satellite, planet);
    });
};

/*Função que executa a opção do menu que executa a opção (5 - Lista todos os planetas)*/
function fifthMenuOption() {
    let list = "Planetas:\n";

    planets.forEach(planet => {
        const [a, b, c, d] = planet.coordinates;

        list += `
            Nome: ${planet.name}
            Coordenadas: (${a}, ${b}, ${c}, ${d})
            Situação: ${planet.situation}
            Atmosfera: ${planet.atmosphere}m
            Gravidade: ${planet.gravity}m/s²
            Situação dos Satélites: ${planet.satellitesSituation}
            Satélites: ${planet.satellites.length}
        `;

        planet.satellites.forEach(satellite => {
            list += `    - ${satellite}\n`;
        });
    });

    alert(list);
};



//Monad///////////////////////////////////////////////////////////////////////////////////////////
/*Função assicrona que é executada na função "sixthMenuOption" para o tratar do erro "Não existe satélites para serem sicronizados."*/
function synchronizeSatellites(planet: Planet) {
    return new Promise((resolve, reject) => {
        if(planet.satellites.length > 0) {
            resolve(planet);
            
        } else {
            reject("Não existe satélites para serem sicronizados.");
        };
    });
};

/*Função que executa a opção do menu que executa a opção (6 - Sicronizar satélites)*/
function sixthMenuOption() {
    promptValidPlanet(planet => {
        synchronizeSatellites(planet).then((planetResult: Planet) => {
            planetResult.satellitesSituation = "Sicronizados";
            alert(`Sicronização Bem Sucedida. 🟢
                Dessicronizados >>> Sicronizados
                ${planetResult.satellites.length} satélites do planeta ${planetResult.name} foram sicronizados.
            `);

            menu();
        }).catch(error => {
            alert(`Sicronização Mal Sucedida. 🔴
                Dessicronizados XXX Sicronizados
                Problema: ${error}
            `);

            menu();
        });
    });
};
//////////////////////////////////////////////////////////////////////////////////////////////////



/*Função que executa a opção do menu que executa a opção (7 - Calcular peso)*/
function seventhMenuOption() {
    promptValidPlanet(planet => {
        const mass = Number(prompt("Informe a massa em GRAMAS que irá ser calculada:\n"));
        const weight = planet.weightCalc(mass);

        alert(`No planeta ${planet.name}, a massa de ${mass}g equivale a um peso de ${weight}N.
            Fórmula:
                Massa: ${mass}g
                Gravidade do planeta ${planet.name}: ${planet.gravity}m/s²
            
                (${mass}g / 1000) * ${planet.gravity}m/s² = ${weight}N
        `);
    });
}

/*Função que executa o menu principal do programa*/
function menu() {
    let userOption = 0;
    while(userOption !== 8) {
        const menu = `Menu
            1 - Registrar um novo planeta
            2 - Atualizar situação do planeta
            3 - Adicionar um satélite ao planeta
            4 - Remover um satélite do planeta
            5 - Lista todos os planetas
            6 - Sicronizar satélites
            7 - Calcular peso
            8- sair
        `;
        userOption = Number(prompt(menu));
    
        switch(userOption) {
            case 1:
                firstMenuOption();
                break;
            case 2:
                if(planets.length > 0) {
                    secondMenuOption();
                } else {
                    alert("Opção Inválida (Nenhum planeta registrado)!");
                };
                break;
            case 3:
                if(planets.length > 0) {
                    thirdMenuOption();
                    userOption = 8;
                } else {
                    alert("Opção Inválida (Nenhum planeta registrado)!");
                };
                break;
            case 4:
                if(planets.length > 0) {
                    fourthMenuOption();
                } else {
                    alert("Opção Inválida (Nenhum planeta registrado)!");
                };
                break;
            case 5:
                if(planets.length > 0) {
                    fifthMenuOption();
                } else {
                    alert("Opção Inválida (Nenhum planeta registrado)!");
                };
                break;
            case 6:
                if(planets.length > 0) {
                    sixthMenuOption();
                    userOption = 8;
                } else {
                    alert("Opção Inválida (Nenhum planeta registrado)!");
                };
                break;
            case 7:
                if(planets.length > 0) {
                    seventhMenuOption();
                } else {
                    alert("Opção Inválida (Nenhum planeta registrado)!");
                };
                break;
            case 8:
                alert("Progama Encerrado!");
                break;
            default:
                alert("Opção inválida! Retornando ao painel principal...");
                break;
        };
    };
};

menu();