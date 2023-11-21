import React, { useState } from "react";

const VoucherEntry = () => {
    const [billItems, setBillItems] = useState([{}]);

    const addNewBillEntry = () => {
        setBillItems((prev) => {
            console.log(prev)
            return [...prev, {}];
        })
    
    }

    console.log('Im rendering...')
    
  return (
    <div>
      <h1>CLIENT COMPANY NAME</h1>
      <h1>ADDRESS</h1>
      <h1>
        <label>FINANCIAL YEAR :</label>
        <select>
          <option>2020-21</option>
          <option>2021-22</option>
          <option>2022-23</option>
        </select>
      </h1>
      <h2>Import the Doucment</h2>
      <label htmlFor="uploading">Import file: </label>
      <input type="file"></input>
      <p>Import Excel using the bellow columns end with bill value</p>
      <button type="button">submit</button>
      <h1>Enter the Data :</h1>
      <table width="100%">
        <thead>
          <th>DATE*</th>
          <th>Voucher No*</th>
          <th>Aspect</th>
          <th>TRANSACTION NAME*</th>
          <th>NATURE*</th>
          <th>TYPE*</th>
        {/*transction meams iS PAID / Received amount */}
          <th>TRANSACTION AMOUNT*</th>
          <th>DESCRIPTION</th>
          {/* <!-- THIS STORED IN NEW DATABASE --> */}
          {/* bill must have proof */}
          <th>BILL VALUE*</th>
          <th>STATUS*</th>
          <th>BALANCE</th>
        </thead>
        <tbody>
          { billItems && billItems.length > 0 && billItems.map((item, idx) => <tr key={idx}>
            <td>
              <input type="date" placeholder="dd/mm/yyyy" value={item.date} />
            </td>
            <td>
              <input type="text" placeholder="" />
            </td>
            <td>
              <select>
                <option></option>
                <option>Dr</option>
                <option>Cr</option>
            </select>
            </td>
            <td>
              <div>
                <input type="text" placeholder="Transaction name" />
                <button type="button">+</button>
              </div>
            </td>
            <td>
              <select>
                <option>EXPENSES</option>
                <option>INCOME</option>
                <option>CAPITAL</option>
                <option>LIABILITIES</option>
                <option>ASSET</option>
              </select>
            </td>
            <td>
              <select>
                {/* <!-- journal --> */}
                <option>other</option>
                <option>CASH</option>
                {/* <!-- BANK NAME --> */}
                <option>BANK</option>
              </select>
            </td>
            <td>
              <input type="number" placeholder="Paid Amount" />
            </td>
            <td>
              <input type="text" placeholder="Description" />
            </td>
            <td>
              <input type="number" placeholder="Bill Amount" />
            </td>
            <td>
              <select>
                <option>Done</option>
                <option>Pending</option>
                {/* <!-- details in description --> */}
                <option>Progess</option>
              </select>
            </td>
            <td>{0}</td>
          </tr>)}
        </tbody>
      </table>

      <br></br>
      <button type="button" onClick={addNewBillEntry}>Add entry</button>
    </div>
  );
};

export default VoucherEntry;
