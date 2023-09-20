import React, { useState, useEffect } from 'react';

/**
 * Memos Component
 *
 * This component displays project transactions and associated information retrieved from a smart contract.
 *
 * @param {Object} props - Component props containing the `state` object.
 */
export default function Memos(props) {
  // Destructure the 'state' prop to access the 'contract'
  const { state } = props;

  // State to store the list of project memos
  const [memos, setMemos] = useState([]);

  useEffect(() => {
    /**
     * Fetch Memos Function
     *
     * This function fetches project memos from the connected smart contract.
     */
    const fetchMemos = async () => {
      // Check if the 'contract' object is available
      if (state.contract) {
        // Call the 'getMemos' function from the contract to retrieve project memos
        const memos = await state.contract.getMemos();
        // Update the 'memos' state with the retrieved data
        setMemos(memos);
      }
    };

    // Trigger the 'fetchMemos' function when the 'contract' object changes
    state.contract && fetchMemos();
  }, [state.contract]);

  return (
    <div>
      <div className="container">
        <div className="row">
          <p style={{ textAlign: "center", marginTop: "20px", fontWeight: "bold", fontSize: '20px' }}>
            Project Transactions
          </p>
          <div className="col-12">
            {/* Map through the 'memos' array to render transaction information */}
            {memos?.map((memo) => {
              return (
                <div
                  className="container-fluid"
                  style={{ width: "100%" }}
                  key={Math.random()} // Using a random key for rendering purposes (should be replaced with a unique identifier)
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
                      }}
                    >
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
                          {/* Convert the timestamp to a readable date format */}
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
  );
}
