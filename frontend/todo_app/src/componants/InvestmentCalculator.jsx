import { useState } from "react"

/*
// FV = P * (1 + r)^t + A * (((1 + r)^t - 1) / r)

The future value of an investment with regular annual contributions can be calculated using the formula: 
FV = P * [(1 + r)^n - 1] / r + PMT * [(1 + r)^n - 1] / r, 
where FV is future value,
 P is initial investment, 
 r is annual interest rate (as a decimal), 
 n is number of years, and 
 PMT is annual contribution. 
*/


function Row({year,capital,rate,annoul,profit,fv}){
    console.log("Adding new table now :) ")
    return <tr className="hover:bg-base-300">
    <th>{year}</th>
    <td>{capital}</td>
    <td>{rate}</td>
    <td>{annoul}</td>
    <td>{profit}</td>
    <td>{fv}</td>
</tr>
}

export default function Calculator(){

    function getInvestmentRoi(data){
        let roiData=[];
        let p = parseFloat(data.capital);
        let r = parseFloat(data.rate);
        let n = parseInt(data.year);
        let pmt = parseFloat(data.annualInvestment);
        for (let year = 1; year < n+1; year++){
            let currentYeardata = {
                "capital":p,
                "rate":r,
                "year":year,
                "annualInvestment":pmt
            }
            let fv = (p*((1+r)**(n-1))/ r) + (pmt*((1+r)**(n-1))/r)
            // let fv = 50000000;
            let profit = fv-(p+pmt)
            currentYeardata["fv"] = fv;
            currentYeardata["profit"] = profit;
            roiData.push(currentYeardata)
        }
        return roiData;
    }
    
    
    
    const [currentData,updateData] = useState({"usersInput":{
                                                "capital":1,
                                                "annualInvestment":0,
                                                "rate":0,
                                                "year":1
         },
       "dataRow":[]
});
    function capitalHandler(event){
        updateData((currentData)=>{
            let copiedData = structuredClone(currentData)
            copiedData.usersInput.capital=event.target.value;
            copiedData.dataRow = getInvestmentRoi(copiedData.usersInput);
            console.log("Updated data now",copiedData)
            return copiedData;
        });
        console.log(currentData);
    }
    function profitRateHandler(event){
        updateData((currentData)=>{
            let copiedData = structuredClone(currentData)
            copiedData.usersInput.rate=event.target.value;
            copiedData.dataRow = getInvestmentRoi(copiedData.usersInput);
            console.log("Updated data now",copiedData)
            return copiedData;
        });
    }
    function annoualInvestmentHandler(event){
        updateData((currentData)=>{
            let copiedData = structuredClone(currentData)
            copiedData.usersInput.annualInvestment=event.target.value;
            copiedData.dataRow = getInvestmentRoi(copiedData.usersInput);
            console.log("Updated data now",copiedData)
            return copiedData;
        });
    }
    function timeHandler(event){
        updateData((currentData)=>{
            let copiedData = structuredClone(currentData)
            copiedData.usersInput.year=event.target.value;
            copiedData.dataRow = getInvestmentRoi(copiedData.usersInput);
            console.log("Updated data now",copiedData)
            return copiedData;
        });
    }

    return <>
    <div className="max-w-full">
        <div className="card bg-base-100 shadow-sm">
            <h1 className="font-bold text-4xl text-fuchsia-400">Investment Calculator</h1>
            <figure className="flex flex-col gap-2 bg-fuchsia-300 p-4">
                <label className="input">
                Capital
                <input type="text" className="input input-accent" placeholder="1" onChange={capitalHandler} />
                </label>
                <label className="input">
                Annual Investment
                <input type="text" className="input input-accent" placeholder="1.1" onChange={annoualInvestmentHandler}/>
                </label>
                <label className="input">
                Rate
                <input type="text" className="input input-accent" placeholder="1.1" defaultValue = {1.1} onChange={profitRateHandler}/>
                </label>
                <label className="input">
                Year
                <input
  type="number"
  className="input validator input-accent"
  required
  placeholder="Type a number between 1 to 10"
  min="1"
  max="10"
  title="Must be between be 1 to 10"
  defaultValue={1}
  onChange={timeHandler}
/>
                {/* <input type="text" className="input input-accent" placeholder="1" onChange={timeHandler} defaultValue={1}/> */}
                </label>
            </figure>
            <div className="card-body bg-lime-50">
                <h2 className="card-title">Card Title</h2>
                <div className={`overflow-x-auto  mx-10 mb-10 ${currentData.usersInput.capital>0?undefined:"hidden"}`}>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Year</th>
                            <th>Capital</th>
                            <th>Rate</th>
                            <th>Annual Investment</th>
                            <th>Profit</th>
                            <th>Future Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentData.dataRow.map((data)=>(
                            <Row year={data.year} capital={data.capital} rate={data.rate} annoul={data.annualInvestment} profit={data.profit} fv={data.fv} />
                        )
                    )}
        
                        </tbody>
                    </table>
                    </div>
            </div>
        </div>
    </div>

    </>
}