import React,{useState} from 'react';
import MyContracts from '../components/MyContracts';
import MyProposals from '../components/MyProposals';
import UserNavbar from "../components/UserNavbar";
import "../css/LoginCss.css"

export default function MyContractandProposal() {

   const [Page, setPage] = useState("My Contracts")

   const MyProposal = ()=>{
    setPage("My Proposals")
   }

   const MyContract = ()=>{
    setPage("My Contracts")
   }
  return (
    <div>
        <UserNavbar/>
      <div className="container ">
        <div className="row">
            <div className="col-6 p-3 text-center button-07" style={{cursor:"pointer"}} onClick={MyContract}>
                My Contracts   {Page==="My Contracts" && <hr style={{ borderWidth: "2px", borderBlockColor:"black" }} />}
            </div>
            <div className="col-6 p-3 text-center button-07" style={{cursor:"pointer"}} onClick={MyProposal}>
                My Proposals {Page==="My Proposals" && <hr style={{ borderWidth: "2px", borderBlockColor:"black" }} />}
            </div>
            <div className="col-12">
                {Page==="My Contracts" ? (
                    <div><MyContracts/></div>
                ):(
                    <div><MyProposals/></div>
                )}
            </div>
        </div>
      </div>
    </div>
  )
}
