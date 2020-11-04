const fetch = require('node-fetch');

const policyCalculate = async (req, res) =>{
    const URL_POLICY = 'https://dn8mlk7hdujby.cloudfront.net/interview/insurance/policy';
    const UF = 28.855;

    // Health value by childs
    const valueHealth0 = 0.279;
    const valueHealth1 = 0.4396;
    const valueHealth2 = 0.559;

    // Dental value by childs
    const valueDental0 = 0.12;
    const valueDental1 = 0.1950;
    const valueDental2 = 0.2480;

    await fetch(URL_POLICY)
    .then(data => data.json())
    .then((response) =>{
        const { workers, company_percentage }  = response.policy;

        // Formula salud
        let saldoSalud0 = UF * valueHealth0
        let saldoSalud1 = UF * valueHealth1
        let saldoSalud2 = UF * valueHealth2
        let saldoSalud3 = (saldoSalud2 * 2) - UF * valueHealth1
        let saldoSalud4 = saldoSalud2 * 2

        // Formula dental
        let saldoDental0 = UF * valueDental0
        let saldoDental1 = UF * valueDental1
        let saldoDental2 = UF * valueDental2
        let saldoDental3 = (saldoDental2 * 2) - UF * valueDental1
        let saldoDental4 = saldoDental2 * 2

        let salidaSalud = []
        let salidaDental = []

        const employees = workers.filter(fil => fil.age < 65)

        let employees0 = employees.filter(fil => fil.childs == 0)
        let totalSalud0 = saldoSalud0 * employees0.length
        let totalDental0 = saldoDental0 * employees0.length

        let employees1 = employees.filter(fil => fil.childs == 1)
        let totalSalud1 = saldoSalud1 * employees1.length
        let totalDental1 = saldoDental1 * employees1.length

        let employees2 = employees.filter(fil => fil.childs == 2)
        let totalSalud2 = saldoSalud2 * employees2.length
        let totalDental2 = saldoDental2 * employees2.length

        let employees3 = employees.filter(fil => fil.childs == 3)
        let totalSalud3 = saldoSalud3 * employees3.length
        let totalDental3 = saldoDental3 * employees3.length

        let employees4 = employees.filter(fil => fil.childs == 4)
        let totalSalud4 = saldoSalud4 * employees4.length
        let totalDental4 = saldoDental4 * employees4.length


        salidaSalud.push(totalSalud0, totalSalud1, totalSalud2, totalSalud3, totalSalud4)
        salidaDental.push(totalDental0, totalDental1, totalDental2, totalDental3, totalDental4)
      
        healthTotal = salidaSalud.reduce((sum, acc) => sum + acc, 0)
        dentalTotal = salidaDental.reduce((sum, acc) => sum + acc, 0)

        let healthPercentage =  (healthTotal.toFixed(2) * company_percentage) / 100
        let dentalPercentage = (dentalTotal.toFixed(2) * company_percentage) / 100

        const total = {
            gastosSalud: healthPercentage,
            gastosDental: dentalPercentage,
            gastosTotal: healthPercentage + dentalPercentage 
        }

        res.status(200).json(total);
    });
}

module.exports = { policyCalculate }
