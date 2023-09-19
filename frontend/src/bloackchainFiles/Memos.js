import React,{useState,useEffect} from 'react'

export default function Memos(props) {
  const {state}=props
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
    };
    contract && memosMessage();
  }, [contract]);
  return (
    <div>
<div className="container">
  <div className="roe">
    <p style={{ textAlign: "center", marginTop: "20px", fontWeight:"bold", fontSize:'20px' }}>Project Transactions</p>
    <div className="col-12">
      {memos?.map((memo) => {
        return (
          <div
            className="container-fluid"
            style={{ width: "100%" }}
            key={Math.random()}
          >
            <table
              style={{
                marginBottom: "10px",
              }}
            >
              <thead
              style={{
                backgroundColor: "#96D4D4",
                border: "1px solid white",
                borderCollapse: "collapse",
                padding: "7px",
                width: "100px",
              }}>
                <tr className='text-center'>
                  <th>Project Name</th>
                  <th>TimeStamp</th>
                  <th>User ID</th>
                  <th>Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "250px",
                    }}
                  >
                    {memo.name}
                  </td>
                  <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "800px",
                    }}
                  >
                    {new Date(memo.timestamp * 1000).toLocaleString()}
                  </td>
                  <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "300px",
                    }}
                  >
                    {memo.message}
                  </td>
                  <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "400px",
                    }}
                  >
                    {memo.from}
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  </div>
</div>
    </div>
  )
}
